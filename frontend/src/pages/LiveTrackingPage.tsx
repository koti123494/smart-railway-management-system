import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { railwayApi } from '../services/api';
import { TrainLiveStatus, TimelineStop } from '../types';
import { TrainMap } from '../components/train/TrainMap';
import { RouteTimeline } from '../components/train/RouteTimeline';
import { StatusBadge } from '../components/common/StatusBadge';
import { LocationSourceBadge } from '../components/common/LocationSourceBadge';
import { AutoRefreshControl } from '../components/common/AutoRefreshControl';
import { ErrorBanner } from '../components/common/ErrorBanner';
import {
  Train,
  ArrowRight,
  Clock,
  Navigation,
  Gauge,
  Calendar,
  AlertTriangle,
  FileText,
  MapPin,
  ChevronRight,
} from 'lucide-react';

export const LiveTrackingPage: React.FC = () => {
  const { trainNumber = '12801' } = useParams<{ trainNumber: string }>();
  const navigate = useNavigate();

  const [status, setStatus] = useState<TrainLiveStatus | null>(null);
  const [selectedStop, setSelectedStop] = useState<TimelineStop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveStatus = useCallback(
    async (isBackground = false) => {
      try {
        if (!isBackground) setLoading(true);
        setRefreshing(true);
        setError(null);

        const data = await railwayApi.getTrainStatus(trainNumber);
        setStatus(data);

        // Auto select current station if none selected
        if (data && data.timeline) {
          const curr = data.timeline.find((s) => s.status === 'CURRENT');
          if (curr) setSelectedStop(curr);
        }
      } catch (err: any) {
        console.error('Failed to fetch live train status:', err);
        setError(
          err.response?.data?.message ||
            'Unable to retrieve live railway information. The railway service may be temporarily unavailable.'
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [trainNumber]
  );

  useEffect(() => {
    fetchLiveStatus(false);
  }, [fetchLiveStatus]);

  if (loading && !status) {
    return (
      <div className="max-w-5xl mx-auto py-16 space-y-6">
        <div className="h-28 rounded-3xl bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200 dark:border-slate-800" />
        <div className="h-96 rounded-3xl bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200 dark:border-slate-800" />
      </div>
    );
  }

  if (error && !status) {
    return (
      <div className="max-w-3xl mx-auto py-16 space-y-6">
        <ErrorBanner
          type="error"
          title="Live Tracking Unavailable"
          message={error}
          lastUpdated="A few moments ago"
          onRetry={() => fetchLiveStatus(false)}
        />
        <div className="text-center pt-4">
          <Link
            to="/trains"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-all"
          >
            <Train className="w-4 h-4" />
            <span>Search Other Trains</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!status) return null;

  return (
    <div className="space-y-6 pb-20">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/trains" className="hover:text-cyan-600 dark:hover:text-cyan-400">
          Trains
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-slate-900 dark:text-white">
          {status.trainNumber} Live Status
        </span>
      </nav>

      {/* 1. Train Information & Status Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Main Title & Route */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-white font-mono font-extrabold text-base sm:text-lg">
                {status.trainNumber}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 font-semibold text-xs sm:text-sm">
                {status.trainType}
              </span>
              <StatusBadge status={status.status} delayMinutes={status.delayMinutes} size="lg" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {status.trainName}
            </h1>

            {/* Origin -> Destination bar */}
            <div className="flex items-center gap-2 mt-2 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
              <span>
                {status.source.name} ({status.source.code})
              </span>
              <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>
                {status.destination.name} ({status.destination.code})
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Current Station */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
                Current Station
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white block truncate" title={status.currentStation.name}>
                {status.currentStation.name}
              </span>
              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                PF #{status.currentStation.platform}
              </span>
            </div>

            {/* Delay Info */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
                Delay Status
              </span>
              <span
                className={`text-sm font-bold block ${
                  status.delayMinutes > 15 ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {status.delayMinutes > 0 ? `+${status.delayMinutes} mins late` : 'Right on Time'}
              </span>
              <span className="text-xs text-slate-400">vs Timetable</span>
            </div>

            {/* Distance / Progress */}
            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
                Journey Progress
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white block font-mono">
                {status.progressPercentage}%
              </span>
              <span className="text-xs text-slate-400">
                {status.distanceTravelledKm} / {status.totalDistanceKm} km
              </span>
            </div>
          </div>
        </div>

        {/* Accuracy and Telemetry Banner (Requirement #25) */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <LocationSourceBadge
            locationType={status.locationType}
            hasGps={false}
            stationName={status.currentStation.name}
          />

          <Link
            to={`/train/${status.trainNumber}/schedule`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Full Train Timetable & Halt Table</span>
          </Link>
        </div>
      </div>

      {/* Auto-Refresh Control Bar */}
      <AutoRefreshControl
        onRefresh={() => fetchLiveStatus(true)}
        lastUpdatedDate={status.lastUpdated}
        isRefreshing={refreshing}
      />

      {/* 2. Interactive Leaflet Map */}
      <div className="space-y-2">
        <TrainMap
          status={status}
          selectedStop={selectedStop}
          onSelectStop={(stop) => setSelectedStop(stop)}
        />
      </div>

      {/* 3. Vertical Journey Route Timeline */}
      <div className="space-y-2">
        <RouteTimeline
          timeline={status.timeline}
          selectedStop={selectedStop}
          onSelectStop={(stop) => setSelectedStop(stop)}
        />
      </div>
    </div>
  );
};
