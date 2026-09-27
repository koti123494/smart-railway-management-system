// frontend/src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Train, ShieldCheck, Github, Radio, Cpu, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#080d19] border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Train className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">SmartRail India</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Real-Time Railway Tracking & ESP32 IoT Monitoring Platform engineered for the Smart India Hackathon (SIH).
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Railway API & IoT Telemetry Online</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Tracking & Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/search" className="hover:text-blue-600 dark:hover:text-blue-400">Search Trains & Timetable</Link></li>
              <li><Link to="/live-trains" className="hover:text-blue-600 dark:hover:text-blue-400">Live Tracked Fleet</Link></li>
              <li><Link to="/stations" className="hover:text-blue-600 dark:hover:text-blue-400">Station Board & Platforms</Link></li>
              <li><Link to="/track/12723" className="hover:text-blue-600 dark:hover:text-blue-400">Telangana Express (12723)</Link></li>
              <li><Link to="/track/20833" className="hover:text-blue-600 dark:hover:text-blue-400">Vande Bharat Express (20833)</Link></li>
            </ul>
          </div>

          {/* IoT & Innovation */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              IoT & Hardware
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/iot-dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">ESP32 Device Fleet Status</Link></li>
              <li><Link to="/admin" className="hover:text-blue-600 dark:hover:text-blue-400">Admin Control Panel</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">SIH Architecture & How It Works</Link></li>
              <li><span className="text-slate-400">NEO-6M GPS & TinyGPS++ Engine</span></li>
              <li><span className="text-slate-400">Haversine Station Detection</span></li>
            </ul>
          </div>

          {/* Hackathon Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Smart India Hackathon
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>SIH Prototype 2026</span>
              </div>
              <p className="text-slate-500 leading-snug">
                Built to modernize passenger train tracking with edge IoT sensor telemetry and dynamic ETA prediction.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} SmartRail India. Built with ❤️ for Smart India Hackathon.</p>
          <div className="flex items-center space-x-4">
            <span>Production-Quality Prototype</span>
            <span>•</span>
            <span className="font-mono text-[11px]">v1.0.0-SIH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
