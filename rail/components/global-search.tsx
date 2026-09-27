'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Code2, Building2, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { TOPICS, COMPANIES, PROBLEMS } from '../lib/dsa-data';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search problems
  const matchedProblems = q
    ? PROBLEMS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.topicSlug.toLowerCase().includes(q) ||
          p.subtopic.toLowerCase().includes(q) ||
          p.companies.some((c) => c.companyName.toLowerCase().includes(q)) ||
          p.patterns.some((pat) => pat.toLowerCase().includes(q))
      ).slice(0, 5)
    : PROBLEMS.slice(0, 3);

  // Search topics
  const matchedTopics = q
    ? TOPICS.filter((t) => t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q)).slice(0, 4)
    : TOPICS.slice(0, 3);

  // Search companies
  const matchedCompanies = q
    ? COMPANIES.filter((c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)).slice(0, 4)
    : COMPANIES.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search problems, topics, companies, or patterns (e.g. 'Amazon sliding window')..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-6">
          {/* Problems Section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Curated Problems</span>
            </div>
            <div className="space-y-1.5">
              {matchedProblems.map((p) => (
                <Link
                  key={p.slug}
                  href={`/problems/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800/60 hover:border-zinc-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${
                        p.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : p.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {p.difficulty}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                        {p.title}
                      </div>
                      <div className="text-xs text-zinc-500 flex items-center gap-2">
                        <span>{p.subtopic}</span>
                        <span>•</span>
                        <span>{p.companies.map((c) => c.companyName).slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Topics Section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>DSA Roadmap Topics</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {matchedTopics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/topics/${t.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800/60 hover:border-zinc-700 transition-colors group"
                >
                  <div>
                    <div className="text-sm font-medium text-zinc-200 group-hover:text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-zinc-500">{t.levelName}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Companies Section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Companies</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {matchedCompanies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/companies/${c.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800/60 hover:border-zinc-700 transition-colors group"
                >
                  <div>
                    <div className="text-sm font-medium text-zinc-200 group-hover:text-white">
                      {c.name}
                    </div>
                    <div className="text-xs text-zinc-500">{c.tier} • {c.verifiedReports} debriefs</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950/60 border-t border-zinc-800 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-300">ESC</kbd> to exit</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-dimensional Placement Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}

