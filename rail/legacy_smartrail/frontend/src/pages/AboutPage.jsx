// frontend/src/pages/AboutPage.jsx
import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Train,
  Radio,
  Layers,
  Code2,
  MapPin,
  Clock,
  Compass,
  Zap,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title & SIH Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Smart India Hackathon (SIH) Presentation</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          SmartRail India
        </h1>
        <p className="max-w-2xl mx-auto text-base text-slate-600 dark:text-slate-400">
          Real-Time Railway Tracking & Edge IoT Monitoring Platform designed to empower passengers with millisecond-grade live train tracking and locomotive telemetry.
        </p>
      </div>

      {/* Problem Statement & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600">The Problem</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Delayed Station Signals & Crowdsourced Inaccuracies
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Conventional railway tracking systems rely either on manual station master logging or battery-draining cell tower crowdsourcing from passenger phones. This results in stale updates (often 10–30 minutes delayed), false alarms, and poor reliability in remote rural corridors.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">The Solution</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Dedicated Edge IoT Microcontrollers & Mathematical Station Detection
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            SmartRail India places dedicated, low-cost ESP32 + NEO-6M GPS modules in locomotive cabs. Telemetry is streamed over cellular networks, processed with the Haversine formula for automated station detection, and broadcast via WebSockets with sub-200ms latency.
          </p>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          System Architecture Pipeline
        </h2>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 overflow-x-auto text-center leading-relaxed">
          ESP32 + NEO-6M GPS <br />
          ↓ (NMEA Parsing via TinyGPS++) <br />
          WiFi / 4G Cellular Hotspot <br />
          ↓ (HTTPS REST POST /api/iot/location) <br />
          Node.js Express Backend API <br />
          ↓ (Haversine Station Detection & Dynamic ETA Engine) <br />
          Embedded Persistent Database <br />
          ↓ (WebSocket Push Broadcast) <br />
          Socket.IO + React 18 + Leaflet GIS Dashboard
        </div>
      </div>

      {/* Core Innovations List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Key Technical Innovations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white text-sm block">Haversine Distance Engine</strong>
              <span className="text-slate-500">
                Calculates geodesic distance from current latitude/longitude to all track stations, detecting "Between X and Y" and calculating platform arrival automatically.
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white text-sm block">Real-Time Zero-Refresh WebSockets</strong>
              <span className="text-slate-500">
                Socket.IO channels deliver coordinates to the client instantly, smoothly moving the train marker and updating arrival count-downs without full page reloads.
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white text-sm block">Dynamic Predictive ETA Engine</strong>
              <span className="text-slate-500">
                Adjusts ETA dynamically according to current speed, route halts, and cumulative delay instead of assuming static timetable schedules.
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white text-sm block">Integrated IoT Diagnostics</strong>
              <span className="text-slate-500">
                Fleet managers can view battery voltage, signal strength (dBm), coach temperature, and bogie vibration to detect anomalies before failure.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Technology Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-400 text-[10px]">Frontend</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">React 18 + Vite</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-400 text-[10px]">Styling</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">Tailwind CSS</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-400 text-[10px]">Mapping</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">Leaflet + OSM</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-400 text-[10px]">Backend</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">Node.js + Express</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-400 text-[10px]">Real-Time</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">Socket.IO WebSockets</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-400 text-[10px]">Hardware</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">ESP32 DevKit V1</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-400 text-[10px]">GPS Module</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">u-blox NEO-6M</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-slate-400 text-[10px]">Firmware</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">Arduino C++</div>
          </div>
        </div>
      </div>
    </div>
  );
}
