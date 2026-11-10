import React, { useEffect, useState } from 'react';
import { RulesResolver } from './components/RulesResolver';
import { CustomSituationBuilder } from './components/CustomSituationBuilder';
import { TournamentStudio } from './components/TournamentStudio';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Disc,
  ExternalLink,
  Flame,
  HelpCircle,
  Layers,
  Printer,
  Share2,
  Shield,
  Sliders,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'rules' | 'tournament'>('rules');
  const [rulesMode, setRulesMode] = useState<'standard' | 'custom_builder'>('standard');

  // Sync tab with URL hash if present
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('tourney=') || hash.includes('tab=tournament')) {
      setActiveTab('tournament');
    } else if (hash.includes('tab=rules')) {
      setActiveTab('rules');
    }
  }, []);

  const switchTab = (tab: 'rules' | 'tournament') => {
    setActiveTab(tab);
    window.location.hash = `tab=${tab}`;
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Application Header */}
      <header className="print:hidden bg-slate-950 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Disc className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white">
                    USAU Studio
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    2024–2025 Edition
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Rules Resolver & Tournament Bracket Generator
                </p>
              </div>
            </div>

            {/* Navigation Tabs (The Two Main Tabs) */}
            <nav className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => switchTab('rules')}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeTab === 'rules'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Call & Rules Resolver</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab('tournament')}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeTab === 'tournament'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Tournament & Bracket Studio</span>
              </button>
            </nav>

            {/* External USAU Links dropdown/button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://usaultimate.org/rules/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official Rules</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href="https://usaultimate.org/resources/tournament-directors/formats/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Format Manual</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Sub-header toggle for Rules Resolver Tab */}
        {activeTab === 'rules' && (
          <div className="bg-slate-900/90 border-t border-slate-800/80 px-4 sm:px-8 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Mode:</span>
                <button
                  onClick={() => setRulesMode('standard')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    rulesMode === 'standard'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Interactive Guided Resolver
                </button>
                <button
                  onClick={() => setRulesMode('custom_builder')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    rulesMode === 'custom_builder'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Custom Situation Sandbox
                </button>
              </div>

              <div className="text-[11px] text-slate-400 hidden sm:block">
                USAU Rule 15 (Stall Count) & Rule 17 (Fouls & Violations)
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'rules' ? (
          rulesMode === 'standard' ? (
            <RulesResolver />
          ) : (
            <CustomSituationBuilder />
          )
        ) : (
          <TournamentStudio />
        )}
      </main>

      {/* Footer */}
      <footer className="print:hidden bg-slate-900 border-t border-slate-800 text-slate-400 py-10 px-4 sm:px-6 text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
              <Disc className="w-4 h-4 text-emerald-400" />
              <span>USA Ultimate Rules & Tournament Studio</span>
            </div>
            <p className="text-slate-500 max-w-md">
              Compliant with the USA Ultimate Official Rules of Ultimate (2024–2025 Edition) and the USAU Manual of Tournament Formats.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs font-medium">
            <a
              href="https://usaultimate.org/rules/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1"
            >
              USAU Rulebook <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://usaultimate.org/resources/tournament-directors/formats/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 flex items-center gap-1"
            >
              Tournament Formats <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://play.usaultimate.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 flex items-center gap-1"
            >
              USAU Score Reporter <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">Spirit of the Game (SOTG)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
