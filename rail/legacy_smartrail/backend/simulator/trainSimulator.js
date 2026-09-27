// backend/simulator/trainSimulator.js
// High-fidelity GPS route simulator for Smart India Hackathon (SIH) live presentation

const db = require('../config/db');
const iotService = require('../services/iotService');

class TrainSimulator {
  constructor() {
    this.activeSimulations = new Map(); // trainNumber -> simulationHandle
  }

  /**
   * Linear interpolation between two coordinates
   */
  interpolate(p1, p2, fraction) {
    return {
      latitude: p1.latitude + (p2.latitude - p1.latitude) * fraction,
      longitude: p1.longitude + (p2.longitude - p1.longitude) * fraction
    };
  }

  /**
   * Calculate heading/bearing in degrees between two coordinates
   */
  calculateBearing(lat1, lon1, lat2, lon2) {
    const y = Math.sin((lon2 - lon1) * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180));
    const x =
      Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
      Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos((lon2 - lon1) * (Math.PI / 180));
    const brng = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
    return Math.round(brng);
  }

  /**
   * Start or restart simulation for a train
   */
  startSimulation(trainNumber = '12723', intervalMs = 3000, stepSize = 0.04) {
    if (this.activeSimulations.has(trainNumber)) {
      console.log(`Simulation already running for train ${trainNumber}`);
      return { status: 'already_running', trainNumber };
    }

    const train = db.getTrainByNumber(trainNumber);
    if (!train) {
      throw new Error(`Train ${trainNumber} not found`);
    }

    const allStations = db.getAllStations();
    const stationMap = new Map(allStations.map(s => [s.code, s]));

    const waypoints = (train.route || []).map(r => {
      const stn = stationMap.get(r.stationCode);
      return {
        stationCode: r.stationCode,
        stationName: r.stationName,
        latitude: stn ? stn.latitude : 0,
        longitude: stn ? stn.longitude : 0
      };
    }).filter(w => w.latitude !== 0);

    if (waypoints.length < 2) {
      throw new Error('Not enough waypoints to simulate train movement');
    }

    // Start simulation at segment 2 or 3 for instant visual action near major junctions
    let segmentIndex = 1; // start between stop 1 and 2 (e.g. SC and KZJ)
    let fraction = 0.35;
    const deviceId = train.activeDeviceId || `ESP32-TRAIN-${trainNumber.slice(-3)}`;

    console.log(`🚀 Starting SIH GPS Simulation for Train ${trainNumber} (${train.trainName})`);

    const timer = setInterval(async () => {
      try {
        const p1 = waypoints[segmentIndex];
        const p2 = waypoints[segmentIndex + 1];

        if (!p2) {
          // Loop back to beginning or reverse
          segmentIndex = 0;
          fraction = 0.0;
          return;
        }

        fraction += stepSize;
        if (fraction >= 1.0) {
          fraction = 0.0;
          segmentIndex++;
          if (segmentIndex >= waypoints.length - 1) {
            segmentIndex = 0; // restart journey
          }
        }

        const currentCoord = this.interpolate(p1, p2, fraction);
        const direction = this.calculateBearing(p1.latitude, p1.longitude, p2.latitude, p2.longitude);

        // Realistic railway speed with slight variation (75 - 110 km/h)
        const baseSpeed = train.trainType === 'Vande Bharat' ? 115 : 82;
        const currentSpeed = Math.round(baseSpeed + (Math.random() * 8 - 4));
        const temperature = Math.round((28.0 + Math.random() * 2) * 10) / 10;
        const vibration = Math.round((0.10 + Math.random() * 0.08) * 100) / 100;

        await iotService.processIncomingTelemetry({
          deviceId,
          trainNumber,
          latitude: currentCoord.latitude,
          longitude: currentCoord.longitude,
          speed: currentSpeed,
          direction,
          temperature,
          vibration,
          batteryLevel: 94,
          signalDbm: -68,
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        console.error(`Simulation tick error for train ${trainNumber}:`, err.message);
      }
    }, intervalMs);

    this.activeSimulations.set(trainNumber, {
      timer,
      intervalMs,
      startedAt: new Date().toISOString()
    });

    return {
      status: 'started',
      trainNumber,
      deviceId,
      intervalMs
    };
  }

  /**
   * Stop active simulation
   */
  stopSimulation(trainNumber) {
    const sim = this.activeSimulations.get(trainNumber);
    if (!sim) {
      return { status: 'not_running', trainNumber };
    }

    clearInterval(sim.timer);
    this.activeSimulations.delete(trainNumber);
    console.log(`⏹️ Stopped simulation for train ${trainNumber}`);

    return { status: 'stopped', trainNumber };
  }

  /**
   * Get status of all active simulations
   */
  getSimulationStatus() {
    const list = [];
    for (const [trainNumber, info] of this.activeSimulations.entries()) {
      list.push({
        trainNumber,
        startedAt: info.startedAt,
        intervalMs: info.intervalMs
      });
    }
    return list;
  }
}

const simulator = new TrainSimulator();
module.exports = simulator;
