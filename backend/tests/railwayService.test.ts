import { describe, it, expect } from 'vitest';
import { railwayService } from '../src/services/railway/RailwayService.js';

describe('RailwayService & MockRailwayProvider', () => {
  it('searches trains by train number and name', async () => {
    const resultsNumber = await railwayService.searchTrains('12801');
    expect(resultsNumber.length).toBeGreaterThan(0);
    expect(resultsNumber[0].trainNumber).toBe('12801');
    expect(resultsNumber[0].trainName).toBe('Purushottam Express');

    const resultsName = await railwayService.searchTrains('Karnataka');
    expect(resultsName.length).toBeGreaterThan(0);
    expect(resultsName[0].trainNumber).toBe('12627');
  });

  it('retrieves accurate train schedule', async () => {
    const schedule = await railwayService.getTrainSchedule('12801');
    expect(schedule).not.toBeNull();
    expect(schedule?.trainNumber).toBe('12801');
    expect(schedule?.stops.length).toBeGreaterThan(5);
    expect(schedule?.source.code).toBe('PURI');
    expect(schedule?.destination.code).toBe('NDLS');
  });

  it('retrieves live status with timeline and delay calculations', async () => {
    const status = await railwayService.getTrainStatus('12801');
    expect(status).not.toBeNull();
    expect(status?.trainNumber).toBe('12801');
    expect(status?.delayMinutes).toBeGreaterThanOrEqual(0);
    expect(status?.currentStation).toBeDefined();
    expect(status?.timeline.length).toBeGreaterThan(0);

    // Verify timeline has completed, current, and upcoming stops
    const completedStops = status?.timeline.filter((s) => s.status === 'COMPLETED');
    const currentStop = status?.timeline.find((s) => s.status === 'CURRENT');
    const upcomingStops = status?.timeline.filter((s) => s.status === 'UPCOMING');

    expect(completedStops?.length).toBeGreaterThan(0);
    expect(currentStop).toBeDefined();
    expect(upcomingStops?.length).toBeGreaterThan(0);
  });

  it('STRICT ACCURACY CHECK: Never claims live GPS when using reported station telemetry', async () => {
    const location = await railwayService.getTrainLocation('12801');
    expect(location).not.toBeNull();
    expect(location?.hasGps).toBe(false);
    expect(location?.locationType).toBe('LAST_REPORTED_STATION');
    expect(location?.dataAccuracyNote).toContain('Latest reported station');
  });

  it('searches stations and retrieves station details with passing trains', async () => {
    const stations = await railwayService.searchStations('Vijayawada');
    expect(stations.length).toBeGreaterThan(0);
    expect(stations[0].code).toBe('BZA');

    const details = await railwayService.getStationDetails('BZA');
    expect(details).not.toBeNull();
    expect(details?.code).toBe('BZA');
    expect(details?.name).toBe('Vijayawada Junction');
    expect(details?.passingTrains?.length).toBeGreaterThan(0);
  });

  it('retrieves dashboard stats with counts', async () => {
    const stats = await railwayService.getDashboardStats();
    expect(stats.trackedTrainsCount).toBeGreaterThan(0);
    expect(stats.runningCount).toBeGreaterThanOrEqual(0);
    expect(stats.popularTrains.length).toBeGreaterThan(0);
  });
});
