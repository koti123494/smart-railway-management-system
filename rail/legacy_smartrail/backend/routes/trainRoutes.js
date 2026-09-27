// backend/routes/trainRoutes.js
const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

// Search trains (?q= or ?from=BZA&to=SC)
router.get('/search', trainController.searchTrains);

// Get live active tracking list
router.get('/live', trainController.getAllLiveTrains);

// Get train static details and schedule
router.get('/:trainNumber', trainController.getTrainDetails);

// Get real-time tracking status, position, and ETAs
router.get('/:trainNumber/status', trainController.getTrainLiveStatus);

module.exports = router;
