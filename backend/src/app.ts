import express, { Express } from 'express';
import cors from 'cors';
import { railwayConfig } from './config/railway.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import trainRoutes from './routes/trainRoutes.js';
import stationRoutes from './routes/stationRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

export function createApp(): Express {
  const app = express();

  // Basic middleware
  app.use(
    cors({
      origin: [railwayConfig.frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());

  // Apply rate limiting to all /api/ endpoints
  app.use('/api/', apiRateLimiter);

  // Mount routes
  app.use('/api/trains', trainRoutes);
  app.use('/api/stations', stationRoutes);
  app.use('/api', dashboardRoutes);

  // 404 for unknown API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      error: 'NotFound',
      message: `API endpoint ${req.originalUrl} not found.`,
    });
  });

  // Global error handler
  app.use(errorHandler);

  return app;
}
