import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { railwayApi } from '../services/api';
import { TrainSchedule } from '../types';
import { ScheduleTable } from '../components/train/ScheduleTable';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { Train, Navigation, ArrowRight, Calendar, Search } from 'lucide-react';

export const TrainSchedulePage: React.FC = () => {
  const { trainNumber = '12801' } = useParams<{ trainNumber: string }>();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState<TrainSchedule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inputNumber, setInputNumber] = useState<string>(trainNumber);

  useEffect(() => {
    async function loadSchedule() {
      try {
        setLoading(true);
        setError(null);
        const data = await railwayApi.getTrainSchedule(trainNumber);
        setSchedule(data);
        setInputNumber(trainNumber);
      } catch (err: any) {
        setError(err.response?.data?.message || `Schedule for train ${trainNumber} was not found.`);
      } finally {
        setLoading(false);
      }
    }
    loadSchedule();
  }, [trainNumber]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputNumber.trim()) {
      navigate(`/train/${inputNumber.trim()}/schedule`);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Quick Lookup */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Train Timetable & Schedule
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Detailed intermediate stations, scheduled arrival/departure times, and platform numbers
          </p>
        </div>

        {/* Quick train switcher */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            placeholder="Change Train No."
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 w-40"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold"
          >
            Switch
          </button>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <ErrorBanner
          type="error"
          title="Schedule Not Found"
          message={error}
          onRetry={() => navigate('/trains')}
        />
      )}

      {loading && !schedule && (
        <div className="space-y-4">
          <div className="h-24 rounded-3xl bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200 dark:border-slate-800" />
          <div className="h-80 rounded-3xl bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200 dark:border-slate-800" />
        </div>
      )}

      {schedule && (
        <>
          {/* Train Summary Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200">
                  {schedule.trainNumber}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400">
                  {schedule.trainType}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {schedule.trainName}
              </h2>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                <span>
                  {schedule.source.name} ({schedule.source.code})
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                <span>
                  {schedule.destination.name} ({schedule.destination.code})
                </span>
                <span className="text-slate-400">· {schedule.totalDistanceKm} km</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/train/${schedule.trainNumber}/live`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Track Live Location</span>
              </Link>
            </div>
          </div>

          {/* Schedule Table Component */}
          <ScheduleTable stops={schedule.stops} />
        </>
      )}
    </div>
  );
};
