import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Navigation, ArrowRight, Train } from 'lucide-react';

interface SearchBarProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = '',
  onSearch,
  className = '',
  autoFocus = false,
}) => {
  const [query, setQuery] = useState(initialValue);
  const [searchMode, setSearchMode] = useState<'number' | 'name' | 'from' | 'to'>('number');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) return;

    if (onSearch) {
      onSearch(clean);
    } else {
      // If it looks like a train number (digits), navigate to tracking or search
      if (/^\d{4,5}$/.test(clean)) {
        navigate(`/train/${clean}/live`);
      } else {
        navigate(`/trains?q=${encodeURIComponent(clean)}`);
      }
    }
  };

  const handleTrackDirect = () => {
    const clean = query.trim();
    if (!clean) return;
    if (/^\d{4,5}$/.test(clean)) {
      navigate(`/train/${clean}/live`);
    } else {
      navigate(`/trains?q=${encodeURIComponent(clean)}`);
    }
  };

  const quickPills = [
    { label: 'Train Number', mode: 'number' as const, placeholder: 'e.g. 12801, 12723, 22436' },
    { label: 'Train Name', mode: 'name' as const, placeholder: 'e.g. Purushottam Express, Rajdhani' },
    { label: 'From Station', mode: 'from' as const, placeholder: 'e.g. New Delhi, NDLS, Howrah' },
    { label: 'To Station', mode: 'to' as const, placeholder: 'e.g. Varanasi, Vijayawada, Puri' },
  ];

  const currentPlaceholder = quickPills.find((p) => p.mode === searchMode)?.placeholder || 'Enter Train Number or Train Name';

  return (
    <div className={`w-full max-w-3xl mx-auto space-y-3 ${className}`}>
      {/* Quick Option Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
        {quickPills.map((pill) => (
          <button
            key={pill.mode}
            type="button"
            onClick={() => setSearchMode(pill.mode)}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              searchMode === pill.mode
                ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Search Input Box */}
      <form
        onSubmit={handleSearch}
        className="relative flex flex-col sm:flex-row items-center p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent gap-2"
      >
        <div className="flex items-center flex-1 w-full px-3 gap-3">
          <Train className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Enter ${quickPills.find((p) => p.mode === searchMode)?.label} (${currentPlaceholder})`}
            autoFocus={autoFocus}
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none py-1.5"
          />
        </div>

        {/* Buttons: Search Train & Track Train */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="submit"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search Train</span>
          </button>

          <button
            type="button"
            onClick={handleTrackDirect}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-sm font-semibold shadow-md shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Navigation className="w-4 h-4" />
            <span>Track Train</span>
          </button>
        </div>
      </form>
    </div>
  );
};
