// frontend/src/pages/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Train, Filter, ArrowRight } from 'lucide-react';
import TrainSearchTabs from '../components/search/TrainSearchTabs';
import TrainCard from '../components/search/TrainCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { searchTrains } from '../services/api';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('ALL');

  useEffect(() => {
    const doSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await searchTrains(query, from, to);
        if (res.data && res.data.success) {
          setTrains(res.data.data);
        } else {
          setError(res.data?.message || 'No trains found matching criteria');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error searching railway directory');
      } finally {
        setLoading(false);
      }
    };
    doSearch();
  }, [query, from, to]);

  const filteredTrains = trains.filter(t => {
    if (selectedType === 'ALL') return true;
    if (selectedType === 'VANDE') return (t.trainType || '').toLowerCase().includes('vande');
    if (selectedType === 'RAJDHANI') return (t.trainType || '').toLowerCase().includes('rajdhani');
    if (selectedType === 'SUPERFAST') return (t.trainType || '').toLowerCase().includes('superfast');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Bar at Top */}
      <div>
        <TrainSearchTabs initialTab={from && to ? 'route' : 'number'} />
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {from && to
              ? `Trains between ${from} and ${to}`
              : query
              ? `Search Results for "${query}"`
              : 'All Scheduled & Monitored Trains'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Found {filteredTrains.length} train service(s)
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedType === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedType('VANDE')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedType === 'VANDE'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Vande Bharat
          </button>
          <button
            onClick={() => setSelectedType('RAJDHANI')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedType === 'RAJDHANI'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Rajdhani
          </button>
          <button
            onClick={() => setSelectedType('SUPERFAST')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedType === 'SUPERFAST'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Superfast
          </button>
        </div>
      </div>

      {/* Content State */}
      {loading ? (
        <LoadingSpinner message="Searching Indian Railways network schedule..." />
      ) : error ? (
        <ErrorMessage title="Search Notice" message={error} />
      ) : filteredTrains.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800">
          <Train className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No trains found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try searching for "12723", "20833", or routes like "HYB" to "NDLS".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrains.map((train) => (
            <TrainCard key={train.trainNumber} train={train} />
          ))}
        </div>
      )}
    </div>
  );
}
