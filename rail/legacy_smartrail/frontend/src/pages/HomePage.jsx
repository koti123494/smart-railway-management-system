// frontend/src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Train,
  Radio,
  MapPin,
  Cpu,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
  TrendingUp,
  Server,
  Layers,
  Sparkles
} from 'lucide-react';
import TrainSearchTabs from '../components/search/TrainSearchTabs';
import TrainCard from '../components/search/TrainCard';
import GpsSimulatorWidget from '../components/iot/GpsSimulatorWidget';
import { getAllLiveTrains, getSystemStats } from '../services/api';

export default function HomePage() {
  const [featuredTrains, setFeaturedTrains] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [trainsRes, statsRes] = await Promise.all([
          getAllLiveTrains(),
          getSystemStats()
        ]);
        if (trainsRes.data?.data) {
          setFeaturedTrains(trainsRes.data.data.slice(0, 3));
        }
        if (statsRes.data?.data) {
          setStats(statsRes.data.data);
        }
      } catch (err) {
        console.warn('Could not load featured trains or stats:', err.message);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const innovations = [
    {
      title: 'Real-Time IoT Train Tracking',
      desc: 'Edge ESP32 microcontrollers with NEO-6M GPS modules stream high-precision telemetry directly from locomotives.',
      icon: Cpu,
      badge: 'Hardware Edge'
    },
    {
      title: 'Haversine Station Detection',
      desc: 'Automatic real-time proximity calculation detects whether a train is docked at a platform or in-transit between stations.',
      icon: MapPin,
      badge: 'Mathematical Algorithm'
    },
    {
      title: 'Live Leaflet Route Mapping',
      desc: 'GIS-powered interactive maps show live train positions, speed vector headings, and complete route polylines.',
      icon: Activity,
      badge: 'GIS Visuals'
    },
    {
      title: 'Dynamic ETA Prediction',
      desc: 'Predictive ETA algorithm computes arrival times dynamically using instantaneous speed, distance, and historical delays.',
      icon: Clock,
      badge: 'Predictive Analytics'
    },
    {
      title: 'Instant WebSocket Telemetry',
      desc: 'Bidirectional Socket.IO pipelines push GPS coordinate packets to thousands of passenger screens without page reloads.',
      icon: Zap,
      badge: 'Sub-200ms Latency'
    },
    {
      title: 'IoT Fleet Health Monitoring',
      desc: 'Centralized admin telemetry monitors device battery voltage, cellular signal dBm, and sensor status across all coaches.',
      icon: ShieldCheck,
      badge: 'Diagnostics'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Background Decorative Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Hackathon Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Smart India Hackathon (SIH) Prototype</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Track Your Train in <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
              Real Time
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Get live train location, station updates, delays and estimated arrival information powered by railway APIs and IoT technology.
          </p>

          {/* Large Search Box */}
          <div className="mt-10">
            <TrainSearchTabs initialTab="number" />
          </div>
        </div>
      </section>

      {/* QUICK STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200/80 dark:border-slate-800 shadow-md">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <Train className="w-4 h-4 text-blue-500" />
              <span>Fleet Tracked</span>
            </div>
            <div className="mt-2 text-3xl font-black font-mono text-slate-900 dark:text-white">
              {stats?.totalTrains || 4}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Monitored</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200/80 dark:border-slate-800 shadow-md">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span>Active ESP32 Trackers</span>
            </div>
            <div className="mt-2 text-3xl font-black font-mono text-slate-900 dark:text-white">
              {stats?.onlineDevices || 3}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Live GPS Telemetry</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200/80 dark:border-slate-800 shadow-md">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Railway Stations</span>
            </div>
            <div className="mt-2 text-3xl font-black font-mono text-slate-900 dark:text-white">
              {stats?.totalStations || 28}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Geocoded Coordinates</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200/80 dark:border-slate-800 shadow-md">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <Activity className="w-4 h-4 text-indigo-500" />
              <span>WebSocket Latency</span>
            </div>
            <div className="mt-2 text-3xl font-black font-mono text-slate-900 dark:text-white">
              &lt; 150 <span className="text-sm font-sans font-normal text-slate-400">ms</span>
            </div>
            <div className="text-[11px] text-indigo-600 font-semibold mt-1">Zero-Refresh Stream</div>
          </div>
        </div>
      </section>

      {/* FEATURED / POPULAR TRAINS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Active Railway Fleet</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Popular Trains Running Now
            </h2>
          </div>

          <Link
            to="/live-trains"
            className="inline-flex items-center space-x-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All Live Trains</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTrains.map((item) => (
            <TrainCard
              key={item.trainNumber}
              train={{
                trainNumber: item.trainNumber,
                trainName: item.train.trainName,
                trainType: item.train.trainType,
                sourceCode: item.train.sourceCode,
                sourceName: item.train.sourceName,
                destinationCode: item.train.destinationCode,
                destinationName: item.train.destinationName,
                totalDistance: item.train.totalDistance,
                durationHours: item.train.durationHours,
                currentDelayMinutes: item.train.currentDelayMinutes,
                activeDeviceId: item.device?.deviceId
              }}
            />
          ))}
        </div>
      </section>

      {/* SIH LIVE DEMO SIMULATOR EMBED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GpsSimulatorWidget defaultTrainNumber="12723" />
      </section>

      {/* HOW IT WORKS ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            System Architecture
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            How SmartRail India Works
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            An end-to-end IoT and software pipeline ensuring reliable, sub-second railway telemetry from loco to passenger screens.
          </p>
        </div>

        {/* Architecture Pipeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 1</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">ESP32 + GPS Sensor</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              NEO-6M GPS acquires latitude, longitude, and speed from satellites and feeds TinyGPS++ on the ESP32.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Server className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">Step 2</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">REST Ingest & Auth</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Encrypted HTTPS POST packet transmits telemetry to the Express.js backend with device authentication.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">Step 3</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Haversine Detection</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Backend calculates nearest railway stations, determines "Between X and Y" status, and predicts dynamic ETA.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Step 4</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">WebSocket Broadcast</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Socket.IO fans out live train markers and status updates to connected passenger dashboards instantly.
            </p>
          </div>
        </div>
      </section>

      {/* KEY INNOVATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Smart India Hackathon Innovations
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Key Technical Innovations
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            Bridging physical edge IoT hardware with modern web GIS visualization for Indian Railways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
