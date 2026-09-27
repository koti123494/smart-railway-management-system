// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAdminAuth } = require('../middleware/authMiddleware');

router.use(verifyAdminAuth);

// Register and assign devices
router.post('/devices', adminController.registerDevice);
router.post('/devices/assign', adminController.assignDevice);

// System health and stats
router.get('/stats', adminController.getSystemStats);

// System audit logs
router.get('/logs', adminController.getAuditLogs);

module.exports = router;
