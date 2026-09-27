// backend/services/iotService.js
// ESP32 Telemetry Ingestion, Station Detection & Live Broadcast Service

const db = require('../config/db');
const { detectStationPosition } = require('./stationDetectionService');
const { calculateRouteETAs, computeNextStationETA } = require('./etaCalculationService');
const { broadcastTrainUpdate, broadcastDeviceTelemetry } = require('./websocketService');

class IoTService {
  /**
   * Process incoming GPS / IoT telemetry packet from ESP32
   */
  async processIncomingTelemetry(payload) {
    const {
      deviceId,
      trainNumber: rawTrainNumber,
      latitude,
      longitude,
      speed = 0,
      direction = 0,
      temperature = null,
      vibration = null,
      batteryLevel = 95,
      signalDbm = -70,
      timestamp = new Date().toISOString()
    } = payload;

    // 1. Validation
    if (!deviceId) {
      throw new Error('Device ID is required');
    }
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      throw new Error('Invalid latitude: must be between -90 and 90');
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
      throw new Error('Invalid longitude: must be between -180 and 180');
    }

    // 2. Resolve train number: use explicit or look up registered device assignment
    let trainNumber = rawTrainNumber;
    let registeredDevice = db.getDeviceById(deviceId);

    if (!registeredDevice) {
      // Auto-register device if unknown
      registeredDevice = db.registerDevice({
        deviceId,
        trainNumber: rawTrainNumber || null,
        batteryLevel,
        signalDbm
      });
    }

    if (!trainNumber && registeredDevice) {
      trainNumber = registeredDevice.trainNumber;
    }

    if (!trainNumber) {
      // Device is sending coordinates but not assigned to any train yet
      // Still log telemetry and update device status
      db.saveLocation({
        trainNumber: 'UNASSIGNED',
        deviceId,
        latitude: lat,
        longitude: lon,
        speed: parseFloat(speed) || 0,
        direction: parseFloat(direction) || 0,
        temperature,
        vibration,
        timestamp
      });

      broadcastDeviceTelemetry({
        deviceId,
        trainNumber: null,
        latitude: lat,
        longitude: lon,
        speed: parseFloat(speed) || 0,
        batteryLevel,
        signalDbm,
        timestamp
      });

      return {
        success: true,
        message: 'Telemetry logged for unassigned device',
        assigned: false
      };
    }

    // 3. Look up Train Metadata and Route Stations
    const train = db.getTrainByNumber(trainNumber);
    if (!train) {
      throw new Error(`Train with number ${trainNumber} not found in railway database`);
    }

    // Attach station coordinates to each route stop
    const allStations = db.getAllStations();
    const stationMap = new Map(allStations.map(s => [s.code, s]));

    const routeWithCoords = (train.route || []).map(stop => {
      const stn = stationMap.get(stop.stationCode);
      return {
        ...stop,
        latitude: stn ? stn.latitude : 0,
        longitude: stn ? stn.longitude : 0,
        cityName: stn ? stn.city : stop.stationName
      };
    });

    // 4. Run Haversine Station Detection Algorithm
    const position = detectStationPosition(lat, lon, speed, routeWithCoords);

    // 5. Calculate ETAs and Next Station Metrics
    let nextStationETA = null;
    if (position.nextStation && position.distanceToNextKm !== null) {
      nextStationETA = computeNextStationETA(
        position.distanceToNextKm,
        speed,
        position.nextStation.arrivalTime,
        train.currentDelayMinutes
      );
    }

    const calculatedRoute = calculateRouteETAs(
      routeWithCoords,
      position,
      speed,
      train.currentDelayMinutes
    );

    // 6. Persist location update to database
    const savedLocation = db.saveLocation({
      trainNumber,
      deviceId,
      latitude: lat,
      longitude: lon,
      speed: parseFloat(speed) || 0,
      direction: parseFloat(direction) || 0,
      temperature,
      vibration,
      timestamp
    });

    // 7. Construct Live Status Payload
    const liveUpdatePayload = {
      trainNumber,
      train: {
        trainName: train.trainName,
        trainType: train.trainType,
        sourceCode: train.sourceCode,
        sourceName: train.sourceName,
        destinationCode: train.destinationCode,
        destinationName: train.destinationName,
        status: train.status,
        currentDelayMinutes: train.currentDelayMinutes
      },
      location: savedLocation,
      position,
      nextStationETA,
      route: calculatedRoute,
      device: {
        deviceId,
        batteryLevel,
        signalDbm,
        status: 'Online'
      },
      lastUpdated: new Date().toISOString()
    };

    // 8. WebSocket Broadcast
    broadcastTrainUpdate(trainNumber, liveUpdatePayload);
    broadcastDeviceTelemetry({
      deviceId,
      trainNumber,
      latitude: lat,
      longitude: lon,
      speed: parseFloat(speed) || 0,
      direction: parseFloat(direction) || 0,
      temperature,
      vibration,
      batteryLevel,
      signalDbm,
      timestamp
    });

    return liveUpdatePayload;
  }

  /**
   * Fetch complete live tracking snapshot for a given train
   */
  async getTrainLiveStatus(trainNumber) {
    const train = db.getTrainByNumber(trainNumber);
    if (!train) return null;

    const latestLoc = db.getLatestLocation(trainNumber);
    const allStations = db.getAllStations();
    const stationMap = new Map(allStations.map(s => [s.code, s]));

    const routeWithCoords = (train.route || []).map(stop => {
      const stn = stationMap.get(stop.stationCode);
      return {
        ...stop,
        latitude: stn ? stn.latitude : 0,
        longitude: stn ? stn.longitude : 0,
        cityName: stn ? stn.city : stop.stationName
      };
    });

    // If no GPS location yet, fallback to source station coordinates
    const curLat = latestLoc ? latestLoc.latitude : routeWithCoords[0].latitude;
    const curLon = latestLoc ? latestLoc.longitude : routeWithCoords[0].longitude;
    const curSpeed = latestLoc ? latestLoc.speed : 0;

    const position = detectStationPosition(curLat, curLon, curSpeed, routeWithCoords);

    let nextStationETA = null;
    if (position.nextStation && position.distanceToNextKm !== null) {
      nextStationETA = computeNextStationETA(
        position.distanceToNextKm,
        curSpeed,
        position.nextStation.arrivalTime,
        train.currentDelayMinutes
      );
    }

    const calculatedRoute = calculateRouteETAs(
      routeWithCoords,
      position,
      curSpeed,
      train.currentDelayMinutes
    );

    const device = train.activeDeviceId ? db.getDeviceById(train.activeDeviceId) : null;

    return {
      trainNumber: train.trainNumber,
      train: {
        trainName: train.trainName,
        trainType: train.trainType,
        sourceCode: train.sourceCode,
        sourceName: train.sourceName,
        destinationCode: train.destinationCode,
        destinationName: train.destinationName,
        totalDistance: train.totalDistance,
        avgSpeed: train.avgSpeed,
        status: train.status,
        currentDelayMinutes: train.currentDelayMinutes
      },
      location: latestLoc || {
        latitude: curLat,
        longitude: curLon,
        speed: 0,
        direction: 0,
        timestamp: new Date().toISOString()
      },
      position,
      nextStationETA,
      route: calculatedRoute,
      device: device || {
        deviceId: 'SIMULATED-GPS',
        status: 'Online',
        batteryLevel: 98,
        signalDbm: -65
      },
      lastUpdated: latestLoc ? latestLoc.timestamp : new Date().toISOString()
    };
  }
}

module.exports = new IoTService();
