// frontend/src/components/tracking/LiveLocationCard.jsx
import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Gauge,
  ArrowRight,
  TrendingUp,
  Cpu,
  Radio,
  CheckCircle2,
  Navigation2
} from 'lucide-react';
import { DelayBadge } from '../common/Badge';

export default function LiveLocationCard({
  train,
  location,
  position,
  nextStationETA,
  device,
  lastUpdated,
  isLiveReceiving
}) {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    setSecondsAgo(0);
    const timer = setInterval(() => {
      setSecondsAgo(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [lastUpdated, location?.timestamp]);

  const prevStation = position?.previousStation;
  const nextStation = position?.nextStation;
  const isAtStation = position?.isAtStation;

  return (
    <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-6 shadow-xl relative overflow-hidden transition-all">
      {/* Visual Live Pulse Glow Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 ${
        isLiveReceiving
          ? 'bg-gradient-to-r from-emerald-400 via-blue-500 to-emerald-400 animate-pulse'
          : 'bg-blue-600'
      }`} />

      {/* Card Header: Current Status & Delay */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Current Live Location</span>
          </div>
          <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>{position?.statusText || 'Acquiring GPS Telemetry...'}</span>
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <DelayBadge delayMinutes={train?.currentDelayMinutes} />
          <div className="text-right">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{secondsAgo < 5 ? 'Just now' : `${secondsAgo}s ago`}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Breadcrumb: Previous -> Current -> Next */}
      <div className="my-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Previous Station */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Previous Station</span>
            </span>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-base truncate">
              {prevStation ? prevStation.stationName : 'Source Station'}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Departed: {prevStation?.departureTime || '--:--'}
            </div>
          </div>

          {/* Current Leg Progress */}
          <div className="flex flex-col items-center justify-center px-2 py-1 text-center">
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
              <span>{position?.distanceFromPrevKm || 0} km</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{position?.legProgressPercent || 50}% done</span>
              <span>{position?.distanceToNextKm || 0} km</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
              <div
                className="bg-gradient-to-r from-emerald-500 to-blue-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${position?.legProgressPercent || 50}%` }}
              />
            </div>
            <span className="mt-1.5 text-[10px] text-slate-400 font-medium">Haversine GPS Station Detection</span>
          </div>

          {/* Next Station */}
          <div className="space-y-1 md:text-right">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center md:justify-end gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Next Station</span>
            </span>
            <div className="font-bold text-slate-900 dark:text-white text-base truncate">
              {nextStation ? nextStation.stationName : 'Final Destination'}
            </div>
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              ETA: {nextStationETA?.etaTime || nextStation?.arrivalTime || '--:--'}
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Highlight Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700 dark:text-slate-200">
        <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Gauge className="w-3.5 h-3.5 text-blue-500" />
            <span>Current Speed</span>
          </div>
          <div className="mt-1 text-xl font-bold font-mono text-slate-900 dark:text-white">
            {Math.round(location?.speed || 0)} <span className="text-xs font-sans font-normal text-slate-500">km/h</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Next Station In</span>
          </div>
          <div className="mt-1 text-xl font-bold font-mono text-slate-900 dark:text-white">
            {nextStationETA?.remainingTimeHuman || '15 mins'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Remaining Distance</span>
          </div>
          <div className="mt-1 text-xl font-bold font-mono text-slate-900 dark:text-white">
            {position?.distanceToNextKm !== null ? `${position?.distanceToNextKm} km` : '--'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            <span>IoT Tracker</span>
          </div>
          <div className="mt-1 text-sm font-bold font-mono text-slate-900 dark:text-white truncate">
            {device?.deviceId || 'ESP32-ONLINE'}
          </div>
        </div>
      </div>
    </div>
  );
}
