// backend/routes/stationRoutes.js
const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

// Search stations by code or name
router.get('/search', stationController.searchStations);

// Get station details and live board
router.get('/:stationCode', stationController.getStationByCode);

module.exports = router;
