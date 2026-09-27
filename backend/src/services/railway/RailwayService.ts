import { RailwayApiProvider } from './RailwayApiProvider.js';
import { MockRailwayProvider } from './MockRailwayProvider.js';
import { RealRailwayProvider } from './RealRailwayProvider.js';
import { railwayConfig } from '../../config/railway.js';
import {
  TrainSearchResult,
  TrainSchedule,
  TrainLiveStatus,
  TrainLocation,
  StationBase,
  StationDetails,
  DashboardStats,
} from '../../types/railway.js';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

export class RailwayService {
  private static instance: RailwayService;
  private provider: RailwayApiProvider;
  private cache = new Map<string, CacheEntry<any>>();
  private pendingRequests = new Map<string, Promise<any>>();

  private constructor() {
    if (railwayConfig.useMockApi || !railwayConfig.apiKey) {
      console.log('[RailwayService] Initialized with MockRailwayProvider (USE_MOCK_RAILWAY_API=true)');
      this.provider = new MockRailwayProvider();
    } else {
      console.log('[RailwayService] Initialized with RealRailwayProvider');
      this.provider = new RealRailwayProvider(
        railwayConfig.apiKey,
        railwayConfig.apiBaseUrl,
        railwayConfig.apiHost
      );
    }
  }

  public static getInstance(): RailwayService {
    if (!RailwayService.instance) {
      RailwayService.instance = new RailwayService();
    }
    return RailwayService.instance;
  }

  public getProviderInfo(): { provider: string; mockMode: boolean } {
    return {
      provider: this.provider.providerName,
      mockMode: this.provider.providerName === 'MockRailwayProvider',
    };
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    const isExpired = Date.now() - entry.timestamp > entry.ttlMs;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  private setInCache<T>(key: string, data: T, ttlSeconds: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttlMs: ttlSeconds * 1000,
    });
  }

  // Deduplicate concurrent in-flight requests
  private async cachedFetch<T>(
    cacheKey: string,
    ttlSeconds: number,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const cached = this.getFromCache<T>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey) as Promise<T>;
    }

    const promise = fetchFn()
      .then((result) => {
        if (result !== null && result !== undefined) {
          this.setInCache(cacheKey, result, ttlSeconds);
        }
        return result;
      })
      .finally(() => {
        this.pendingRequests.delete(cacheKey);
      });

    this.pendingRequests.set(cacheKey, promise);
    return promise;
  }

  async searchTrains(query: string): Promise<TrainSearchResult[]> {
    const cacheKey = `search_trains_${(query || '').trim().toLowerCase()}`;
    return this.cachedFetch(cacheKey, 60, () => this.provider.searchTrains(query));
  }

  async getTrainSchedule(trainNumber: string): Promise<TrainSchedule | null> {
    const cacheKey = `schedule_${trainNumber.trim().toUpperCase()}`;
    return this.cachedFetch(cacheKey, railwayConfig.cacheTtlSchedule, () =>
      this.provider.getTrainSchedule(trainNumber)
    );
  }

  async getTrainStatus(trainNumber: string): Promise<TrainLiveStatus | null> {
    const cacheKey = `status_${trainNumber.trim().toUpperCase()}`;
    return this.cachedFetch(cacheKey, railwayConfig.cacheTtlLiveStatus, () =>
      this.provider.getTrainStatus(trainNumber)
    );
  }

  async getTrainLocation(trainNumber: string): Promise<TrainLocation | null> {
    const cacheKey = `location_${trainNumber.trim().toUpperCase()}`;
    return this.cachedFetch(cacheKey, railwayConfig.cacheTtlLiveStatus, () =>
      this.provider.getTrainLocation(trainNumber)
    );
  }

  async searchStations(query: string): Promise<StationBase[]> {
    const cacheKey = `search_stations_${(query || '').trim().toLowerCase()}`;
    return this.cachedFetch(cacheKey, 300, () => this.provider.searchStations(query));
  }

  async getStationDetails(code: string): Promise<StationDetails | null> {
    const cacheKey = `station_${code.trim().toUpperCase()}`;
    return this.cachedFetch(cacheKey, 300, () => this.provider.getStationDetails(code));
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const cacheKey = 'dashboard_stats';
    return this.cachedFetch(cacheKey, 15, () => this.provider.getDashboardStats());
  }

  // Clear cache helper for testing
  public clearCache(): void {
    this.cache.clear();
    this.pendingRequests.clear();
  }
}

export const railwayService = RailwayService.getInstance();
