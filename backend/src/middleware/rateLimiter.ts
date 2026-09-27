import rateLimit from 'express-rate-limit';
import { railwayConfig } from '../config/railway.js';

export const apiRateLimiter = rateLimit({
  windowMs: railwayConfig.rateLimitWindowMs,
  max: railwayConfig.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please wait a few moments before requesting live updates again.',
  },
});
