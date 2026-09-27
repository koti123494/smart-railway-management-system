// frontend/src/components/tracking/StationTimeline.jsx
import React from 'react';
import {
  CheckCircle2,
  CircleDot,
  Circle,
  Clock,
  ArrowDown,
  Navigation,
  Train
} from 'lucide-react';
import { DelayBadge } from '../common/Badge';

export default function StationTimeline({ route = [], position, currentDelayMinutes = 0 }) {
  if (!route || route.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        No schedule timeline available for this route.
      </div>
    );
  }

  const passedCodes = position?.passedStationCodes || [];
  const currentStationCode = position?.currentStation?.stationCode;
  const nextStationCode = position?.nextStation?.stationCode;

  return (
    <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Train className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Journey Route & Station Timeline</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time station status, platform halts, and live delays
          </p>
        </div>

        <div className="hidden sm:flex items-center space-x-4 text-xs font-medium">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">Completed</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-300 animate-pulse" />
            <span className="text-slate-600 dark:text-slate-400">Current / In-transit</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="text-slate-600 dark:text-slate-400">Upcoming</span>
          </div>
        </div>
      </div>

      {/* Route Timeline List */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        {/* Continuous Track Line */}
        <div className="absolute top-4 bottom-4 left-[23px] sm:left-[31px] w-1 bg-slate-200 dark:bg-slate-800 rounded-full" />

        {route.map((stop, index) => {
          const isPassed = passedCodes.includes(stop.stationCode);
          const isCurrent = currentStationCode === stop.stationCode;
          const isNext = nextStationCode === stop.stationCode;

          // Node styling based on journey progress
          let nodeBg = 'bg-slate-300 dark:bg-slate-700 border-white dark:border-slate-900';
          let textColor = 'text-slate-500 dark:text-slate-400';
          let cardBorder = 'border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/30';

          if (isPassed) {
            nodeBg = 'bg-emerald-500 border-white dark:border-slate-900 shadow-md shadow-emerald-500/20';
            textColor = 'text-slate-700 dark:text-slate-300';
            cardBorder = 'border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/20 dark:bg-emerald-950/10';
          } else if (isCurrent) {
            nodeBg = 'bg-blue-600 border-white ring-4 ring-blue-500/30 shadow-lg shadow-blue-500/40 animate-pulse';
            textColor = 'text-blue-900 dark:text-blue-200 font-bold';
            cardBorder = 'border-blue-300 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-950/40 ring-1 ring-blue-500/30';
          } else if (isNext) {
            nodeBg = 'bg-amber-500 border-white ring-2 ring-amber-400/40';
            textColor = 'text-slate-900 dark:text-white font-semibold';
            cardBorder = 'border-amber-200 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/20';
          }

          return (
            <div key={stop.stationCode} className="relative flex items-start space-x-4">
              {/* Timeline Pin Node */}
              <div className={`relative z-10 w-5 h-5 rounded-full ${nodeBg} border-2 flex items-center justify-center -translate-x-[26px] sm:-translate-x-[34px] transition-all`}>
                {isPassed && <CheckCircle2 className="w-3 h-3 text-white" />}
                {isCurrent && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>

              {/* Station Row Card */}
              <div className={`flex-1 -ml-4 p-4 rounded-xl border ${cardBorder} transition-all hover:shadow-sm`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start sm:items-center space-x-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-base font-bold ${textColor}`}>
                          {stop.stationName}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {stop.stationCode}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-600 text-white animate-pulse">
                            Current Station
                          </span>
                        )}
                        {isNext && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500 text-white">
                            Next Stop
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                        <span>Platform <strong className="text-slate-700 dark:text-slate-200">{stop.platform || '1'}</strong></span>
                        <span>•</span>
                        <span>{stop.distanceKm || 0} km from source</span>
                        {stop.haltMinutes > 0 && (
                          <>
                            <span>•</span>
                            <span>Halt: {stop.haltMinutes}m</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Schedule Timings */}
                  <div className="flex items-center space-x-4 text-right">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium uppercase">Arrival</div>
                      <div className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {stop.actualArrivalTime || stop.arrivalTime}
                      </div>
                      <div className="text-[10px] text-slate-400 line-through font-mono">
                        {stop.arrivalTime !== (stop.actualArrivalTime || stop.arrivalTime) ? stop.arrivalTime : ''}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-slate-400 font-medium uppercase">Departure</div>
                      <div className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {stop.actualDepartureTime || stop.departureTime}
                      </div>
                    </div>

                    <div className="min-w-[85px]">
                      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md text-center w-full ${
                        isPassed
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : isCurrent
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                          : isNext
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 font-semibold'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {stop.delayBadge || (isPassed ? 'Departed' : 'Upcoming')}
                      </span>
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
}
