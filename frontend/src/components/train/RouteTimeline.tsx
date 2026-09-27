import React from 'react';
import { Check, Circle, Radio, Clock, MapPin } from 'lucide-react';
import { TimelineStop } from '../../types';

interface RouteTimelineProps {
  timeline: TimelineStop[];
  selectedStop?: TimelineStop | null;
  onSelectStop?: (stop: TimelineStop) => void;
  className?: string;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({
  timeline,
  selectedStop,
  onSelectStop,
  className = '',
}) => {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Route Journey Timeline</span>
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
              ({timeline.length} Stops)
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time station progression and halt delays
          </p>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span> Current
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full border border-slate-400"></span> Upcoming
          </span>
        </div>
      </div>

      {/* Vertical Timeline List */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {timeline.map((stop, idx) => {
          const isCompleted = stop.status === 'COMPLETED';
          const isCurrent = stop.status === 'CURRENT';
          const isUpcoming = stop.status === 'UPCOMING';
          const isSelected = selectedStop?.station.code === stop.station.code;
          const isDestination = idx === timeline.length - 1;
          const isOrigin = idx === 0;

          return (
            <div
              key={stop.station.code}
              onClick={() => onSelectStop && onSelectStop(stop)}
              className={`relative group cursor-pointer transition-all ${
                isSelected ? 'scale-[1.01]' : ''
              }`}
            >
              {/* Timeline Marker Node */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 flex items-center justify-center">
                {isCompleted && (
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 ring-4 ring-white dark:ring-slate-900">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 stroke-[3]" />
                  </div>
                )}

                {isCurrent && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-4 ring-cyan-100 dark:ring-cyan-950 animate-bounce">
                    <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                  </div>
                )}

                {isUpcoming && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center ring-4 ring-white dark:ring-slate-900 group-hover:border-cyan-500 transition-colors">
                    <Circle className="w-2 h-2 text-slate-300 dark:text-slate-600 fill-current" />
                  </div>
                )}
              </div>

              {/* Station Content Card */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-cyan-50/70 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-800 shadow-md'
                    : isSelected
                    ? 'bg-slate-50 dark:bg-slate-800 border-cyan-500 shadow-sm'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                      {stop.station.code}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                        {stop.station.name}
                        {isOrigin && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                            Origin
                          </span>
                        )}
                        {isDestination && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300">
                            Destination
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {stop.station.state} · Platform #{stop.platform} · {stop.distanceKm} km
                      </p>
                    </div>
                  </div>

                  {/* Status & Times */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {stop.actualArrival || stop.scheduledArrival}
                      </span>
                      {stop.delayArrivalMinutes > 0 && (
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                          (+{stop.delayArrivalMinutes}m)
                        </span>
                      )}
                    </div>

                    <div className="text-xs">
                      {isCompleted && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Departed
                        </span>
                      )}
                      {isCurrent && (
                        <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Current / Last Reported
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="text-slate-500 dark:text-slate-400">
                          Upcoming · Dep: {stop.scheduledDeparture}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
