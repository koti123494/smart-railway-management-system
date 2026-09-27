// backend/controllers/iotController.js
const db = require('../config/db');
const iotService = require('../services/iotService');
const simulator = require('../simulator/trainSimulator');

exports.receiveLocation = async (req, res, next) => {
  try {
    const payload = req.body;

    if (!payload || !payload.deviceId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payload: deviceId is required.'
      });
    }

    if (payload.latitude === undefined || payload.longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payload: latitude and longitude are required.'
      });
    }

    const result = await iotService.processIncomingTelemetry(payload);

    return res.status(200).json({
      success: true,
      message: 'Telemetry received and processed successfully',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

exports.getDevices = (req, res, next) => {
  try {
    const devices = db.getAllDevices();
    return res.json({
      success: true,
      count: devices.length,
      data: devices,
      message: 'Registered IoT devices retrieved'
    });
  } catch (err) {
    next(err);
  }
};

exports.getDeviceById = (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const device = db.getDeviceById(deviceId);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: `Device ${deviceId} not found`
      });
    }

    const history = db.getLocationHistory(deviceId, 50);

    return res.json({
      success: true,
      data: {
        ...device,
        recentTelemetry: history
      },
      message: 'Device details and recent telemetry retrieved'
    });
  } catch (err) {
    next(err);
  }
};

exports.getDeviceHistory = (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const limit = parseInt(req.query.limit, 10) || 100;
    const history = db.getLocationHistory(deviceId, limit);

    return res.json({
      success: true,
      count: history.length,
      data: history,
      message: `Historical telemetry logs for ${deviceId}`
    });
  } catch (err) {
    next(err);
  }
};

// Simulator Controls for SIH Demo
exports.startSimulator = (req, res, next) => {
  try {
    const { trainNumber = '12723', intervalMs = 3000, stepSize = 0.04 } = req.body;
    const result = simulator.startSimulation(trainNumber, intervalMs, stepSize);

    return res.json({
      success: true,
      data: result,
      message: `Simulation started for train #${trainNumber}`
    });
  } catch (err) {
    next(err);
  }
};

exports.stopSimulator = (req, res, next) => {
  try {
    const { trainNumber = '12723' } = req.body;
    const result = simulator.stopSimulation(trainNumber);

    return res.json({
      success: true,
      data: result,
      message: `Simulation stopped for train #${trainNumber}`
    });
  } catch (err) {
    next(err);
  }
};

exports.getSimulatorStatus = (req, res, next) => {
  try {
    const active = simulator.getSimulationStatus();
    return res.json({
      success: true,
      data: active,
      message: 'Active simulation instances retrieved'
    });
  } catch (err) {
    next(err);
  }
};
