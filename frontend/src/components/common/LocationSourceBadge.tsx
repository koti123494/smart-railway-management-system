import React from 'react';
import { MapPin, Navigation, Compass, Calendar, Info } from 'lucide-react';
import { LocationType } from '../../types';

interface LocationSourceBadgeProps {
  locationType: LocationType;
  hasGps?: boolean;
  stationName?: string;
  className?: string;
}

export const LocationSourceBadge: React.FC<LocationSourceBadgeProps> = ({
  locationType,
  hasGps = false,
  stationName,
  className = '',
}) => {
  if (locationType === 'LIVE_GPS' && hasGps) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 ${className}`}
        title="Hardware GPS coordinates received directly from train telemetry"
      >
        <Navigation className="w-4 h-4 text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />
        <div>
          <span className="font-semibold">Live GPS Location</span>
          {stationName && <span className="text-slate-500 dark:text-slate-400 ml-1">· Near {stationName}</span>}
        </div>
      </div>
    );
  }

  if (locationType === 'LAST_REPORTED_STATION') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-500/20 ${className}`}
        title="Live GPS is unavailable from railway feeds. Showing the train's latest reported station."
      >
        <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
          <span className="font-semibold">Latest Reported Station</span>
          {stationName && (
            <span className="text-slate-600 dark:text-slate-400 font-normal">
              : {stationName}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (locationType === 'ESTIMATED') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 ${className}`}
      >
        <Compass className="w-4 h-4 text-amber-500" />
        <div>
          <span className="font-semibold">Estimated Location</span>
          <span className="text-slate-500 dark:text-slate-400 ml-1">(Interpolated from speed & delay)</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 ${className}`}
    >
      <Calendar className="w-4 h-4 text-slate-500" />
      <div>
        <span className="font-semibold">Scheduled Location</span>
        <span className="text-slate-500 dark:text-slate-400 ml-1">(Timetable reference)</span>
      </div>
    </div>
  );
};
