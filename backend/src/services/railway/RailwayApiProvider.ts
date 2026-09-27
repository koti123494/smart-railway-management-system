import {
  TrainSearchResult,
  TrainSchedule,
  TrainLiveStatus,
  TrainLocation,
  StationBase,
  StationDetails,
  DashboardStats,
} from '../../types/railway.js';

export interface RailwayApiProvider {
  readonly providerName: string;
  searchTrains(query: string): Promise<TrainSearchResult[]>;
  getTrainSchedule(trainNumber: string): Promise<TrainSchedule | null>;
  getTrainStatus(trainNumber: string): Promise<TrainLiveStatus | null>;
  getTrainLocation(trainNumber: string): Promise<TrainLocation | null>;
  searchStations(query: string): Promise<StationBase[]>;
  getStationDetails(code: string): Promise<StationDetails | null>;
  getDashboardStats(): Promise<DashboardStats>;
}
