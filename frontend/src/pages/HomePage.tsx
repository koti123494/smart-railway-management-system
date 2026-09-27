import React, { useEffect, useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { RecentSearches, RecentSearchItem } from '../components/dashboard/RecentSearches';
import { TrainCard } from '../components/train/TrainCard';
import { railwayApi } from '../services/api';
import { DashboardStats, TrainSearchResult } from '../types';
import { Map, Clock, ShieldCheck, Zap, Radio, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [popularTrains, setPopularTrains] = useState<TrainSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(() => {
    try {
      const saved = localStorage.getItem('railtrack_recent_searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [dashboardData, trainsData] = await Promise.all([
          railwayApi.getDashboardStats(),
          railwayApi.searchTrains(''),
        ]);
        setStats(dashboardData);
        setPopularTrains(trainsData.slice(0, 6));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectRecent = (trainNumber: string, trainName: string) => {
    const updated = [
      { trainNumber, trainName, timestamp: Date.now() },
      ...recentSearches.filter((s) => s.trainNumber !== trainNumber),
    ].slice(0, 8);
    setRecentSearches(updated);
    try {
      localStorage.setItem('railtrack_recent_searches', JSON.stringify(updated));
    } catch {}
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('railtrack_recent_searches');
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center rounded-3xl bg-gradient-to-b from-cyan-500/10 via-sky-500/5 to-transparent border border-cyan-500/20">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold shadow-sm">
            <Radio className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>Next-Generation Indian Railway Telemetry & Schedules</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Track Indian Trains in{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-sky-600 dark:from-cyan-400 dark:to-sky-400 bg-clip-text text-transparent">
              Real Time
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Search trains, check schedules, monitor running status, view delay predictions, and track
            the latest available train location on an interactive OpenStreetMap.
          </p>

          {/* Search Box */}
          <div className="pt-4">
            <SearchBar autoFocus={false} />
          </div>
        </div>
      </section>

      {/* Dashboard Metrics & Recent Searches */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Network Overview</h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Auto-synced with live telemetry
          </span>
        </div>

        <StatsOverview stats={stats} loading={loading} />

        <RecentSearches
          items={recentSearches}
          onClear={handleClearRecent}
          className="mt-4"
        />
      </section>

      {/* Popular Trains Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Popular Express & Superfast Trains
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Instant access to high-demand trunk routes across Indian Railways
            </p>
          </div>

          <Link
            to="/trains"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>View All Trains</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200 dark:border-slate-800"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularTrains.map((train) => (
              <TrainCard
                key={train.trainNumber}
                train={train}
                onSelectRecent={handleSelectRecent}
              />
            ))}
          </div>
        )}
      </section>

      {/* Feature Highlights Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <Map className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Leaflet Route Mapping
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Smooth OpenStreetMap rendering without costly proprietary map APIs. Trace entire rail
            routes with station markers and train beacons.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Strict Data Honesty
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Zero fabricated GPS coordinates. When true satellite telemetry is absent, we explicitly
            state that the position is the latest reported station.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Auto-Refresh & Throttling
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Configurable 30-second live refreshes with server-side TTL caching, protecting external
            API quotas while keeping updates instant.
          </p>
        </div>
      </section>
    </div>
  );
};
