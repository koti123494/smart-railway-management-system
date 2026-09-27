// frontend/src/pages/LiveTrainsPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Train,
  Radio,
  RefreshCw,
  Cpu,
  MapPin,
  Clock,
  ArrowRight,
  Activity
} from 'lucide-react';
import { getAllLiveTrains } from '../services/api';
import { useSocket } from '../context/SocketContext';
import { DelayBadge, IoTDeviceBadge } from '../common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function LiveTrainsPage() {
  const [liveTrains, setLiveTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { socket } = useSocket();

  const fetchLiveFleet = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllLiveTrains();
      if (res.data?.data) {
        setLiveTrains(res.data.data);
      }
    } catch (err) {
      setError('Unable to fetch live trains fleet feed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveFleet();
  }, []);

  // Listen for global live train ticks
  useEffect(() => {
    if (!socket) return;
    const handleTick = (tickData) => {
      setLiveTrains(prev =>
        prev.map(t => {
          if (t.trainNumber === tickData.trainNumber) {
            return {
              ...t,
              location: {
                ...t.location,
                latitude: tickData.latitude,
                longitude: tickData.longitude,
                speed: tickData.speed,
                timestamp: tickData.timestamp
              },
              position: {
                ...t.position,
                statusText: tickData.statusText
              }
            };
          }
          return t;
        })
      );
    };

    socket.on('train:live-tick', handleTick);
    return () => socket.off('train:live-tick', handleTick);
  }, [socket]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Active Network Fleet</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Live Monitored Trains
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Trains currently in-transit with live ESP32 GPS sensors or railway telemetry
          </p>
        </div>

        <button
          onClick={fetchLiveFleet}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Fleet</span>
        </button>
      </div>

      {loading && liveTrains.length === 0 ? (
        <LoadingSpinner message="Scanning railway corridors for live trains..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchLiveFleet} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveTrains.map((item) => {
            const train = item.train;
            const location = item.location;
            const position = item.position;
            const device = item.device;

            return (
              <div
                key={item.trainNumber}
                className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-xl transition-all space-y-4 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        #{item.trainNumber}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {train?.trainType}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {train?.trainName}
                    </h3>
                  </div>

                  <DelayBadge delayMinutes={train?.currentDelayMinutes} />
                </div>

                {/* Status & Position Banner */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Current Status:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {position?.statusText || 'In Transit'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Current Speed:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {Math.round(location?.speed || 0)} km/h
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Route:</span>
                    <span className="font-mono text-slate-600 dark:text-slate-300">
                      {train?.sourceCode} → {train?.destinationCode}
                    </span>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-400">
                    <Cpu className="w-3.5 h-3.5 text-blue-500" />
                    <span>{device?.deviceId || 'ESP32'}</span>
                  </div>

                  <Link
                    to={`/track/${item.trainNumber}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-105"
                  >
                    <span>Open Live Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
