import dotenv from 'dotenv';

dotenv.config();

export interface RailwayConfig {
  port: number;
  nodeEnv: string;
  useMockApi: boolean;
  apiKey: string;
  apiBaseUrl: string;
  apiHost: string;
  cacheTtlLiveStatus: number;
  cacheTtlSchedule: number;
  rateLimitMax: number;
  rateLimitWindowMs: number;
  frontendUrl: string;
}

export const railwayConfig: RailwayConfig = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  useMockApi: process.env.USE_MOCK_RAILWAY_API === 'true' || !process.env.RAILWAY_API_KEY,
  apiKey: process.env.RAILWAY_API_KEY || '',
  apiBaseUrl: process.env.RAILWAY_API_BASE_URL || 'https://irctc1.p.rapidapi.com/api/v1',
  apiHost: process.env.RAILWAY_API_HOST || 'irctc1.p.rapidapi.com',
  cacheTtlLiveStatus: parseInt(process.env.CACHE_TTL_LIVE_STATUS || '30', 10),
  cacheTtlSchedule: parseInt(process.env.CACHE_TTL_SCHEDULE || '3600', 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '200', 10),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};
