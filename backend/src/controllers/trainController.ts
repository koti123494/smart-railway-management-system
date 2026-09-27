import { Request, Response, NextFunction } from 'express';
import { railwayService } from '../services/railway/RailwayService.js';

export async function searchTrains(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = (req.query.q as string) || '';
    const results = await railwayService.searchTrains(query);
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

export async function getTrainDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { trainNumber } = req.params;
    const schedule = await railwayService.getTrainSchedule(trainNumber);
    const liveStatus = await railwayService.getTrainStatus(trainNumber);

    if (!schedule && !liveStatus) {
      res.status(404).json({
        success: false,
        error: 'TrainNotFound',
        message: `Train ${trainNumber} was not found in the timetable or active system.`,
      });
      return;
    }

    res.json({
      success: true,
      data: {
        trainNumber,
        trainName: schedule?.trainName || liveStatus?.trainName,
        trainType: schedule?.trainType || liveStatus?.trainType,
        source: schedule?.source || liveStatus?.source,
        destination: schedule?.destination || liveStatus?.destination,
        totalDistanceKm: schedule?.totalDistanceKm || liveStatus?.totalDistanceKm,
        runningDays: schedule?.runningDays || [],
        departureTime: schedule?.departureTime,
        arrivalTime: schedule?.arrivalTime,
        classes: schedule?.classes || [],
        currentStatus: liveStatus?.status || 'RUNNING',
        delayMinutes: liveStatus?.delayMinutes ?? 0,
        currentStation: liveStatus?.currentStation,
        lastReportedStation: liveStatus?.lastReportedStation,
        locationType: liveStatus?.locationType || 'LAST_REPORTED_STATION',
        lastUpdated: liveStatus?.lastUpdated || new Date().toISOString(),
        dataAccuracyNote: liveStatus?.dataAccuracyNote || 'Latest reported station.',
      },
      meta: railwayService.getProviderInfo(),
    });
  } catch (error) {
    next(error);
  }
}

export async function getTrainSchedule(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { trainNumber } = req.params;
    const schedule = await railwayService.getTrainSchedule(trainNumber);

    if (!schedule) {
      res.status(404).json({
        success: false,
        error: 'ScheduleNotFound',
        message: `Schedule for train ${trainNumber} is not available.`,
      });
      return;
    }

    res.json({
      success: true,
      data: schedule,
      meta: railwayService.getProviderInfo(),
    });
  } catch (error) {
    next(error);
  }
}

export async function getTrainStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { trainNumber } = req.params;
    const status = await railwayService.getTrainStatus(trainNumber);

    if (!status) {
      res.status(404).json({
        success: false,
        error: 'StatusNotFound',
        message: `Live running status for train ${trainNumber} is currently unavailable.`,
      });
      return;
    }

    res.json({
      success: true,
      data: status,
      meta: railwayService.getProviderInfo(),
    });
  } catch (error) {
    next(error);
  }
}

export async function getTrainLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { trainNumber } = req.params;
    const location = await railwayService.getTrainLocation(trainNumber);

    if (!location) {
      res.status(404).json({
        success: false,
        error: 'LocationNotFound',
        message: `Location data for train ${trainNumber} could not be retrieved.`,
      });
      return;
    }

    res.json({
      success: true,
      data: location,
      meta: railwayService.getProviderInfo(),
    });
  } catch (error) {
    next(error);
  }
}
