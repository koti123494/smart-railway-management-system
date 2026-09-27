// frontend/src/components/tracking/TelemetryCard.jsx
import React from 'react';
import {
  Battery,
  Wifi,
  Thermometer,
  Activity,
  Compass,
  Gauge,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { IoTDeviceBadge } from '../common/Badge';

export default function TelemetryCard({ location, device, trainNumber }) {
  const batteryLevel = device?.batteryLevel !== undefined ? device.batteryLevel : 92;
  const signalDbm = device?.signalDbm !== undefined ? device.signalDbm : -70;
  const speed = Math.round(location?.speed || 0);
  const direction = Math.round(location?.direction || 0);
  const temperature = location?.temperature || 28.5;
  const vibration = location?.vibration || 0.12;

  // Signal strength quality
  const getSignalQuality = (dbm) => {
    if (dbm >= -70) return { label: 'Excellent', color: 'text-emerald-500' };
    if (dbm >= -85) return { label: 'Good', color: 'text-blue-500' };
    return { label: 'Fair', color: 'text-amber-500' };
  };

  const signalInfo = getSignalQuality(signalDbm);

  return (
    <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              ESP32 IoT Telemetry Hub
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Device: {device?.deviceId || 'ESP32-TRAIN-001'}
            </p>
          </div>
        </div>

        <IoTDeviceBadge status={device?.status || 'Online'} />
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Speed Sensor */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center space-x-1">
              <Gauge className="w-3.5 h-3.5 text-blue-500" />
              <span>Speedometer</span>
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {speed} <span className="text-xs font-sans font-normal text-slate-500">km/h</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">NEO-6M GPS Doppler Fix</div>
        </div>

        {/* Battery Health */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center space-x-1">
              <Battery className="w-3.5 h-3.5 text-emerald-500" />
              <span>Li-ion Battery</span>
            </span>
            <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{batteryLevel}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full rounded-full ${batteryLevel > 30 ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{ width: `${batteryLevel}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-400 font-mono">3.92V Standalone Backup</div>
        </div>

        {/* Signal & Carrier */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center space-x-1">
              <Wifi className="w-3.5 h-3.5 text-indigo-500" />
              <span>Network Signal</span>
            </span>
            <span className={`text-[11px] font-bold ${signalInfo.color}`}>{signalInfo.label}</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
            {signalDbm} <span className="text-xs font-sans font-normal text-slate-500">dBm</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">4G LTE / Coach WiFi</div>
        </div>

        {/* Course / Heading */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center space-x-1">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Track Direction</span>
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
            {direction}°
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Railway Azimuth</div>
        </div>
      </div>

      {/* Auxiliary Coach Condition Sensors */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Coach Ambient Sensors</span>
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
              <Thermometer className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Coach Temp</div>
              <div className="font-bold font-mono text-slate-800 dark:text-slate-200">{temperature}°C</div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Bogie Vibration</div>
              <div className="font-bold font-mono text-slate-800 dark:text-slate-200">{vibration} g (Normal)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Details Bar */}
      <div className="pt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
        <span>FW: {device?.firmwareVersion || 'v2.4.1'}</span>
        <span>SIH Edge Protocol</span>
        <span>GPS Sat: 8 visible</span>
      </div>
    </div>
  );
}
