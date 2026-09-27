import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { railwayApi } from '../services/api';
import { StationDetails } from '../types';
import { Building2, MapPin, Train, ArrowRight, Navigation, ChevronRight } from 'lucide-react';

export const StationDetailPage: React.FC = () => {
  const { code = 'BZA' } = useParams<{ code: string }>();
  const [station, setStation] = useState<StationDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await railwayApi.getStationDetails(code);
        setStation(data);
      } catch (err) {
        console.error('Failed to load station details:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [code]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-6">
        <div className="h-32 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <div className="h-64 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  if (!station) {
    return (
      <div className="text-center py-16">
        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
          Station with code &quot;{code}&quot; not found.
        </p>
        <Link to="/stations" className="text-sm font-semibold text-cyan-600 mt-3 inline-block">
          Back to Station Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/stations" className="hover:text-cyan-600 dark:hover:text-cyan-400">
          Stations
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-slate-900 dark:text-white">
          {station.code} - {station.name}
        </span>
      </nav>

      {/* Station Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-base font-extrabold px-3 py-1 rounded-xl bg-slate-900 text-white dark:bg-slate-800">
              {station.code}
            </span>
            {station.zone && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400">
                Zone: {station.zone}
              </span>
            )}
            {station.division && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Division: {station.division}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {station.name}
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-cyan-600" />
            <span>
              {station.state}, India · Coordinates:{' '}
              <span className="font-mono">
                {station.coordinates.latitude.toFixed(4)}° N,{' '}
                {station.coordinates.longitude.toFixed(4)}° E
              </span>
            </span>
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
          <span className="text-xs font-bold text-slate-400 block uppercase">Operational Platforms</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {station.platforms || 8}
          </span>
        </div>
      </div>

      {/* Passing Trains Board */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5 text-cyan-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Trains Calling at {station.name}
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {station.passingTrains?.length || 0} scheduled trains
          </span>
        </div>

        {station.passingTrains && station.passingTrains.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {station.passingTrains.map((train) => (
              <div
                key={train.trainNumber}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {train.trainNumber}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {train.trainName}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {train.source} → {train.destination}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right text-xs">
                    <span className="text-slate-400 block">Scheduled Times:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {train.arrivalTime} / {train.departureTime}
                    </span>
                    <span className="text-[11px] text-cyan-600 dark:text-cyan-400 block font-semibold">
                      Platform #{train.platform}
                    </span>
                  </div>

                  <Link
                    to={`/train/${train.trainNumber}/live`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Track</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-slate-500">
            No scheduled trains found for this station in the active timetable.
          </div>
        )}
      </div>
    </div>
  );
};
