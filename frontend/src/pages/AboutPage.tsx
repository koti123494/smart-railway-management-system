import React from 'react';
import { ShieldCheck, Train, Radio, Cpu, Layers, HelpCircle, Code } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-xs font-semibold border border-cyan-500/30">
          <Train className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>System Architecture & Data Accuracy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          About RailTrack India
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Understanding how real-time Indian railway tracking works, telemetry pipelines, and our
          strict data honesty policy.
        </p>
      </div>

      {/* Core Principle: Real-Time Accuracy Policy */}
      <section className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Strict Accuracy Guarantee
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We never fabricate or interpolate fictitious GPS coordinates
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Indian Railways tracks trains using multiple telemetry systems: the Control Office
          Application (COA), Freight Operations Information System (FOIS), National Train Enquiry
          System (NTES), and the Real-time Train Information System (RTIS) powered by ISRO satellites.
        </p>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Most public railway APIs provide <strong>station-level departure and arrival timestamps</strong>{' '}
          rather than continuous GPS latitude/longitude feeds. Whenever GPS data is unavailable from
          the connected API provider, <strong>RailTrack India explicitly labels the train location as
          &quot;Latest Reported Station&quot;</strong> and renders the marker at that station rather than
          fictitiously simulating GPS tracks.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live GPS Location
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Active only when hardware telemetry reports genuine satellite geo-coordinates from RTIS
              locomotives.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Latest Reported Station
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Reflects the station block where the train was physically logged passing signal gates or
              platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-600" />
          <span>Technology Stack</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Frontend</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
              <li>• <strong>React 18</strong> with Vite & TypeScript</li>
              <li>• <strong>Tailwind CSS</strong> with full Dark & Light mode</li>
              <li>• <strong>Leaflet & OpenStreetMap</strong> for interactive mapping</li>
              <li>• <strong>Lucide React</strong> for accessible icon status indicators</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Backend & Architecture</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
              <li>• <strong>Node.js & Express</strong> in TypeScript</li>
              <li>• <strong>RailwayService Abstraction</strong> with swappable providers</li>
              <li>• <strong>In-memory TTL cache & request throttling</strong> to preserve API limits</li>
              <li>• <strong>Mock & Real API providers</strong> configured via environment variables</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-600" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Can I plug in a free external Railway API?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Yes! Edit the <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.env</code>{' '}
              file in the backend directory. Set <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">USE_MOCK_RAILWAY_API=false</code>{' '}
              and add your free API key from RapidAPI (e.g. IRCTC API) into{' '}
              <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">RAILWAY_API_KEY</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Does the website work offline or without an API key?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Yes! The built-in <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">MockRailwayProvider</code>{' '}
              contains authentic schedules, routes, and coordinates for major Indian trains (Purushottam Express,
              Telangana Express, Karnataka Express, Mumbai Rajdhani, Vande Bharat, etc.) and simulates dynamic delay
              progression.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              How often does the live tracking refresh?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              By default every 30 seconds. You can customize the interval to 15s, 1m, 2m, or pause live
              refreshes directly from the tracking toolbar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
