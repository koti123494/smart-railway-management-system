import axios from 'axios';
import {
  ApiResponse,
  TrainSearchResult,
  TrainSchedule,
  TrainLiveStatus,
  TrainLocation,
  StationBase,
  StationDetails,
  DashboardStats,
} from '../types';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const railwayApi = {
  // Train Search
  async searchTrains(query: string = ''): Promise<TrainSearchResult[]> {
    const res = await apiClient.get<ApiResponse<TrainSearchResult[]>>('/trains/search', {
      params: { q: query },
    });
    return res.data.data;
  },

  // Train Details Overview
  async getTrainDetails(trainNumber: string): Promise<any> {
    const res = await apiClient.get<ApiResponse<any>>(`/trains/${trainNumber}`);
    return res.data.data;
  },

  // Train Schedule
  async getTrainSchedule(trainNumber: string): Promise<TrainSchedule> {
    const res = await apiClient.get<ApiResponse<TrainSchedule>>(`/trains/${trainNumber}/schedule`);
    return res.data.data;
  },

  // Live Train Status
  async getTrainStatus(trainNumber: string): Promise<TrainLiveStatus> {
    const res = await apiClient.get<ApiResponse<TrainLiveStatus>>(`/trains/${trainNumber}/status`);
    return res.data.data;
  },

  // Live Train Location
  async getTrainLocation(trainNumber: string): Promise<TrainLocation> {
    const res = await apiClient.get<ApiResponse<TrainLocation>>(`/trains/${trainNumber}/location`);
    return res.data.data;
  },

  // Station Search
  async searchStations(query: string = ''): Promise<StationBase[]> {
    const res = await apiClient.get<ApiResponse<StationBase[]>>('/stations/search', {
      params: { q: query },
    });
    return res.data.data;
  },

  // Station Details
  async getStationDetails(code: string): Promise<StationDetails> {
    const res = await apiClient.get<ApiResponse<StationDetails>>(`/stations/${code}`);
    return res.data.data;
  },

  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return res.data.data;
  },

  // System Health & Provider info
  async getHealth(): Promise<{ status: string; mockMode: boolean; provider: string }> {
    const res = await apiClient.get('/health');
    return res.data;
  },
};
