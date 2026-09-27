// frontend/src/components/common/Badge.jsx
import React from 'react';

export function DelayBadge({ delayMinutes }) {
  if (delayMinutes === undefined || delayMinutes === null) return null;

  if (delayMinutes <= 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
        On Time
      </span>
    );
  }

  if (delayMinutes <= 15) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
        {delayMinutes}m Late
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5 animate-ping" />
      {delayMinutes}m Delayed
    </span>
  );
}

export function StatusBadge({ status }) {
  const s = (status || '').toLowerCase();
  if (s.includes('run') || s.includes('ontime') || s.includes('live')) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
        Live Running
      </span>
    );
  }
  if (s.includes('delay')) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        Delayed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
      {status || 'Scheduled'}
    </span>
  );
}

export function IoTDeviceBadge({ status }) {
  const isOnline = status === 'Online';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium ${
      isOnline
        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
      {isOnline ? 'Online' : 'Offline'}
    </span>
  );
}
