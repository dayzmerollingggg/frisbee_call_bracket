import React, { useState } from 'react';
import {
  CALL_CATEGORIES,
  CONTEST_OPTIONS,
  OUTCOME_OPTIONS,
  resolvePlayCall,
} from '../data/rulesData';
import { CallCategory, ContestStatus, RuleDecision, ThrowOutcome } from '../types/rules';
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle2,
  Disc,
  ExternalLink,
  HelpCircle,
  Plus,
  RotateCcw,
  Sliders,
  Sparkles,
  Trash2,
} from 'lucide-react';

interface SavedCustomScenario {
  id: string;
  name: string;
  notes: string;
  decision: RuleDecision;
  category: CallCategory;
  contest: ContestStatus;
  outcome: ThrowOutcome;
  stall: number;
}

export const CustomSituationBuilder: React.FC = () => {
  const [scenarioName, setScenarioName] = useState('Endzone Hammer Pick Dispute');
  const [caller, setCaller] = useState<'offense' | 'defense'>('defense');
  const [category, setCategory] = useState<CallCategory>('pick');
  const [outcome, setOutcome] = useState<ThrowOutcome>('completed');
  const [contest, setContest] = useState<ContestStatus>('uncontested');
  const [stall, setStall] = useState<number>(7);
  const [customNotes, setCustomNotes] = useState('Defender was picked cutting behind the stack as the throw went up.');

  // Saved scenarios in this session
  const [savedScenarios, setSavedScenarios] = useState<SavedCustomScenario[]>([
    {
      id: 'default_saved_1',
      name: 'Double Team Infraction on Sideline Trap',
      notes: 'Second defender stepped within 8 feet while marker was at stall 6.',
      decision: resolvePlayCall({
        situationId: 'marking_double_team',
        outcomeId: 'not_thrown',
        contestId: 'uncontested',
        currentStall: 6,
      }),
      category: 'marking_infraction',
      contest: 'uncontested',
      outcome: 'not_thrown',
      stall: 6,
    },
    {
      id: 'default_saved_2',
      name: 'Contested Endzone Sky Contact',
      notes: 'Offense and defense both jumped, defense called foul on the landing.',
      decision: resolvePlayCall({
        situationId: 'def_receiving_foul_air',
        outcomeId: 'turnover_ground',
        contestId: 'contested',
        currentStall: 7,
      }),
      category: 'receiving_foul',
      contest: 'contested',
      outcome: 'turnover_ground',
      stall: 7,
    },
  ]);

  // Map category to a situation id for calculation
  const getSituationIdForCategory = (cat: CallCategory) => {
    switch (cat) {
      case 'marking_infraction':
        return 'marking_fast_count';
      case 'pick':
        return outcome === 'not_thrown' ? 'pick_before_throw' : 'pick_in_air';
      case 'travel':
        return 'travel_pivot_drag';
      case 'stall_out':
        return 'stall_out_call';
      case 'strip':
        return 'strip_call_receiver';
      case 'dangerous_play':
        return 'dangerous_play_call';
      case 'out_of_bounds':
        return 'oob_line_dispute';
      case 'offsides_pull':
        return caller === 'defense' ? 'offsides_offense' : 'offsides_defense';
      case 'receiving_foul':
        return 'def_receiving_foul_air';
      case 'throwing_foul':
      default:
        return 'def_foul_during_throw';
    }
  };

  const calculatedDecision = resolvePlayCall({
    situationId: getSituationIdForCategory(category),
    outcomeId: outcome,
    contestId: contest,
    currentStall: stall,
  });

  const handleSaveScenario = () => {
    if (!scenarioName.trim()) return;
    const newScenario: SavedCustomScenario = {
      id: `custom_${Date.now()}`,
      name: scenarioName,
      notes: customNotes,
      decision: calculatedDecision,
      category,
      contest,
      outcome,
      stall,
    };
    setSavedScenarios([newScenario, ...savedScenarios]);
    setScenarioName('');
    setCustomNotes('');
  };

  const handleDeleteScenario = (id: string) => {
    setSavedScenarios(savedScenarios.filter((s) => s.id !== id));
  };

  const handleLoadScenario = (scen: SavedCustomScenario) => {
    setScenarioName(scen.name);
    setCustomNotes(scen.notes);
    setCategory(scen.category);
    setContest(scen.contest);
    setOutcome(scen.outcome);
    setStall(scen.stall);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Custom Situation Sandbox</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Build & Test Your Own Custom Play Call
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mt-1">
              Combine any caller, play infraction, disc trajectory, and stall count to resolve
              what the official USAU end result must be. Perfect for team captains, clinic prep, and
              observer training.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Builder Form */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Scenario Name / Description
              </label>
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="e.g., Endzone Hammer Pick Dispute"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Who Made the Call?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCaller('offense')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                      caller === 'offense'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Offense
                  </button>
                  <button
                    type="button"
                    onClick={() => setCaller('defense')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                      caller === 'defense'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Defense
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Dispute Status
                </label>
                <select
                  value={contest}
                  onChange={(e) => setContest(e.target.value as ContestStatus)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                >
                  {CONTEST_OPTIONS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Infraction / Foul Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CallCategory)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
              >
                {CALL_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.usauRuleReference})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Disc Status During / After Call
              </label>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value as ThrowOutcome)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
              >
                {OUTCOME_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Stall Count When Called
                </label>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                  Stalling {stall}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stall}
                onChange={(e) => setStall(Number(e.target.value))}
                className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Additional Notes / Play Context
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Add on-field details (e.g. wind conditions, pivot location, disc in air flight time)..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveScenario}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Save to Custom Tournament Scenarios</span>
              </button>
            </div>
          </div>

          {/* Result Card Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-5 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Live USAU Custom Ruling
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {calculatedDecision.isContested ? 'Contested' : 'Uncontested'}
                </span>
              </div>

              {/* Stall Count Big Callout */}
              <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700">
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">
                  Stall Count Decision
                </div>
                <div className="text-2xl font-black text-emerald-400">
                  {calculatedDecision.stallAction === 'turnover'
                    ? 'TURNOVER AT SPOT'
                    : `RESUMES AT STALLING ${calculatedDecision.calculatedStallResume}`}
                </div>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  {calculatedDecision.stallExplanation}
                </p>
              </div>

              {/* Possession and Disc Action */}
              <div className="space-y-1">
                <div className="text-xs uppercase font-bold text-slate-400">
                  Disc & Possession Ruling
                </div>
                <div className="text-sm font-bold text-slate-100">
                  {calculatedDecision.possessionSummary}
                </div>
              </div>

              {/* Rule Explanation */}
              <div className="space-y-1 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="font-bold text-purple-300 mb-0.5">USAU Rulebook Breakdown:</div>
                {calculatedDecision.explanation}
              </div>

              {/* USAU Rule Citation */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="font-mono text-slate-400">{calculatedDecision.ruleCitation}</span>
                <a
                  href={calculatedDecision.ruleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-bold inline-flex items-center gap-1"
                >
                  <span>Official USAU Text</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Custom Scenarios Library */}
        {savedScenarios.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-200 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Saved Custom Scenarios ({savedScenarios.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedScenarios.map((scen) => (
                <div
                  key={scen.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white space-y-2.5 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-800">{scen.name}</span>
                    <button
                      onClick={() => handleDeleteScenario(scen.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Delete Scenario"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {scen.notes && (
                    <p className="text-xs text-slate-500 line-clamp-2">{scen.notes}</p>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <span className="font-bold text-emerald-700">
                      Stall: {scen.decision.calculatedStallResume}
                    </span>
                    <button
                      onClick={() => handleLoadScenario(scen)}
                      className="text-purple-600 hover:text-purple-700 font-semibold text-xs"
                    >
                      Load into Builder →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
