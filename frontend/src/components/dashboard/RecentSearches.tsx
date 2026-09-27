import React from 'react';
import { Link } from 'react-router-dom';
import { History, ArrowUpRight, Navigation, Trash2 } from 'lucide-react';

export interface RecentSearchItem {
  trainNumber: string;
  trainName: string;
  timestamp?: number;
}

interface RecentSearchesProps {
  items: RecentSearchItem[];
  onClear?: () => void;
  className?: string;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  items,
  onClear,
  className = '',
}) => {
  // Default popular searches if user has no recent history
  const displayItems =
    items && items.length > 0
      ? items
      : [
          { trainNumber: '12801', trainName: 'Purushottam Express' },
          { trainNumber: '12723', trainName: 'Telangana Express' },
          { trainNumber: '12627', trainName: 'Karnataka Express' },
          { trainNumber: '12951', trainName: 'Mumbai Rajdhani Express' },
        ];

  return (
    <div className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {items && items.length > 0 ? 'Recent Searches' : 'Popular Trains to Track'}
          </h4>
        </div>
        {items && items.length > 0 && onClear && (
          <button
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1"
            title="Clear search history"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {displayItems.map((item) => (
          <Link
            key={item.trainNumber}
            to={`/train/${item.trainNumber}/live`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-cyan-50 dark:bg-slate-800 dark:hover:bg-cyan-950/60 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all group"
          >
            <span className="font-mono text-cyan-600 dark:text-cyan-400">{item.trainNumber}</span>
            <span>{item.trainName}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};
