import { Router } from 'express';
import {
  searchTrains,
  getTrainDetails,
  getTrainSchedule,
  getTrainStatus,
  getTrainLocation,
} from '../controllers/trainController.js';
import { validateTrainNumber } from '../middleware/validator.js';

const router = Router();

// /api/trains/search?q=
router.get('/search', searchTrains);

// /api/trains/:trainNumber
router.get('/:trainNumber', validateTrainNumber, getTrainDetails);

// /api/trains/:trainNumber/schedule
router.get('/:trainNumber/schedule', validateTrainNumber, getTrainSchedule);

// /api/trains/:trainNumber/status
router.get('/:trainNumber/status', validateTrainNumber, getTrainStatus);

// /api/trains/:trainNumber/location
router.get('/:trainNumber/location', validateTrainNumber, getTrainLocation);

export default router;
