// backend/config/db.js
// Production Data Layer with Persistence & Zero-Dependency Portability

const fs = require('fs');
const path = require('path');
const { stations, trains, initialDevices, initialLocations } = require('./seedData');

const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'smartrail_store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class SmartRailDatabase {
  constructor() {
    this.state = {
      stations: [],
      trains: [],
      devices: [],
      locations: {}, // keyed by trainNumber -> latest location
      locationHistory: [], // array of GPS points
      auditLogs: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf8');
        const parsed = JSON.parse(fileContent);
        if (parsed && parsed.trains && parsed.trains.length > 0) {
          this.state = parsed;
          // Ensure stations and devices from seed are preserved/merged
          if (!this.state.stations || this.state.stations.length === 0) {
            this.state.stations = stations;
          }
          console.log('✅ Loaded database state from disk with', this.state.trains.length, 'trains');
          return;
        }
      }
    } catch (err) {
      console.warn('⚠️ Could not load existing DB file, reinitializing with seed data:', err.message);
    }

    // Initialize with fresh seed data
    this.seed();
  }

  seed() {
    this.state = {
      stations: [...stations],
      trains: JSON.parse(JSON.stringify(trains)),
      devices: JSON.parse(JSON.stringify(initialDevices)),
      locations: {},
      locationHistory: [],
      auditLogs: [
        {
          id: 'log-1',
          action: 'SYSTEM_BOOT',
          details: 'SmartRail India Database initialized with default Indian Railway routes',
          timestamp: new Date().toISOString()
        }
      ]
    };

    // Index initial locations
    for (const loc of initialLocations) {
      this.state.locations[loc.trainNumber] = { ...loc };
      this.state.locationHistory.push({ ...loc });
    }

    this.persist();
    console.log('🌱 Seeded SmartRail India database successfully');
  }

  persist() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.state, null, 2), 'utf8');
    } catch (err) {
      console.error('❌ Failed to persist database to disk:', err.message);
    }
  }

  // Station Queries
  getAllStations() {
    return this.state.stations;
  }

  getStationByCode(code) {
    if (!code) return null;
    const clean = code.trim().toUpperCase();
    return this.state.stations.find(s => s.code === clean) || null;
  }

  searchStations(query) {
    if (!query) return this.state.stations;
    const q = query.trim().toLowerCase();
    return this.state.stations.filter(s =>
      s.code.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.state.toLowerCase().includes(q)
    );
  }

  // Train Queries
  getAllTrains() {
    return this.state.trains;
  }

  getTrainByNumber(number) {
    if (!number) return null;
    const clean = number.trim();
    return this.state.trains.find(t => t.trainNumber === clean) || null;
  }

  searchTrains(query) {
    if (!query) return this.state.trains;
    const q = query.trim().toLowerCase();
    return this.state.trains.filter(t =>
      t.trainNumber.toLowerCase().includes(q) ||
      t.trainName.toLowerCase().includes(q) ||
      t.sourceCode.toLowerCase().includes(q) ||
      t.sourceName.toLowerCase().includes(q) ||
      t.destinationCode.toLowerCase().includes(q) ||
      t.destinationName.toLowerCase().includes(q)
    );
  }

  searchTrainsBetween(fromCode, toCode) {
    const from = (fromCode || '').trim().toUpperCase();
    const to = (toCode || '').trim().toUpperCase();

    return this.state.trains.filter(train => {
      const stops = train.route || [];
      const fromIndex = stops.findIndex(s => s.stationCode === from);
      const toIndex = stops.findIndex(s => s.stationCode === to);
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });
  }

  updateTrainDelay(trainNumber, delayMinutes, status) {
    const train = this.getTrainByNumber(trainNumber);
    if (train) {
      train.currentDelayMinutes = delayMinutes;
      if (status) train.status = status;
      this.persist();
    }
  }

  // Location & Telemetry
  getLatestLocation(trainNumber) {
    return this.state.locations[trainNumber] || null;
  }

  saveLocation(locationPayload) {
    const { trainNumber, deviceId, latitude, longitude, speed, direction, temperature, vibration, timestamp } = locationPayload;
    const record = {
      trainNumber,
      deviceId: deviceId || 'MANUAL-SIMULATOR',
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      speed: parseFloat(speed) || 0,
      direction: parseFloat(direction) || 0,
      temperature: temperature !== undefined ? parseFloat(temperature) : null,
      vibration: vibration !== undefined ? parseFloat(vibration) : null,
      timestamp: timestamp || new Date().toISOString()
    };

    this.state.locations[trainNumber] = record;
    this.state.locationHistory.push(record);

    // Keep history trimmed to last 5000 entries
    if (this.state.locationHistory.length > 5000) {
      this.state.locationHistory.shift();
    }

    // Update device lastSeen
    if (deviceId) {
      const device = this.state.devices.find(d => d.deviceId === deviceId);
      if (device) {
        device.lastSeen = record.timestamp;
        device.status = 'Online';
      }
    }

    this.persist();
    return record;
  }

  getLocationHistory(identifier, limit = 100) {
    if (!identifier) return this.state.locationHistory.slice(-limit);
    return this.state.locationHistory
      .filter(l => l.trainNumber === identifier || l.deviceId === identifier)
      .slice(-limit);
  }

  // IoT Device Queries
  getAllDevices() {
    // Check online status based on 3-minute timeout
    const now = Date.now();
    return this.state.devices.map(device => {
      const lastSeenMs = device.lastSeen ? new Date(device.lastSeen).getTime() : 0;
      const isOnline = (now - lastSeenMs) < 180000; // 3 minutes
      return {
        ...device,
        status: isOnline ? 'Online' : 'Offline'
      };
    });
  }

  getDeviceById(deviceId) {
    return this.state.devices.find(d => d.deviceId === deviceId) || null;
  }

  registerDevice(deviceData) {
    const existingIndex = this.state.devices.findIndex(d => d.deviceId === deviceData.deviceId);
    const newDevice = {
      deviceId: deviceData.deviceId,
      trainNumber: deviceData.trainNumber || null,
      status: 'Online',
      firmwareVersion: deviceData.firmwareVersion || 'v2.4.1',
      batteryLevel: deviceData.batteryLevel !== undefined ? deviceData.batteryLevel : 100,
      signalDbm: deviceData.signalDbm !== undefined ? deviceData.signalDbm : -70,
      lastSeen: new Date().toISOString()
    };

    if (existingIndex !== -1) {
      this.state.devices[existingIndex] = { ...this.state.devices[existingIndex], ...newDevice };
    } else {
      this.state.devices.push(newDevice);
    }

    this.addAuditLog('DEVICE_REGISTERED', `Device ${deviceData.deviceId} registered and linked`);
    this.persist();
    return newDevice;
  }

  assignDevice(deviceId, trainNumber) {
    const device = this.state.devices.find(d => d.deviceId === deviceId);
    if (!device) return null;

    device.trainNumber = trainNumber || null;
    const train = trainNumber ? this.getTrainByNumber(trainNumber) : null;
    if (train) {
      train.activeDeviceId = deviceId;
    }

    this.addAuditLog('DEVICE_ASSIGNED', `Assigned device ${deviceId} to train ${trainNumber || 'Unassigned'}`);
    this.persist();
    return device;
  }

  addAuditLog(action, details) {
    this.state.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      action,
      details,
      timestamp: new Date().toISOString()
    });

    if (this.state.auditLogs.length > 500) {
      this.state.auditLogs.pop();
    }
  }

  getAuditLogs(limit = 50) {
    return this.state.auditLogs.slice(0, limit);
  }
}

const db = new SmartRailDatabase();
module.exports = db;
