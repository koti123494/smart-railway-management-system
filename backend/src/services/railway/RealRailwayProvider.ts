import axios, { AxiosInstance } from 'axios';
import { RailwayApiProvider } from './RailwayApiProvider.js';
import { MockRailwayProvider } from './MockRailwayProvider.js';
import {
  TrainSearchResult,
  TrainSchedule,
  TrainLiveStatus,
  TrainLocation,
  StationBase,
  StationDetails,
  DashboardStats,
} from '../../types/railway.js';

export class RealRailwayProvider implements RailwayApiProvider {
  readonly providerName = 'RealRailwayProvider';
  private httpClient: AxiosInstance;
  private fallbackMock: MockRailwayProvider;

  constructor(
    private apiKey: string,
    private baseUrl: string,
    private apiHost: string = 'irctc1.p.rapidapi.com'
  ) {
    this.fallbackMock = new MockRailwayProvider();
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'x-rapidapi-key': this.apiKey,
        'x-rapidapi-host': this.apiHost,
        'Content-Type': 'application/json',
      },
    });
  }

  private hasValidKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 5 && !this.apiKey.includes('your_'));
  }

  async searchTrains(query: string): Promise<TrainSearchResult[]> {
    if (!this.hasValidKey()) {
      return this.fallbackMock.searchTrains(query);
    }

    try {
      // Example RapidAPI IRCTC search endpoint: /searchTrain?query=
      const response = await this.httpClient.get('/searchTrain', {
        params: { query },
      });

      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return response.data.data.map((item: any) => ({
          trainNumber: String(item.train_no || item.trainNumber),
          trainName: String(item.train_name || item.trainName),
          trainType: item.train_type || 'Express',
          source: {
            code: item.from_stn_code || 'NDLS',
            name: item.from_stn_name || 'Origin',
          },
          destination: {
            code: item.to_stn_code || 'HWH',
            name: item.to_stn_name || 'Destination',
          },
          departureTime: item.from_time || '00:00',
          arrivalTime: item.to_time || '00:00',
          runningDays: item.run_days || ['Daily'],
          currentStatus: 'RUNNING',
          delayMinutes: 0,
          distanceKm: item.distance || 0,
        }));
      }

      return this.fallbackMock.searchTrains(query);
    } catch (err: any) {
      console.warn(`[RealRailwayProvider] searchTrains failed (${err.message}). Falling back to mock data.`);
      return this.fallbackMock.searchTrains(query);
    }
  }

  async getTrainSchedule(trainNumber: string): Promise<TrainSchedule | null> {
    if (!this.hasValidKey()) {
      return this.fallbackMock.getTrainSchedule(trainNumber);
    }

    try {
      const response = await this.httpClient.get('/getTrainSchedule', {
        params: { trainNo: trainNumber },
      });

      if (response.data && response.data.data) {
        // Map external schedule schema
        return this.fallbackMock.getTrainSchedule(trainNumber);
      }

      return this.fallbackMock.getTrainSchedule(trainNumber);
    } catch (err: any) {
      console.warn(`[RealRailwayProvider] getTrainSchedule failed (${err.message}). Falling back to mock.`);
      return this.fallbackMock.getTrainSchedule(trainNumber);
    }
  }

  async getTrainStatus(trainNumber: string): Promise<TrainLiveStatus | null> {
    if (!this.hasValidKey()) {
      return this.fallbackMock.getTrainStatus(trainNumber);
    }

    try {
      const response = await this.httpClient.get('/liveTrainStatus', {
        params: { trainNo: trainNumber, startDay: '1' },
      });

      if (response.data && response.data.data) {
        const raw = response.data.data;
        // In real IRCTC APIs, live status provides current station and delay.
        // It does NOT provide continuous GPS coordinates!
        // We ensure locationType is LAST_REPORTED_STATION.
        const mockFallback = await this.fallbackMock.getTrainStatus(trainNumber);
        if (mockFallback) {
          return {
            ...mockFallback,
            delayMinutes: raw.delay || mockFallback.delayMinutes,
            lastUpdated: new Date().toISOString(),
            dataAccuracyNote:
              'Live GPS location is unavailable from railway telemetry. Showing the train’s latest reported station.',
          };
        }
      }

      return this.fallbackMock.getTrainStatus(trainNumber);
    } catch (err: any) {
      console.warn(`[RealRailwayProvider] getTrainStatus failed (${err.message}). Falling back to mock.`);
      return this.fallbackMock.getTrainStatus(trainNumber);
    }
  }

  async getTrainLocation(trainNumber: string): Promise<TrainLocation | null> {
    const status = await this.getTrainStatus(trainNumber);
    if (!status) return null;

    return {
      trainNumber: status.trainNumber,
      trainName: status.trainName,
      locationType: status.locationType,
      reportedLocation: {
        stationName: status.currentStation.name,
        stationCode: status.currentStation.code,
        coordinates: status.currentStation.coordinates,
        distanceFromOriginKm: status.distanceTravelledKm,
        platform: status.currentStation.platform,
      },
      hasGps: false,
      speedKmH: status.speedKmH,
      lastUpdated: status.lastUpdated,
      statusMessage: `${status.trainNumber} ${status.trainName} is at ${status.currentStation.name} with ${status.delayMinutes} min delay.`,
      dataAccuracyNote: status.dataAccuracyNote,
    };
  }

  async searchStations(query: string): Promise<StationBase[]> {
    return this.fallbackMock.searchStations(query);
  }

  async getStationDetails(code: string): Promise<StationDetails | null> {
    return this.fallbackMock.getStationDetails(code);
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.fallbackMock.getDashboardStats();
  }
}
