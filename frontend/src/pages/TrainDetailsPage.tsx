import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { railwayApi } from '../services/api';
import { TrainLiveStatus } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { LocationSourceBadge } from '../components/common/LocationSourceBadge';
import { ScheduleTable } from '../components/train/ScheduleTable';
import { TrainMap } from '../components/train/TrainMap';
import { RouteTimeline } from '../components/train/RouteTimeline';
import {
  Train,
  ArrowRight,
  Navigation,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const TrainDetailsPage: React.FC = () => {
  const { trainNumber = '12801' } = useParams<{ trainNumber: string }>();
  const [data, setData] = useState<TrainLiveStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'live' | 'map' | 'schedule' | 'timeline'>('overview');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const live = await railwayApi.getTrainStatus(trainNumber);
        setData(live);
      } catch (err) {
        console.error('Failed to load train details:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [trainNumber]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 space-y-6">
        <div className="h-32 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <div className="h-96 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  if (!data) return null;

  const tabs = [
    { id: 'overview', label: '1. Overview', icon: FileText },
    { id: 'live', label: '2. Live Status', icon: Activity },
    { id: 'map', label: '3. Route Map', icon: Navigation },
    { id: 'schedule', label: '4. Schedule', icon: Clock },
    { id: 'timeline', label: '5. Journey Timeline', icon: MapPin },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-base font-extrabold px-3 py-1 rounded-xl bg-slate-900 text-white dark:bg-slate-800">
              {data.trainNumber}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400">
              {data.trainType}
            </span>
            <StatusBadge status={data.status} delayMinutes={data.delayMinutes} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {data.trainName}
          </h1>

          <div className="flex items-center gap-2 mt-2 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
            <span>
              {data.source.name} ({data.source.code})
            </span>
            <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>
              {data.destination.name} ({data.destination.code})
            </span>
            <span className="text-slate-400 text-xs sm:text-sm">· {data.totalDistanceKm} km</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/train/${data.trainNumber}/live`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Dedicated Live Tracker</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                active
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Total Route Distance</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-1 block">
                {data.totalDistanceKm} KM
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Total Stoppages</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-1 block">
                {data.timeline.length} Halts
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Reported Delay</span>
              <span
                className={`text-xl font-bold font-mono mt-1 block ${
                  data.delayMinutes > 15 ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {data.delayMinutes > 0 ? `+${data.delayMinutes} mins` : 'On Time'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Current Reported Halt</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block truncate">
                {data.currentStation.name}
              </span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Telemetry & Accuracy Statement</h3>
            <LocationSourceBadge
              locationType={data.locationType}
              hasGps={false}
              stationName={data.currentStation.name}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
              {data.dataAccuracyNote} RailTrack India continuously polls station-side signal logs and arrival timestamps.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Live Status */}
      {activeTab === 'live' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Live Running State</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{data.status}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                At {data.currentStation.name} · Delay: +{data.delayMinutes} mins
              </p>
            </div>
            <StatusBadge status={data.status} delayMinutes={data.delayMinutes} size="lg" />
          </div>

          <RouteTimeline timeline={data.timeline} />
        </div>
      )}

      {/* Tab 3: Route Map */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <TrainMap status={data} />
        </div>
      )}

      {/* Tab 4: Schedule */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <ScheduleTable stops={data.timeline} />
        </div>
      )}

      {/* Tab 5: Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          <RouteTimeline timeline={data.timeline} />
        </div>
      )}
    </div>
  );
};
