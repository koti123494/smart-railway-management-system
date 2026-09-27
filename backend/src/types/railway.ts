export type TrainStatusType =
  | 'RUNNING'
  | 'DELAYED'
  | 'CANCELLED'
  | 'NOT_STARTED'
  | 'COMPLETED';

export type LocationType =
  | 'LIVE_GPS'
  | 'LAST_REPORTED_STATION'
  | 'ESTIMATED'
  | 'SCHEDULED';

export type StopStatus = 'COMPLETED' | 'CURRENT' | 'UPCOMING' | 'SKIPPED';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface StationBase {
  code: string;
  name: string;
  state: string;
  zone?: string;
  division?: string;
  coordinates: Coordinates;
}

export interface StationDetails extends StationBase {
  platforms?: number;
  passingTrainsCount?: number;
  passingTrains?: Array<{
    trainNumber: string;
    trainName: string;
    arrivalTime: string;
    departureTime: string;
    source: string;
    destination: string;
    platform: string;
  }>;
}

export interface TimelineStop {
  stopNumber: number;
  station: StationBase;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival?: string;
  actualDeparture?: string;
  estimatedArrival?: string;
  estimatedDeparture?: string;
  delayArrivalMinutes: number;
  delayDepartureMinutes: number;
  status: StopStatus;
  distanceKm: number;
  dayCount: number;
  platform: string;
  haltMinutes: number;
}

export interface TrainLocation {
  trainNumber: string;
  trainName: string;
  locationType: LocationType;
  reportedLocation: {
    stationName: string;
    stationCode: string;
    coordinates: Coordinates;
    distanceFromOriginKm: number;
    platform?: string;
  };
  hasGps: boolean;
  speedKmH?: number;
  bearingDegrees?: number;
  lastUpdated: string;
  statusMessage: string;
  dataAccuracyNote: string;
}

export interface TrainLiveStatus {
  trainNumber: string;
  trainName: string;
  trainType: string;
  source: StationBase;
  destination: StationBase;
  status: TrainStatusType;
  delayMinutes: number;
  locationType: LocationType;
  currentStation: {
    code: string;
    name: string;
    coordinates: Coordinates;
    platform: string;
    haltMinutes?: number;
  };
  nextStation?: {
    code: string;
    name: string;
    coordinates: Coordinates;
    distanceKm: number;
    estimatedArrival: string;
    scheduledArrival: string;
  };
  lastReportedStation: {
    code: string;
    name: string;
    coordinates: Coordinates;
    reportedTime: string;
  };
  speedKmH?: number;
  distanceTravelledKm: number;
  totalDistanceKm: number;
  progressPercentage: number;
  lastUpdated: string;
  dataAccuracyNote: string;
  timeline: TimelineStop[];
}

export interface TrainSchedule {
  trainNumber: string;
  trainName: string;
  trainType: string;
  source: StationBase;
  destination: StationBase;
  totalDistanceKm: number;
  runningDays: string[];
  departureTime: string;
  arrivalTime: string;
  totalTravelTime: string;
  classes: string[];
  stops: TimelineStop[];
  lastUpdated: string;
}

export interface TrainSearchResult {
  trainNumber: string;
  trainName: string;
  trainType: string;
  source: {
    code: string;
    name: string;
  };
  destination: {
    code: string;
    name: string;
  };
  departureTime: string;
  arrivalTime: string;
  runningDays: string[];
  currentStatus: TrainStatusType;
  delayMinutes: number;
  distanceKm: number;
}

export interface DashboardStats {
  trackedTrainsCount: number;
  runningCount: number;
  delayedCount: number;
  cancelledCount: number;
  completedCount: number;
  lastUpdated: string;
  popularTrains: TrainSearchResult[];
}
