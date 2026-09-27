import React from 'react';
import { Train, PlayCircle, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { DashboardStats } from '../../types';

interface StatsOverviewProps {
  stats: DashboardStats | null;
  loading?: boolean;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, loading = false }) => {
  const cards = [
    {
      label: 'Tracked Trains',
      value: stats?.trackedTrainsCount ?? 10,
      icon: Train,
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-50 dark:bg-cyan-950/40',
      border: 'border-cyan-200 dark:border-cyan-900',
    },
    {
      label: 'Running',
      value: stats?.runningCount ?? 7,
      icon: PlayCircle,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-900',
    },
    {
      label: 'Delayed',
      value: stats?.delayedCount ?? 3,
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-900',
    },
    {
      label: 'Cancelled',
      value: stats?.cancelledCount ?? 0,
      icon: AlertTriangle,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-200 dark:border-rose-900',
    },
    {
      label: 'Completed',
      value: stats?.completedCount ?? 0,
      icon: CheckCircle2,
      color: 'text-slate-600 dark:text-slate-400',
      bg: 'bg-slate-50 dark:bg-slate-800/40',
      border: 'border-slate-200 dark:border-slate-800',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`p-4 rounded-2xl border ${card.bg} ${card.border} transition-all hover:scale-[1.02] shadow-sm flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {card.label}
              </span>
              <Icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                {loading ? '...' : card.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
