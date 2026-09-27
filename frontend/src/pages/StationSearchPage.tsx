import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { railwayApi } from '../services/api';
import { StationBase } from '../types';
import { Building2, Search, MapPin, ArrowRight } from 'lucide-react';

export const StationSearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [stations, setStations] = useState<StationBase[]>([]);
  const [loading, setLoading] = useState(false);

  const searchStations = async (searchTerm: string) => {
    try {
      setLoading(true);
      const results = await railwayApi.searchStations(searchTerm);
      setStations(results);
    } catch (err) {
      console.error('Failed to search stations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchStations('');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchStations(query);
  };

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Indian Railway Stations Directory
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Search stations across all railway zones and view live arrival/departure boards
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by station name (e.g. Vijayawada, New Delhi) or code (e.g. BZA, NDLS)"
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

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-32 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200 dark:border-slate-800"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((stn) => (
            <Link
              key={stn.code}
              to={`/station/${stn.code}`}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-extrabold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {stn.code}
                  </span>
                  {stn.zone && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400">
                      Zone: {stn.zone}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {stn.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {stn.state} {stn.division ? `· ${stn.division} Division` : ''}
                  </span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                <span>View Live Train Board</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
