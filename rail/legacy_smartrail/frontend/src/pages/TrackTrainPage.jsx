// frontend/src/pages/TrackTrainPage.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Train,
  ArrowLeft,
  RefreshCw,
  Radio,
  Share2,
  Bell,
  Clock,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { useTrainTracking } from '../hooks/useTrainTracking';
import LiveLocationCard from '../components/tracking/LiveLocationCard';
import TrainMap from '../components/tracking/TrainMap';
import StationTimeline from '../components/tracking/StationTimeline';
import TelemetryCard from '../components/tracking/TelemetryCard';
import GpsSimulatorWidget from '../components/iot/GpsSimulatorWidget';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { DelayBadge, StatusBadge } from '../common/Badge';

export default function TrackTrainPage() {
  const { trainNumber = '12723' } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch, isConnected, lastEventTime, isLiveReceiving } = useTrainTracking(trainNumber);

  if (loading && !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <LoadingSpinner message={`Locking GPS and WebSocket telemetry for Train #${trainNumber}...`} />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ErrorMessage
          title="Train Tracking Unavailable"
          message={error}
          onRetry={refetch}
        />
        <div className="text-center mt-6">
          <Link
            to="/search"
            className="inline-flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Train Search</span>
          </Link>
        </div>
      </div>
    );
  }

  const train = data?.train || {};
  const location = data?.location || {};
  const position = data?.position || {};
  const nextStationETA = data?.nextStationETA;
  const route = data?.route || [];
  const device = data?.device || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header Navigation & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Link
            to="/search"
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            title="Back to search"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 font-bold">
                #{trainNumber}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {train.trainType || 'Superfast Express'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {train.trainName || 'Telangana Express'}
            </h1>
          </div>
        </div>

        {/* Quick Actions & Train Selector */}
        <div className="flex items-center space-x-3">
          <select
            value={trainNumber}
            onChange={(e) => navigate(`/track/${e.target.value}`)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          >
            <option value="12723">#12723 Telangana Exp</option>
            <option value="20833">#20833 Vande Bharat</option>
            <option value="12433">#12433 Rajdhani Exp</option>
            <option value="12627">#12627 Karnataka Exp</option>
          </select>

          <button
            onClick={refetch}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            title="Refresh Status"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Live Location Card */}
      <LiveLocationCard
        train={train}
        location={location}
        position={position}
        nextStationETA={nextStationETA}
        device={device}
        lastUpdated={data?.lastUpdated}
        isLiveReceiving={isLiveReceiving}
      />

      {/* Dual Layout: Left Map & Telemetry | Right Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map + IoT Sensor Telemetry */}
        <div className="lg:col-span-7 space-y-6">
          <TrainMap
            location={location}
            route={route}
            position={position}
            trainName={train.trainName}
            trainNumber={trainNumber}
            autoFollow={true}
          />

          <TelemetryCard
            location={location}
            device={device}
            trainNumber={trainNumber}
          />

          {/* Interactive In-Page Simulator Widget for SIH presentation */}
          <GpsSimulatorWidget defaultTrainNumber={trainNumber} />
        </div>

        {/* Right Column: "Where Is My Train" Route Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <StationTimeline
            route={route}
            position={position}
            currentDelayMinutes={train.currentDelayMinutes}
          />
        </div>
      </div>
    </div>
  );
}
