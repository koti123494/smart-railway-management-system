// backend/controllers/trainController.js
const db = require('../config/db');
const railwayApiService = require('../services/railwayApiService');
const iotService = require('../services/iotService');

exports.searchTrains = async (req, res, next) => {
  try {
    const { q, from, to } = req.query;

    if (from && to) {
      const results = await railwayApiService.getTrainsBetweenStations(from, to);
      return res.json({
        success: true,
        count: results.length,
        data: results,
        message: `Found ${results.length} trains between ${from} and ${to}`
      });
    }

    if (q) {
      const results = await railwayApiService.searchTrains(q);
      return res.json({
        success: true,
        count: results.length,
        data: results,
        message: `Found ${results.length} trains matching "${q}"`
      });
    }

    const allTrains = db.getAllTrains();
    return res.json({
      success: true,
      count: allTrains.length,
      data: allTrains,
      message: 'All registered trains retrieved'
    });
  } catch (err) {
    next(err);
  }
};

exports.getTrainDetails = async (req, res, next) => {
  try {
    const { trainNumber } = req.params;
    const train = await railwayApiService.getTrainDetails(trainNumber);

    if (!train) {
      return res.status(404).json({
        success: false,
        message: `Train #${trainNumber} not found in railway database`
      });
    }

    return res.json({
      success: true,
      data: train,
      message: 'Train details retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.getTrainLiveStatus = async (req, res, next) => {
  try {
    const { trainNumber } = req.params;
    const statusData = await iotService.getTrainLiveStatus(trainNumber);

    if (!statusData) {
      return res.status(404).json({
        success: false,
        message: `Live status for train #${trainNumber} is not available.`
      });
    }

    return res.json({
      success: true,
      data: statusData,
      message: 'Live train status retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllLiveTrains = async (req, res, next) => {
  try {
    const trains = db.getAllTrains();
    const liveList = await Promise.all(
      trains.map(t => iotService.getTrainLiveStatus(t.trainNumber))
    );

    return res.json({
      success: true,
      count: liveList.length,
      data: liveList.filter(Boolean),
      message: 'Active trains tracking feed retrieved'
    });
  } catch (err) {
    next(err);
  }
};
