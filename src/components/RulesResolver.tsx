import React, { useMemo, useState } from 'react';
import {
  CALL_CATEGORIES,
  CALL_SITUATIONS,
  CONTEST_OPTIONS,
  OUTCOME_OPTIONS,
  PRESET_SCENARIOS,
  resolvePlayCall,
} from '../data/rulesData';
import { CallCategory, ContestStatus, ThrowOutcome } from '../types/rules';
import { FieldDiagram } from './FieldDiagram';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Flame,
  HelpCircle,
  RefreshCw,
  Search,
  Shield,
  Sliders,
  Sparkles,
  Volume2,
} from 'lucide-react';

export const RulesResolver: React.FC = () => {
  // Cascading state
  const [selectedCategory, setSelectedCategory] = useState<CallCategory>('throwing_foul');
  const [selectedSituationId, setSelectedSituationId] = useState<string>('def_foul_during_throw');
  const [selectedOutcome, setSelectedOutcome] = useState<ThrowOutcome>('turnover_ground');
  const [selectedContest, setSelectedContest] = useState<ContestStatus>('contested');
  const [currentStall, setCurrentStall] = useState<number>(6);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Available situations filtered by category
  const filteredSituations = useMemo(() => {
    let list = CALL_SITUATIONS.filter((s) => s.category === selectedCategory);
    if (list.length === 0) list = CALL_SITUATIONS;
    return list;
  }, [selectedCategory]);

  // Current active situation
  const currentSituation = useMemo(() => {
    return (
      CALL_SITUATIONS.find((s) => s.id === selectedSituationId) ||
      filteredSituations[0] ||
      CALL_SITUATIONS[0]
    );
  }, [selectedSituationId, filteredSituations]);

  // Handle category change (auto-selects first situation)
  const handleCategoryChange = (cat: CallCategory) => {
    setSelectedCategory(cat);
    const firstInCat = CALL_SITUATIONS.find((s) => s.category === cat);
    if (firstInCat) {
      setSelectedSituationId(firstInCat.id);
      // Auto-pick first valid outcome
      if (!firstInCat.possibleOutcomes.includes(selectedOutcome)) {
        setSelectedOutcome((firstInCat.possibleOutcomes[0] as ThrowOutcome) || 'completed');
      }
    }
  };

  // Handle situation change
  const handleSituationChange = (sitId: string) => {
    setSelectedSituationId(sitId);
    const sit = CALL_SITUATIONS.find((s) => s.id === sitId);
    if (sit && !sit.possibleOutcomes.includes(selectedOutcome)) {
      setSelectedOutcome((sit.possibleOutcomes[0] as ThrowOutcome) || 'completed');
    }
  };

  // Compute final rule decision dynamically
  const decision = useMemo(() => {
    return resolvePlayCall({
      situationId: selectedSituationId,
      outcomeId: selectedOutcome,
      contestId: selectedContest,
      currentStall: currentStall,
    });
  }, [selectedSituationId, selectedOutcome, selectedContest, currentStall]);

  // Reset / Clear All button
  const handleReset = () => {
    setSelectedCategory('throwing_foul');
    setSelectedSituationId('def_foul_during_throw');
    setSelectedOutcome('turnover_ground');
    setSelectedContest('uncontested');
    setCurrentStall(5);
    setSearchQuery('');
  };

  // Load a preset scenario
  const handleApplyPreset = (presetId: string) => {
    const p = PRESET_SCENARIOS.find((item) => item.id === presetId);
    if (!p) return;
    setSelectedCategory(p.category);
    setSelectedSituationId(p.situationId);
    setSelectedOutcome(p.outcomeId);
    setSelectedContest(p.contestId);
    setCurrentStall(p.initialStall);
  };

  // Search filtered situations for quick jump
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return CALL_SITUATIONS.filter(
      (s) =>
        s.label.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query) ||
        s.ruleCitation.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header & Mission */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/80 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official USA Ultimate 2024-2025 Rules Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Ultimate Frisbee Call & Stall Resolver
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Step through your on-field situation to find the exact official USAU ruling: whether
              the disc is sent back or stays, whether the stall count resets to 1, drops 2, or caps
              at 6/8/9, and read the exact rule citation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-sm font-medium transition shadow-sm active:scale-95"
              title="Reset all dropdowns and choices"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span>Clear / Reset All</span>
            </button>
            <a
              href="https://usaultimate.org/rules/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition shadow-md shadow-emerald-950 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>USAU Official Rules</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Quick search a rule, call, or situation (e.g. 'pick', 'fast count', 'stall 8', 'endzone strip')..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Quick search dropdown results */}
          {searchResults.length > 0 && (
            <div className="mt-2 bg-slate-900 border border-slate-700 rounded-xl max-h-56 overflow-y-auto divide-y divide-slate-800 shadow-2xl">
              {searchResults.map((res) => (
                <button
                  key={res.id}
                  onClick={() => {
                    setSelectedCategory(res.category);
                    setSelectedSituationId(res.id);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-3 hover:bg-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-200 transition"
                >
                  <div>
                    <span className="font-semibold text-emerald-400">{res.label}</span>
                    <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{res.description}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 ml-2 font-mono whitespace-nowrap">
                    {res.ruleCitation}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preset Scenarios Fast Buttons */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
            Common Contentious Tournament Calls (1-Click Presets)
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESET_SCENARIOS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleApplyPreset(p.id)}
              className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 bg-slate-50 transition group"
            >
              <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 line-clamp-1">
                {p.title}
              </div>
              <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                {p.tagline}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Customizer: 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Dropdowns & Situation Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                Customize Play & Situation
              </h2>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Interactive
              </span>
            </div>

            {/* Dropdown 1: Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                1. Rule / Call Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value as CallCategory)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              >
                {CALL_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.usauRuleReference})
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">
                {CALL_CATEGORIES.find((c) => c.id === selectedCategory)?.description}
              </p>
            </div>

            {/* Dropdown 2: Specific Situation */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                2. What Happened / Call Trigger
              </label>
              <select
                value={selectedSituationId}
                onChange={(e) => handleSituationChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              >
                {filteredSituations.map((sit) => (
                  <option key={sit.id} value={sit.id}>
                    {sit.label}
                  </option>
                ))}
              </select>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Context: </span>
                {currentSituation.description}
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold uppercase">
                    Caller: {currentSituation.caller}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {currentSituation.ruleCitation}
                  </span>
                </div>
              </div>
            </div>

            {/* Dropdown 3: Immediate Outcome / Disc Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                3. Disc Outcome When Call Occurred
              </label>
              <select
                value={selectedOutcome}
                onChange={(e) => setSelectedOutcome(e.target.value as ThrowOutcome)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              >
                {OUTCOME_OPTIONS.filter((opt) =>
                  currentSituation.possibleOutcomes.includes(opt.id)
                ).map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">
                {OUTCOME_OPTIONS.find((o) => o.id === selectedOutcome)?.description}
              </p>
            </div>

            {/* Dropdown 4: Dispute / Contest Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                4. Was the Call Contested or Uncontested?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CONTEST_OPTIONS.map((opt) => {
                  const isSelected = selectedContest === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedContest(opt.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                        isSelected
                          ? opt.id === 'uncontested'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : opt.id === 'contested'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                            : 'bg-slate-700 text-white border-slate-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.id === 'uncontested' && 'Uncontested'}
                      {opt.id === 'contested' && 'Contested'}
                      {opt.id === 'retracted' && 'Retracted'}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {CONTEST_OPTIONS.find((c) => c.id === selectedContest)?.description}
              </p>
            </div>

            {/* Input 5: Stall Count at Moment of Call */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  5. Stall Count When Call Was Made
                </label>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-sm font-mono">
                  Stalling {currentStall}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={currentStall}
                onChange={(e) => setCurrentStall(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono px-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Resolution & Result Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Verdict Card */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg space-y-6 relative overflow-hidden">
            {/* Top verdict banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Official Decision
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-xs font-semibold text-emerald-600">
                  Updated Instantly
                </span>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedContest === 'uncontested' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Uncontested (Accepted)
                  </span>
                ) : selectedContest === 'contested' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Contested (Disputed)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
                    Retracted Call
                  </span>
                )}

                {/* Sent back vs stays badge */}
                {decision.discAction === 'returned_to_thrower' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    Disc Returns to Thrower
                  </span>
                )}
                {decision.discAction === 'stays_with_receiver' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Disc Stays with Receiver
                  </span>
                )}
                {decision.discAction === 'turnover_at_spot' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                    Turnover (Defense Takes Disc)
                  </span>
                )}
                {decision.discAction === 'placed_at_infraction_spot' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    Placed at Infraction Spot
                  </span>
                )}
              </div>
            </div>

            {/* STALL COUNT HIGHLIGHT BOX (The core requirement!) */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-700">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <span>Stall Count Resolution (Rule 15.A.5)</span>
                <span className="font-mono text-slate-400">
                  Prior Count: Stalling {currentStall}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 my-2">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>RESUMES AT:</span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black shadow-md">
                    {decision.stallAction === 'turnover'
                      ? 'TURNOVER (Count 1)'
                      : `STALLING ${decision.calculatedStallResume}`}
                  </span>
                </div>
              </div>

              <p className="text-sm text-emerald-100/90 leading-relaxed mt-2 font-medium">
                {decision.stallExplanation}
              </p>
            </div>

            {/* Summary Explanation */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Play Result & Continuation Reasoning
              </h3>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {decision.explanation}
              </p>
            </div>

            {/* Check-In & Restart Instructions */}
            <div className="space-y-2 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span>How to Restart Play (Check-In Mechanics)</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950/90 leading-relaxed font-medium">
                {decision.checkInProcedure}
              </p>
            </div>

            {/* USAU Rule Citation & Official Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">{decision.ruleTitle}</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  {decision.ruleCitation}
                </span>
              </div>

              <a
                href={decision.ruleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
              >
                <span>Read Full USAU Rule Text</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Field Visualizer */}
          <FieldDiagram decision={decision} />
        </div>
      </div>
    </div>
  );
};
