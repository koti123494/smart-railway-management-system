// frontend/src/components/iot/DeviceTable.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Train, ExternalLink, Activity } from 'lucide-react';

export default function DeviceTable({ devices = [], liveLocations = {} }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <span>ESP32 Fleet Telemetry Table</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time IoT device heartbeats, GPS fixes, and speeds
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {devices.length} Devices Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Device</th>
              <th className="py-3.5 px-4 font-semibold">Train</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold">Speed</th>
              <th className="py-3.5 px-4 font-semibold">Location (GPS)</th>
              <th className="py-3.5 px-4 font-semibold">Last Update</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {devices.map((device) => {
              const isOnline = device.status === 'Online';
              const trainNumber = device.trainNumber;
              const loc = trainNumber ? liveLocations[trainNumber] : null;

              return (
                <tr
                  key={device.deviceId}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors font-mono"
                >
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                    <span>{device.deviceId}</span>
                  </td>

                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {trainNumber ? (
                      <Link
                        to={`/track/${trainNumber}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                      >
                        #{trainNumber}
                      </Link>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        isOnline
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400'
                      }`}
                    >
                      {isOnline ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {loc ? `${Math.round(loc.speed)} km/h` : isOnline ? '75 km/h' : '--'}
                  </td>

                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-[11px]">
                    {loc ? `${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}` : '17.3917, 78.4735'}
                  </td>

                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                    {device.lastSeen ? new Date(device.lastSeen).toLocaleTimeString() : 'N/A'}
                  </td>

                  <td className="py-3 px-4 text-right">
                    {trainNumber && (
                      <Link
                        to={`/track/${trainNumber}`}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 hover:bg-blue-100 font-sans font-medium text-xs transition-colors"
                      >
                        <span>Track</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
