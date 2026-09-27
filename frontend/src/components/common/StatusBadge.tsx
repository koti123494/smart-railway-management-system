import React from 'react';
import { PlayCircle, Clock, AlertTriangle, CheckCircle2, PauseCircle } from 'lucide-react';
import { TrainStatusType, StopStatus } from '../../types';

interface StatusBadgeProps {
  status: TrainStatusType | StopStatus;
  delayMinutes?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  delayMinutes = 0,
  className = '',
  size = 'md',
}) => {
  const normalized = status.toUpperCase();

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs sm:text-sm gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm sm:text-base gap-2 font-semibold',
  }[size];

  // Running -> green
  if (normalized === 'RUNNING') {
    return (
      <span
        className={`inline-flex items-center rounded-full font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 ${sizeStyles} ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Running</span>
        {delayMinutes > 0 && <span className="text-[11px] opacity-80">(+{delayMinutes}m)</span>}
      </span>
    );
  }

  // Delayed -> orange
  if (normalized === 'DELAYED' || (delayMinutes > 15 && normalized !== 'CANCELLED')) {
    return (
      <span
        className={`inline-flex items-center rounded-full font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 ${sizeStyles} ${className}`}
      >
        <Clock className="w-3.5 h-3.5 text-amber-500" />
        <span>Delayed {delayMinutes > 0 ? `+${delayMinutes}m` : ''}</span>
      </span>
    );
  }

  // Cancelled -> red
  if (normalized === 'CANCELLED') {
    return (
      <span
        className={`inline-flex items-center rounded-full font-medium bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 ${sizeStyles} ${className}`}
      >
        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
        <span>Cancelled</span>
      </span>
    );
  }

  // Completed -> blue/gray
  if (normalized === 'COMPLETED') {
    return (
      <span
        className={`inline-flex items-center rounded-full font-medium bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 ${sizeStyles} ${className}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
        <span>Completed Journey</span>
      </span>
    );
  }

  // Current (in timeline)
  if (normalized === 'CURRENT') {
    return (
      <span
        className={`inline-flex items-center rounded-full font-medium bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 ${sizeStyles} ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping mr-1" />
        <span>At Station</span>
      </span>
    );
  }

  // Upcoming
  if (normalized === 'UPCOMING') {
    return (
      <span
        className={`inline-flex items-center rounded-full font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 ${sizeStyles} ${className}`}
      >
        <span>Upcoming</span>
      </span>
    );
  }

  // Not started
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 ${sizeStyles} ${className}`}
    >
      <PauseCircle className="w-3.5 h-3.5 text-slate-400" />
      <span>Not Started</span>
    </span>
  );
};
