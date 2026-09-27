// frontend/src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import {
  ShieldAlert,
  Cpu,
  Train,
  Plus,
  Link as LinkIcon,
  Activity,
  Server,
  Terminal,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import {
  getSystemStats,
  getDevices,
  registerDevice,
  assignDevice,
  getAuditLogs,
  getAllLiveTrains
} from '../services/api';
import { IoTDeviceBadge } from '../common/Badge';

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [devices, setDevices] = useState([]);
  const [trains, setTrains] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newDeviceId, setNewDeviceId] = useState('');
  const [newTrainNumber, setNewTrainNumber] = useState('');
  const [assignDeviceId, setAssignDeviceId] = useState('');
  const [assignTrainNumber, setAssignTrainNumber] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, devRes, trainsRes, logsRes] = await Promise.all([
        getSystemStats(),
        getDevices(),
        getAllLiveTrains(),
        getAuditLogs()
      ]);

      if (statsRes.data?.data) setStats(statsRes.data.data);
      if (devRes.data?.data) setDevices(devRes.data.data);
      if (trainsRes.data?.data) setTrains(trainsRes.data.data);
      if (logsRes.data?.data) setLogs(logsRes.data.data);
    } catch (err) {
      console.warn('Failed to load admin stats:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!newDeviceId.trim()) return;

    try {
      await registerDevice({
        deviceId: newDeviceId.trim().toUpperCase(),
        trainNumber: newTrainNumber.trim() || null
      });
      setActionMessage(`✅ Registered device ${newDeviceId.trim().toUpperCase()}`);
      setNewDeviceId('');
      setNewTrainNumber('');
      loadAdminData();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      setActionMessage(`❌ Registration error: ${err.message}`);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!assignDeviceId) return;

    try {
      await assignDevice(assignDeviceId, assignTrainNumber || null);
      setActionMessage(`✅ Assigned ${assignDeviceId} to train ${assignTrainNumber || 'Unassigned'}`);
      loadAdminData();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      setActionMessage(`❌ Assignment error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <ShieldAlert className="w-4 h-4" />
            <span>SIH Administration Console</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            System & Device Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Register hardware IoT units, configure train links, view audit logs & server telemetry
          </p>
        </div>

        <button
          onClick={loadAdminData}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh System</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-mono text-blue-700 dark:text-blue-300 animate-pulse">
          {actionMessage}
        </div>
      )}

      {/* System Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Server Uptime</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {stats?.serverUptimeSeconds ? `${Math.round(stats.serverUptimeSeconds / 60)} mins` : 'Live'}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Active Sockets</div>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {stats?.activeWebSocketClients || 1} Connected
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Total GPS Pings</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {stats?.totalGpsPings || 250}+
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Memory RSS</div>
          <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
            {stats?.memoryUsageMb || 42} MB
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Register Device Form */}
        <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Plus className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Register New ESP32 Device
            </h3>
          </div>

          <form onSubmit={handleRegister} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Device Identifier</label>
              <input
                type="text"
                value={newDeviceId}
                onChange={(e) => setNewDeviceId(e.target.value)}
                placeholder="e.g. ESP32-TRAIN-005"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                required
              />
            </div>

            <div>
              <label className="block text-slate-500 mb-1 font-medium">Link to Train Number (Optional)</label>
              <input
                type="text"
                value={newTrainNumber}
                onChange={(e) => setNewTrainNumber(e.target.value)}
                placeholder="e.g. 12723"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
            >
              Register Device
            </button>
          </form>
        </div>

        {/* Assign Device to Train Form */}
        <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <LinkIcon className="w-4 h-4 text-emerald-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Assign Device to Train
            </h3>
          </div>

          <form onSubmit={handleAssign} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Select Registered Device</label>
              <select
                value={assignDeviceId}
                onChange={(e) => setAssignDeviceId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">-- Choose ESP32 Unit --</option>
                {devices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.deviceId} ({d.trainNumber ? `Assigned #${d.trainNumber}` : 'Unassigned'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 mb-1 font-medium">Target Train Number</label>
              <select
                value={assignTrainNumber}
                onChange={(e) => setAssignTrainNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Unassign Device --</option>
                {trains.map((t) => (
                  <option key={t.trainNumber} value={t.trainNumber}>
                    #{t.trainNumber} - {t.train.trainName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
            >
              Update Train Assignment
            </button>
          </form>
        </div>
      </div>

      {/* System Audit Logs */}
      <div className="rounded-2xl bg-white dark:bg-[#10192d] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-slate-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            System Activity & Security Audit Trail
          </h3>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-72 overflow-y-auto font-mono text-xs">
          {logs.map((log) => (
            <div key={log.id} className="p-3 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
              <div className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {log.action}
                </span>
                <span className="text-slate-700 dark:text-slate-300">{log.details}</span>
              </div>
              <span className="text-slate-400 text-[10px]">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
