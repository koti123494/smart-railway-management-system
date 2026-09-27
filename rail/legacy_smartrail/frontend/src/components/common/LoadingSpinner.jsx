// frontend/src/components/common/LoadingSpinner.jsx
import React from 'react';
import { Train } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading live railway data...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-950 border-t-blue-600 dark:border-t-blue-500 animate-spin" />
        <div className="absolute">
          <Train className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 font-mono animate-pulse">
        {message}
      </p>
    </div>
  );
}
