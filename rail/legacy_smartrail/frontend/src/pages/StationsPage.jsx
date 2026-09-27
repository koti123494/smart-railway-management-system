// frontend/src/pages/StationsPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  MapPin,
  Search,
  Train,
  Clock,
  ExternalLink,
  Building,
  Navigation
} from 'lucide-react';
import { searchStations, getStationDetails } from '../services/api';
import { DelayBadge } from '../common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function StationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [liveBoard, setLiveBoard] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search stations
  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      try {
        const res = await searchStations(query);
        if (res.data?.data) {
          setStations(res.data.data);
          // Auto select first station if none selected or if query matches directly
          if (res.data.data.length > 0 && !selectedStation) {
            loadStationDetails(res.data.data[0].code);
          }
        }
      } catch (err) {
        console.warn('Stations fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, [query]);

  const loadStationDetails = async (code) => {
    try {
      const res = await getStationDetails(code);
      if (res.data?.data) {
        setSelectedStation(res.data.data.station);
        setLiveBoard(res.data.data.liveBoard || []);
      }
    } catch (err) {
      console.warn('Station details fetch error:', err.message);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <MapPin className="w-4 h-4" />
            <span>Station Explorer & Platforms</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Railway Station Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Search station codes, geographic coordinates, and live platform boards
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search station code or city..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Station List */}
        <div className="lg:col-span-4 space-y-2 max-h-[650px] overflow-y-auto pr-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Stations ({stations.length})
          </div>
          {stations.map((stn) => {
            const isSelected = selectedStation?.code === stn.code;
            return (
              <button
                key={stn.code}
                onClick={() => loadStationDetails(stn.code)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-200 shadow-sm'
                    : 'bg-white dark:bg-[#10192d] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {stn.name}
                  </span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                    {stn.code}
                  </span>
                </div>
                <div className="mt-1 flex items-center space-x-2 text-[11px] text-slate-500">
                  <span>{stn.city}, {stn.state}</span>
                  <span>•</span>
                  <span>{stn.zone} Zone</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Station Details & Live Board */}
        <div className="lg:col-span-8 space-y-6">
          {selectedStation ? (
            <>
              {/* Station Hero Card */}
              <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-600 text-white">
                        {selectedStation.code}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold uppercase">
                        {selectedStation.zone} Railway
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {selectedStation.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedStation.city}, {selectedStation.state}
                    </p>
                  </div>

                  <div className="text-right text-xs font-mono text-slate-500 space-y-1">
                    <div>GPS Lat: <strong className="text-slate-800 dark:text-slate-200">{selectedStation.latitude}</strong></div>
                    <div>GPS Lon: <strong className="text-slate-800 dark:text-slate-200">{selectedStation.longitude}</strong></div>
                  </div>
                </div>
              </div>

              {/* Station Live Departure & Arrival Board */}
              <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Train className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Live Arrival & Departure Board
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {liveBoard.length} trains scheduled
                  </span>
                </div>

                {liveBoard.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    No scheduled train movements currently recorded for this station.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {liveBoard.map((item) => (
                      <div
                        key={item.trainNumber}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                              #{item.trainNumber}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              {item.trainName}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {item.source} → {item.destination}
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-xs">
                          <div className="text-center">
                            <div className="text-[10px] text-slate-400 uppercase font-semibold">Platform</div>
                            <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                              PF {item.platform}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-[10px] text-slate-400 uppercase font-semibold">Arr / Dep</div>
                            <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                              {item.arrivalTime} / {item.departureTime}
                            </div>
                          </div>

                          <div>
                            <DelayBadge delayMinutes={item.currentDelayMinutes} />
                          </div>

                          <Link
                            to={`/track/${item.trainNumber}`}
                            className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                            title="Track Live"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400">
              Select a station from the list to inspect its live platform schedule.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
