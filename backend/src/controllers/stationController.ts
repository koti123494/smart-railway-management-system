import { Request, Response, NextFunction } from 'express';
import { railwayService } from '../services/railway/RailwayService.js';

export async function searchStations(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = (req.query.q as string) || '';
    const results = await railwayService.searchStations(query);

    res.json({
      success: true,
      count: results.length,
      data: results,
      meta: railwayService.getProviderInfo(),
    });
  } catch (error) {
    next(error);
  }
}

export async function getStationDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { code } = req.params;
    const station = await railwayService.getStationDetails(code);

    if (!station) {
      res.status(404).json({
        success: false,
        error: 'StationNotFound',
        message: `Station with code "${code}" was not found.`,
      });
      return;
    }

    res.json({
      success: true,
      data: station,
      meta: railwayService.getProviderInfo(),
    });
  } catch (error) {
    next(error);
  }
}
