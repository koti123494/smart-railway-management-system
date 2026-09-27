import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { railwayApi } from '../services/api';
import { TrainSearchResult } from '../types';
import { TrainCard } from '../components/train/TrainCard';
import { Search, Filter, AlertCircle, RefreshCw } from 'lucide-react';

export const TrainSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [trains, setTrains] = useState<TrainSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'RUNNING' | 'DELAYED' | 'ON_TIME'>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const executeSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await railwayApi.searchTrains(searchTerm);
      setTrains(results);
    } catch (err: any) {
      setError('Unable to load trains. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeSearch(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    executeSearch(query);
  };

  // Filter application
  const filteredTrains = trains.filter((t) => {
    if (statusFilter === 'RUNNING' && t.currentStatus !== 'RUNNING') return false;
    if (statusFilter === 'DELAYED' && t.delayMinutes <= 0) return false;
    if (statusFilter === 'ON_TIME' && t.delayMinutes > 0) return false;
    if (typeFilter !== 'ALL' && !t.trainType.toLowerCase().includes(typeFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Indian Railways Train Search
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Look up train schedules, routes, and live running status by number or name
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by train number (e.g. 12801) or name (e.g. Purushottam)"
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-95"
        >
          Search
        </button>
      </form>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Status:</span>
          {(['ALL', 'RUNNING', 'DELAYED', 'ON_TIME'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === filter
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {filter.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Train Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="ALL">All Train Types</option>
            <option value="Rajdhani">Rajdhani Express</option>
            <option value="Vande Bharat">Vande Bharat Express</option>
            <option value="Shatabdi">Shatabdi Express</option>
            <option value="Superfast">Superfast Express</option>
          </select>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => executeSearch(query)}
            className="text-xs font-bold underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing <strong className="text-slate-900 dark:text-white">{filteredTrains.length}</strong>{' '}
          trains
        </span>
        {initialQuery && <span>Search query: &quot;{initialQuery}&quot;</span>}
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200 dark:border-slate-800"
            />
          ))}
        </div>
      ) : filteredTrains.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTrains.map((train) => (
            <TrainCard key={train.trainNumber} train={train} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-lg font-bold text-slate-800 dark:text-slate-200">No trains found</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Try searching for 12801, 12723, 12627, 12951, 22436, or station names like Puri, Delhi,
            Bhopal.
          </p>
          <button
            onClick={() => {
              setQuery('');
              setStatusFilter('ALL');
              setTypeFilter('ALL');
              executeSearch('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
