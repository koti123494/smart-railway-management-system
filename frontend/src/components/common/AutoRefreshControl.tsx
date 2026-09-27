import React, { useEffect, useState, useRef } from 'react';
import { RefreshCw, Radio, CheckCircle, Pause } from 'lucide-react';

interface AutoRefreshControlProps {
  onRefresh: () => Promise<void> | void;
  lastUpdatedDate: string | Date;
  isRefreshing?: boolean;
  defaultIntervalSeconds?: number;
}

export const AutoRefreshControl: React.FC<AutoRefreshControlProps> = ({
  onRefresh,
  lastUpdatedDate,
  isRefreshing = false,
  defaultIntervalSeconds = 30,
}) => {
  const [intervalSec, setIntervalSec] = useState<number>(defaultIntervalSeconds);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [secondsAgo, setSecondsAgo] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(intervalSec);
  const isMounted = useRef<boolean>(true);

  // Calculate seconds ago ticker
  useEffect(() => {
    isMounted.current = true;
    const calculateSeconds = () => {
      if (!lastUpdatedDate) return;
      const updatedTime = new Date(lastUpdatedDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.floor((now - updatedTime) / 1000));
      setSecondsAgo(diff);
    };

    calculateSeconds();
    const interval = setInterval(calculateSeconds, 1000);
    return () => clearInterval(interval);
  }, [lastUpdatedDate]);

  // Countdown and periodic trigger
  useEffect(() => {
    if (!isEnabled || intervalSec <= 0) return;

    setTimeRemaining(intervalSec);
    const countdown = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onRefresh();
          return intervalSec;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isEnabled, intervalSec, onRefresh]);

  const formatSecondsAgo = (secs: number) => {
    if (secs < 10) return 'just now';
    if (secs < 60) return `${secs} seconds ago`;
    const mins = Math.floor(secs / 60);
    if (mins === 1) return '1 minute ago';
    return `${mins} minutes ago`;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Left: Status & Last Updated */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {isEnabled ? (
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          ) : (
            <span className="inline-flex rounded-full h-2.5 w-2.5 bg-slate-400"></span>
          )}
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {isEnabled ? 'Live updates enabled' : 'Live updates paused'}
          </span>
        </div>

        <span className="text-slate-300 dark:text-slate-700">|</span>

        <span className="text-xs text-slate-500 dark:text-slate-400">
          Last updated <strong className="font-medium text-slate-700 dark:text-slate-300">{formatSecondsAgo(secondsAgo)}</strong>
        </span>

        {isEnabled && (
          <span className="hidden sm:inline-block text-[11px] text-cyan-600 dark:text-cyan-400 font-mono">
            (next in {timeRemaining}s)
          </span>
        )}
      </div>

      {/* Right: Interval selector & Manual refresh */}
      <div className="flex items-center gap-2">
        <select
          value={isEnabled ? intervalSec : 'paused'}
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'paused') {
              setIsEnabled(false);
            } else {
              setIsEnabled(true);
              setIntervalSec(Number(val));
            }
          }}
          className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
        >
          <option value="15">Refresh every 15s</option>
          <option value="30">Refresh every 30s</option>
          <option value="60">Refresh every 1m</option>
          <option value="120">Refresh every 2m</option>
          <option value="paused">Pause updates</option>
        </select>

        <button
          onClick={() => onRefresh()}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white transition-all shadow-sm disabled:opacity-50"
          title="Manually refresh train status"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
        </button>
      </div>
    </div>
  );
};
