// backend/routes/iotRoutes.js
const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iotController');
const { verifyEsp32Auth } = require('../middleware/authMiddleware');

// Primary ESP32 REST Ingest Endpoint (called by physical hardware or simulator)
router.post('/location', verifyEsp32Auth, iotController.receiveLocation);

// IoT Device management and telemetry feeds
router.get('/devices', iotController.getDevices);
router.get('/devices/:deviceId', iotController.getDeviceById);
router.get('/devices/:deviceId/history', iotController.getDeviceHistory);

// Simulator control endpoints (for SIH live demo in browser)
router.post('/simulator/start', iotController.startSimulator);
router.post('/simulator/stop', iotController.stopSimulator);
router.get('/simulator/status', iotController.getSimulatorStatus);

module.exports = router;
