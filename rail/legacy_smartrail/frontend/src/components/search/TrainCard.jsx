// frontend/src/components/search/TrainCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Train,
  ArrowRight,
  Clock,
  MapPin,
  Radio,
  Cpu,
  ShieldAlert
} from 'lucide-react';
import { DelayBadge, StatusBadge } from '../common/Badge';

export default function TrainCard({ train }) {
  if (!train) return null;

  const isVandeBharat = (train.trainType || '').toLowerCase().includes('vande');
  const isRajdhani = (train.trainType || '').toLowerCase().includes('rajdhani');

  return (
    <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group">
      {/* Top accent badge */}
      {isVandeBharat && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-xl shadow-sm">
          Vande Bharat ⚡
        </div>
      )}
      {isRajdhani && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-l from-red-600 to-amber-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-xl shadow-sm">
          Rajdhani Express
        </div>
      )}

      {/* Train Info Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-lg text-blue-600 dark:text-blue-400">
              #{train.trainNumber}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
              {train.trainType}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {train.trainName}
          </h3>
        </div>

        <div className="mt-1">
          <DelayBadge delayMinutes={train.currentDelayMinutes} />
        </div>
      </div>

      {/* Origin -> Destination Banner */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Source</div>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {train.sourceName}
            </div>
            <div className="font-mono text-xs text-slate-500 font-semibold">
              {train.sourceCode}
            </div>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="text-[10px] text-slate-400 font-mono mb-1">{train.durationHours || '8h 30m'}</div>
            <div className="w-24 sm:w-32 flex items-center">
              <div className="h-0.5 flex-1 bg-blue-400 dark:bg-blue-600" />
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 -ml-1" />
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{train.totalDistance || 699} km</div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Destination</div>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {train.destinationName}
            </div>
            <div className="font-mono text-xs text-slate-500 font-semibold">
              {train.destinationCode}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Details & Action Button */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center space-x-3 text-slate-500 font-mono">
          <span className="flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            <span>{train.activeDeviceId ? 'ESP32 Linked' : 'GPS Tracking'}</span>
          </span>
          <span>•</span>
          <span>{train.route?.length || 7} halts</span>
        </div>

        <Link
          to={`/track/${train.trainNumber}`}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Track Live Status</span>
        </Link>
      </div>
    </div>
  );
}
