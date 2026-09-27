// frontend/src/components/iot/DeviceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Radio,
  Battery,
  Wifi,
  Train,
  Clock,
  ArrowRight
} from 'lucide-react';
import { IoTDeviceBadge } from '../common/Badge';

export default function DeviceCard({ device }) {
  if (!device) return null;
  const isOnline = device.status === 'Online';

  return (
    <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-5 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl ${isOnline ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-mono font-bold text-base text-slate-900 dark:text-white">
              {device.deviceId}
            </h4>
            <div className="text-[11px] text-slate-400 font-mono">
              FW: {device.firmwareVersion || 'v2.4.1'}
            </div>
          </div>
        </div>

        <IoTDeviceBadge status={device.status} />
      </div>

      <div className="space-y-2 text-xs mb-4">
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300">
          <span className="flex items-center space-x-1.5 text-slate-500">
            <Train className="w-3.5 h-3.5 text-blue-500" />
            <span>Assigned Train:</span>
          </span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {device.trainNumber ? `#${device.trainNumber}` : 'Unassigned'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
            <span className="flex items-center space-x-1 text-slate-400">
              <Battery className="w-3.5 h-3.5 text-emerald-500" />
              <span>Battery:</span>
            </span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {device.batteryLevel !== undefined ? `${device.batteryLevel}%` : '95%'}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
            <span className="flex items-center space-x-1 text-slate-400">
              <Wifi className="w-3.5 h-3.5 text-indigo-500" />
              <span>Signal:</span>
            </span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              {device.signalDbm !== undefined ? `${device.signalDbm} dBm` : '-70 dBm'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <span className="text-[11px] text-slate-400 font-mono">
          Last seen: {device.lastSeen ? new Date(device.lastSeen).toLocaleTimeString() : 'N/A'}
        </span>

        {device.trainNumber && (
          <Link
            to={`/track/${device.trainNumber}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center space-x-1"
          >
            <span>Live View</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
