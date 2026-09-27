import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Calendar, Navigation } from 'lucide-react';
import { TrainSearchResult } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface TrainCardProps {
  train: TrainSearchResult;
  onSelectRecent?: (trainNumber: string, trainName: string) => void;
}

export const TrainCard: React.FC<TrainCardProps> = ({ train, onSelectRecent }) => {
  const handleClick = () => {
    if (onSelectRecent) {
      onSelectRecent(train.trainNumber, train.trainName);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all hover:border-cyan-500/50 flex flex-col justify-between group">
      <div>
        {/* Top bar: Train Number & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-bold text-sm">
                {train.trainNumber}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400">
                {train.trainType}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {train.trainName}
            </h3>
          </div>
          <StatusBadge status={train.currentStatus} delayMinutes={train.delayMinutes} size="sm" />
        </div>

        {/* Route: Origin -> Destination */}
        <div className="my-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex-1">
            <span className="text-xs text-slate-400 block">Departs</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              {train.departureTime}
            </span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 block truncate" title={train.source.name}>
              {train.source.name} ({train.source.code})
            </span>
          </div>

          <div className="flex flex-col items-center px-3 text-slate-400">
            <ArrowRight className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-[10px] text-slate-400 mt-0.5">{train.distanceKm} km</span>
          </div>

          <div className="flex-1 text-right">
            <span className="text-xs text-slate-400 block">Arrives</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              {train.arrivalTime}
            </span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 block truncate" title={train.destination.name}>
              {train.destination.name} ({train.destination.code})
            </span>
          </div>
        </div>

        {/* Running Days */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Runs on:</span>
          <div className="flex items-center gap-1 font-mono">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
              const runs = train.runningDays.includes(day) || train.runningDays.includes('Daily');
              return (
                <span
                  key={day}
                  className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold ${
                    runs
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                  }`}
                  title={day}
                >
                  {day[0]}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <Link
          to={`/train/${train.trainNumber}/live`}
          onClick={handleClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white text-xs font-semibold shadow-sm shadow-cyan-500/20 transition-all"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Track Train</span>
        </Link>

        <Link
          to={`/train/${train.trainNumber}/schedule`}
          onClick={handleClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>View Schedule</span>
        </Link>
      </div>
    </div>
  );
};
