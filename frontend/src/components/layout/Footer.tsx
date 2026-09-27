import React from 'react';
import { Train, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
                <Train className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-sky-600 dark:from-cyan-400 dark:to-sky-400 bg-clip-text text-transparent">
                RailTrack India
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              A high-precision Indian train tracking and schedule monitoring portal. Designed with
              strict data honesty: we transparently present whether location telemetry is from
              real GPS receivers or latest station reporting without false fabrication.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Independent Railway Telemetry & Schedule Portal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/trains" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Train Directory
                </Link>
              </li>
              <li>
                <Link to="/train/12801/live" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Live Train Map
                </Link>
              </li>
              <li>
                <Link to="/stations" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Station Live Boards
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Accuracy */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Data Accuracy
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Timetable and running status data is normalized from official IRCTC / NTES railway
              feeds and simulated telemetry. Always verify with station announcements for critical
              travel.
            </p>
            <div className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              Powered by React, Vite, Leaflet & Express
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} RailTrack India. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Railway Travelers
          </p>
        </div>
      </div>
    </footer>
  );
};
