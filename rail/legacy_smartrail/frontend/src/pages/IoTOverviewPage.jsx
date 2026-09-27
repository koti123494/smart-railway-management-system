// frontend/src/pages/IoTOverviewPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Cpu,
  Radio,
  RefreshCw,
  Battery,
  Wifi,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { getDevices, getAllLiveTrains } from '../services/api';
import { useSocket } from '../context/SocketContext';
import DeviceCard from '../components/iot/DeviceCard';
import DeviceTable from '../components/iot/DeviceTable';
import GpsSimulatorWidget from '../components/iot/GpsSimulatorWidget';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function IoTOverviewPage() {
  const [devices, setDevices] = useState([]);
  const [liveLocations, setLiveLocations] = useState({});
  const [loading, setLoading] = useState(true);
  const { socket, isConnected } = useSocket();

  const loadIoTData = async () => {
    try {
      setLoading(true);
      const [devRes, trainsRes] = await Promise.all([
        getDevices(),
        getAllLiveTrains()
      ]);

      if (devRes.data?.data) {
        setDevices(devRes.data.data);
      }

      if (trainsRes.data?.data) {
        const locMap = {};
        for (const t of trainsRes.data.data) {
          locMap[t.trainNumber] = t.location;
        }
        setLiveLocations(locMap);
      }
    } catch (err) {
      console.warn('Error loading IoT telemetry:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIoTData();
  }, []);

  // Listen for IoT telemetry socket stream
  useEffect(() => {
    if (!socket) return;
    socket.emit('join:iot');

    const handleTelemetry = (packet) => {
      // Update location map
      if (packet.trainNumber) {
        setLiveLocations(prev => ({
          ...prev,
          [packet.trainNumber]: {
            latitude: packet.latitude,
            longitude: packet.longitude,
            speed: packet.speed,
            timestamp: packet.timestamp
          }
        }));
      }

      // Update device in list
      setDevices(prev =>
        prev.map(d => {
          if (d.deviceId === packet.deviceId) {
            return {
              ...d,
              status: 'Online',
              batteryLevel: packet.batteryLevel || d.batteryLevel,
              signalDbm: packet.signalDbm || d.signalDbm,
              lastSeen: packet.timestamp
            };
          }
          return d;
        })
      );
    };

    socket.on('iot:telemetry', handleTelemetry);
    return () => {
      socket.emit('leave:iot');
      socket.off('iot:telemetry', handleTelemetry);
    };
  }, [socket]);

  const onlineCount = devices.filter(d => d.status === 'Online').length;
  const offlineCount = devices.length - onlineCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Cpu className="w-4 h-4" />
            <span>ESP32 Hardware Edge Telemetry</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            IoT Fleet Telemetry Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor real-time sensor streams, battery voltages, GPS signals, and device heartbeats
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-slate-700 dark:text-slate-300">
              {isConnected ? 'Stream Active' : 'Connecting...'}
            </span>
          </div>

          <button
            onClick={loadIoTData}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            title="Refresh Devices"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200/80 dark:border-slate-800 shadow-md">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Cpu className="w-4 h-4 text-blue-500" />
            <span>Registered ESP32s</span>
          </div>
          <div className="mt-2 text-3xl font-black font-mono text-slate-900 dark:text-white">
            {devices.length}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Hardware & Simulated</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200/80 dark:border-slate-800 shadow-md">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online & Transmitting</span>
          </div>
          <div className="mt-2 text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            {onlineCount}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Live Heartbeat Active</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200/80 dark:border-slate-800 shadow-md">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Radio className="w-4 h-4 text-rose-500" />
            <span>Offline Devices</span>
          </div>
          <div className="mt-2 text-3xl font-black font-mono text-slate-700 dark:text-slate-300">
            {offlineCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Standby or Power-down</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200/80 dark:border-slate-800 shadow-md">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Battery className="w-4 h-4 text-emerald-500" />
            <span>Avg Battery Health</span>
          </div>
          <div className="mt-2 text-3xl font-black font-mono text-slate-900 dark:text-white">
            89%
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Optimal Voltage (3.9V)</div>
        </div>
      </div>

      {/* Real-time Fleet Table */}
      <DeviceTable devices={devices} liveLocations={liveLocations} />

      {/* Simulator Control Widget for Hackathon Demos */}
      <GpsSimulatorWidget defaultTrainNumber="12723" />

      {/* Individual Device Cards Grid */}
      <div>
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
          Device Hardware Profiles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {devices.map((device) => (
            <DeviceCard key={device.deviceId} device={device} />
          ))}
        </div>
      </div>
    </div>
  );
}
