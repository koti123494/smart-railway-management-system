// frontend/src/components/search/TrainSearchTabs.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Train,
  ArrowRightLeft,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function TrainSearchTabs({ initialTab = 'number' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [trainQuery, setTrainQuery] = useState('');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [stationQuery, setStationQuery] = useState('');
  const navigate = useNavigate();

  const handleTrainSearch = (e) => {
    e.preventDefault();
    if (!trainQuery.trim()) return;

    const clean = trainQuery.trim();
    // If user typed 5 digits (standard Indian Railway train number), go directly to track page
    if (/^\d{5}$/.test(clean)) {
      navigate(`/track/${clean}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(clean)}`);
    }
  };

  const handleRouteSearch = (e) => {
    e.preventDefault();
    if (!fromStation.trim() || !toStation.trim()) return;
    navigate(`/search?from=${encodeURIComponent(fromStation.trim().toUpperCase())}&to=${encodeURIComponent(toStation.trim().toUpperCase())}`);
  };

  const handleStationSearch = (e) => {
    e.preventDefault();
    if (!stationQuery.trim()) return;
    navigate(`/stations?q=${encodeURIComponent(stationQuery.trim().toUpperCase())}`);
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white/95 dark:bg-[#10192d]/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-4 sm:p-6 transition-all">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
        <button
          onClick={() => setActiveTab('number')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'number'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Train className="w-4 h-4" />
          <span>Train Number</span>
        </button>

        <button
          onClick={() => setActiveTab('name')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'name'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Train Name</span>
        </button>

        <button
          onClick={() => setActiveTab('route')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'route'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>From → To Station</span>
        </button>

        <button
          onClick={() => setActiveTab('station')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'station'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Station Board</span>
        </button>
      </div>

      {/* Tab 1: Train Number */}
      {activeTab === 'number' && (
        <form onSubmit={handleTrainSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Train className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={trainQuery}
                onChange={(e) => setTrainQuery(e.target.value)}
                placeholder="Enter 5-digit train number (e.g. 12723, 20833, 12433)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-base"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Search className="w-5 h-5" />
              <span>Track Live</span>
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
            <span className="font-semibold flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Quick Track:
            </span>
            <button
              type="button"
              onClick={() => { setTrainQuery('12723'); navigate('/track/12723'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400 font-mono font-medium transition-colors"
            >
              12723 Telangana Exp
            </button>
            <button
              type="button"
              onClick={() => { setTrainQuery('20833'); navigate('/track/20833'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400 font-mono font-medium transition-colors"
            >
              20833 Vande Bharat
            </button>
            <button
              type="button"
              onClick={() => { setTrainQuery('12433'); navigate('/track/12433'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400 font-mono font-medium transition-colors"
            >
              12433 Rajdhani
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Train Name */}
      {activeTab === 'name' && (
        <form onSubmit={handleTrainSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={trainQuery}
                onChange={(e) => setTrainQuery(e.target.value)}
                placeholder="Enter train name (e.g. Telangana, Vande Bharat, Rajdhani)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <Search className="w-5 h-5" />
              <span>Search Train</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: From -> To Station */}
      {activeTab === 'route' && (
        <form onSubmit={handleRouteSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
              <input
                type="text"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                placeholder="From Station (e.g. HYB, VSKP, MAS)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-base uppercase"
                autoFocus
              />
            </div>

            <button
              type="button"
              onClick={swapStations}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Swap Stations"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>

            <div className="relative flex-1 w-full">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
              <input
                type="text"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                placeholder="To Station (e.g. NDLS, SC, NZM)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-base uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <span>Find Trains</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
            <span className="font-semibold text-slate-400">Popular Routes:</span>
            <button
              type="button"
              onClick={() => { setFromStation('HYB'); setToStation('NDLS'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-500"
            >
              HYB → NDLS
            </button>
            <button
              type="button"
              onClick={() => { setFromStation('VSKP'); setToStation('SC'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-500"
            >
              VSKP → SC
            </button>
            <button
              type="button"
              onClick={() => { setFromStation('MAS'); setToStation('NZM'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-500"
            >
              MAS → NZM
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Station Board */}
      {activeTab === 'station' && (
        <form onSubmit={handleStationSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={stationQuery}
                onChange={(e) => setStationQuery(e.target.value)}
                placeholder="Enter station name or code (e.g. BZA, Vijayawada, SC, NDLS)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <Search className="w-5 h-5" />
              <span>View Station</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
