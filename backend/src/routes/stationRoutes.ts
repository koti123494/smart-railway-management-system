import { Router } from 'express';
import {
  searchStations,
  getStationDetails,
} from '../controllers/stationController.js';
import { validateStationCode } from '../middleware/validator.js';

const router = Router();

// /api/stations/search?q=
router.get('/search', searchStations);

// /api/stations/:code
router.get('/:code', validateStationCode, getStationDetails);

export default router;
