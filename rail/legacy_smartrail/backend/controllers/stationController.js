// backend/controllers/stationController.js
const db = require('../config/db');

exports.searchStations = (req, res, next) => {
  try {
    const { q } = req.query;
    const stations = db.searchStations(q);
    return res.json({
      success: true,
      count: stations.length,
      data: stations,
      message: `Found ${stations.length} stations`
    });
  } catch (err) {
    next(err);
  }
};

exports.getStationByCode = (req, res, next) => {
  try {
    const { stationCode } = req.params;
    const station = db.getStationByCode(stationCode);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: `Station with code ${stationCode} not found`
      });
    }

    // Find all trains halting at this station
    const allTrains = db.getAllTrains();
    const scheduledTrains = [];

    for (const train of allTrains) {
      const stop = (train.route || []).find(r => r.stationCode === station.code);
      if (stop) {
        scheduledTrains.push({
          trainNumber: train.trainNumber,
          trainName: train.trainName,
          trainType: train.trainType,
          source: train.sourceName,
          destination: train.destinationName,
          arrivalTime: stop.arrivalTime,
          departureTime: stop.departureTime,
          platform: stop.platform,
          currentDelayMinutes: train.currentDelayMinutes,
          status: train.status
        });
      }
    }

    return res.json({
      success: true,
      data: {
        station,
        liveBoard: scheduledTrains
      },
      message: 'Station details and live timetable retrieved'
    });
  } catch (err) {
    next(err);
  }
};
