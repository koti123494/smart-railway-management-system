import { Router } from 'express';
import { getDashboardStats, getHealth } from '../controllers/dashboardController.js';

const router = Router();

router.get('/dashboard/stats', getDashboardStats);
router.get('/health', getHealth);

export default router;
