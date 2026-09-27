// backend/controllers/adminController.js
const db = require('../config/db');
const { getIO } = require('../services/websocketService');

exports.registerDevice = (req, res, next) => {
  try {
    const { deviceId, trainNumber, firmwareVersion, batteryLevel, signalDbm } = req.body;

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: 'deviceId is required'
      });
    }

    const device = db.registerDevice({
      deviceId,
      trainNumber,
      firmwareVersion,
      batteryLevel,
      signalDbm
    });

    return res.status(201).json({
      success: true,
      data: device,
      message: `Device ${deviceId} successfully registered`
    });
  } catch (err) {
    next(err);
  }
};

exports.assignDevice = (req, res, next) => {
  try {
    const { deviceId, trainNumber } = req.body;

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: 'deviceId is required'
      });
    }

    const updated = db.assignDevice(deviceId, trainNumber);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Device ${deviceId} not found`
      });
    }

    return res.json({
      success: true,
      data: updated,
      message: `Assigned device ${deviceId} to train ${trainNumber || 'Unassigned'}`
    });
  } catch (err) {
    next(err);
  }
};

exports.getSystemStats = (req, res, next) => {
  try {
    const trains = db.getAllTrains();
    const stations = db.getAllStations();
    const devices = db.getAllDevices();
    const history = db.getLocationHistory(null, 1000);

    const onlineDevices = devices.filter(d => d.status === 'Online').length;
    const trackedTrains = trains.filter(t => t.activeDeviceId).length;

    let activeSocketsCount = 0;
    const io = getIO();
    if (io && io.sockets && io.sockets.sockets) {
      activeSocketsCount = io.sockets.sockets.size;
    }

    return res.json({
      success: true,
      data: {
        totalTrains: trains.length,
        trackedTrains,
        totalStations: stations.length,
        totalDevices: devices.length,
        onlineDevices,
        totalGpsPings: history.length,
        activeWebSocketClients: activeSocketsCount,
        serverUptimeSeconds: Math.round(process.uptime()),
        memoryUsageMb: Math.round(process.memoryUsage().rss / (1024 * 1024))
      },
      message: 'System statistics retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.getAuditLogs = (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const logs = db.getAuditLogs(limit);

    return res.json({
      success: true,
      count: logs.length,
      data: logs,
      message: 'System audit logs retrieved'
    });
  } catch (err) {
    next(err);
  }
};
