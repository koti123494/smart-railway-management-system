import { Request, Response, NextFunction } from 'express';
import { railwayService } from '../services/railway/RailwayService.js';
import { railwayConfig } from '../config/railway.js';

export async function getDashboardStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const stats = await railwayService.getDashboardStats();
    res.json({
      success: true,
      data: stats,
      meta: railwayService.getProviderInfo(),
    });
  } catch (error) {
    next(error);
  }
}

export function getHealth(req: Request, res: Response): void {
  const providerInfo = railwayService.getProviderInfo();
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: railwayConfig.nodeEnv,
    provider: providerInfo.provider,
    mockMode: providerInfo.mockMode,
  });
}
