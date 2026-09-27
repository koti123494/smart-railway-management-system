import React from 'react';
import { TimelineStop } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Clock, MapPin } from 'lucide-react';

interface ScheduleTableProps {
  stops: TimelineStop[];
  className?: string;
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({ stops, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${className}`}>
      {/* Table Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Train Timetable & Halts</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Scheduled timings, stoppage durations, and current delay status
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {stops.length} Stations
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-5 py-3.5">#</th>
              <th className="px-5 py-3.5">Station</th>
              <th className="px-5 py-3.5">Scheduled Arr</th>
              <th className="px-5 py-3.5">Scheduled Dep</th>
              <th className="px-5 py-3.5">Halt</th>
              <th className="px-5 py-3.5">Distance</th>
              <th className="px-5 py-3.5">Platform</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Delay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {stops.map((stop) => {
              const isCurrent = stop.status === 'CURRENT';
              return (
                <tr
                  key={stop.station.code}
                  className={`transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50 ${
                    isCurrent ? 'bg-cyan-50/50 dark:bg-cyan-950/30 font-medium' : ''
                  }`}
                >
                  <td className="px-5 py-4 text-xs font-mono text-slate-400">{stop.stopNumber}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {stop.station.code}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {stop.station.name}
                          {isCurrent && (
                            <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">{stop.station.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono font-medium text-slate-700 dark:text-slate-300">
                    {stop.scheduledArrival}
                  </td>
                  <td className="px-5 py-4 font-mono font-medium text-slate-700 dark:text-slate-300">
                    {stop.scheduledDeparture}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400">
                    {stop.haltMinutes > 0 ? `${stop.haltMinutes} min` : '—'}
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                    {stop.distanceKm} km
                  </td>
                  <td className="px-5 py-4 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                    PF #{stop.platform}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={stop.status} size="sm" />
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs font-bold ${
                        stop.delayArrivalMinutes > 15
                          ? 'text-amber-600 dark:text-amber-400'
                          : stop.delayArrivalMinutes > 0
                          ? 'text-slate-700 dark:text-slate-300'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {stop.delayArrivalMinutes > 0 ? `+${stop.delayArrivalMinutes} min` : 'On Time'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800 p-3 space-y-3">
        {stops.map((stop) => {
          const isCurrent = stop.status === 'CURRENT';
          return (
            <div
              key={stop.station.code}
              className={`p-4 rounded-2xl border transition-all ${
                isCurrent
                  ? 'bg-cyan-50/60 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-800'
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      {stop.station.code}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {stop.station.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Platform #{stop.platform} · {stop.distanceKm} km
                  </p>
                </div>
                <StatusBadge status={stop.status} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block">Arrival:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {stop.scheduledArrival}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Departure:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {stop.scheduledDeparture}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Halt:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {stop.haltMinutes > 0 ? `${stop.haltMinutes} mins` : 'Origin/Terminus'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Delay:</span>
                  <span
                    className={`font-bold ${
                      stop.delayArrivalMinutes > 0 ? 'text-amber-600' : 'text-emerald-600'
                    }`}
                  >
                    {stop.delayArrivalMinutes > 0 ? `+${stop.delayArrivalMinutes} min` : 'On Time'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
