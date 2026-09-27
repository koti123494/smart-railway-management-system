// frontend/src/components/iot/GpsSimulatorWidget.jsx
import React, { useState, useEffect } from 'react';
import {
  Play,
  Square,
  Send,
  Code2,
  Copy,
  Check,
  Radio,
  Sliders,
  Sparkles,
  Cpu
} from 'lucide-react';
import { startSimulation, stopSimulation, getSimulationStatus, postLocation } from '../../services/api';

export default function GpsSimulatorWidget({ defaultTrainNumber = '12723' }) {
  const [selectedTrain, setSelectedTrain] = useState(defaultTrainNumber);
  const [isSimulating, setIsSimulating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Manual GPS ping state
  const [manualLat, setManualLat] = useState('17.9788');
  const [manualLon, setManualLon] = useState('79.5222');
  const [manualSpeed, setManualSpeed] = useState('85');
  const [manualStatus, setManualStatus] = useState('');

  const checkStatus = async () => {
    try {
      const res = await getSimulationStatus();
      if (res.data && res.data.data) {
        const isRunning = res.data.data.some(s => s.trainNumber === selectedTrain);
        setIsSimulating(isRunning);
      }
    } catch (err) {
      console.warn('Could not check simulation status:', err.message);
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 4000);
    return () => clearInterval(interval);
  }, [selectedTrain]);

  const handleToggleSimulation = async () => {
    setLoading(true);
    try {
      if (isSimulating) {
        await stopSimulation(selectedTrain);
        setIsSimulating(false);
      } else {
        await startSimulation(selectedTrain, 2500);
        setIsSimulating(true);
      }
    } catch (err) {
      console.error('Simulation toggle failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendManualPing = async (e) => {
    e.preventDefault();
    setManualStatus('Transmitting GPS packet...');
    try {
      const payload = {
        deviceId: `ESP32-DEMO-${selectedTrain.slice(-3)}`,
        trainNumber: selectedTrain,
        latitude: parseFloat(manualLat),
        longitude: parseFloat(manualLon),
        speed: parseFloat(manualSpeed),
        direction: 350,
        batteryLevel: 94,
        signalDbm: -66,
        timestamp: new Date().toISOString()
      };
      await postLocation(payload);
      setManualStatus('✅ Successfully transmitted! WebSocket broadcasted.');
      setTimeout(() => setManualStatus(''), 3500);
    } catch (err) {
      setManualStatus(`❌ Ingestion error: ${err.message}`);
    }
  };

  const sampleCurl = `curl -X POST http://localhost:5000/api/iot/location \\
  -H "Content-Type: application/json" \\
  -H "x-device-secret: smartrail_esp32_super_secret_key_2026" \\
  -d '{
    "deviceId": "ESP32-TRAIN-001",
    "trainNumber": "${selectedTrain}",
    "latitude": 17.9788,
    "longitude": 79.5222,
    "speed": 82.5,
    "direction": 340,
    "timestamp": "${new Date().toISOString()}"
  }'`;

  const copyCurl = () => {
    navigator.clipboard.writeText(sampleCurl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e172a] to-blue-950 border border-blue-900/40 p-6 text-white shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-lg text-white">SIH Live GPS Simulator & Ingest Tester</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Hackathon Demo Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Trigger live train movement along real routes without physical hardware
            </p>
          </div>
        </div>

        {/* Live Simulation Indicator */}
        <div className="flex items-center space-x-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isSimulating ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
          <span className="text-xs font-mono font-semibold">
            {isSimulating ? 'Route Simulation Running' : 'Simulation Standby'}
          </span>
        </div>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Target Train Fleet</label>
          <select
            value={selectedTrain}
            onChange={(e) => setSelectedTrain(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="12723">#12723 — Telangana Express (HYB → NDLS)</option>
            <option value="20833">#20833 — Vande Bharat Express (VSKP → SC)</option>
            <option value="12433">#12433 — Rajdhani Express (MAS → NZM)</option>
            <option value="12627">#12627 — Karnataka Express (SBC → NDLS)</option>
          </select>
        </div>

        <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-4 sm:pt-0">
          <button
            onClick={handleToggleSimulation}
            disabled={loading}
            className={`flex-1 flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all ${
              isSimulating
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
            }`}
          >
            {isSimulating ? (
              <>
                <Square className="w-4 h-4 fill-white" />
                <span>Pause Live Simulation</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Start Continuous Route Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Manual GPS Ping Ingest Form */}
      <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
        <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>Send Single Simulated ESP32 GPS Ping</span>
          </span>
          {manualStatus && (
            <span className="text-xs font-mono text-emerald-400 animate-pulse">{manualStatus}</span>
          )}
        </div>

        <form onSubmit={handleSendManualPing} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[10px] text-slate-400 font-mono">Latitude</label>
            <input
              type="text"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 font-mono">Longitude</label>
            <input
              type="text"
              value={manualLon}
              onChange={(e) => setManualLon(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 font-mono">Speed (km/h)</label>
            <input
              type="text"
              value={manualSpeed}
              onChange={(e) => setManualSpeed(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white flex items-center justify-center space-x-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Ping</span>
            </button>
          </div>
        </form>
      </div>

      {/* cURL Code Snippet for Judges */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center space-x-1 font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>Hardware REST Ingestion Sample (POST /api/iot/location)</span>
          </span>
          <button
            onClick={copyCurl}
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy cURL'}</span>
          </button>
        </div>
        <pre className="p-3 rounded-xl bg-black/50 border border-slate-800 text-[11px] font-mono text-blue-300 overflow-x-auto">
          {sampleCurl}
        </pre>
      </div>
    </div>
  );
}
