import React, { useEffect, useMemo, useState } from 'react';
import { buildTournament, DIVISION_PRESETS } from '../data/tournamentFormats';
import { DivisionType, TournamentConfig } from '../types/tournament';
import { PrintableBracket } from './PrintableBracket';
import {
  Award,
  Calendar,
  Check,
  ChevronRight,
  Copy,
  Download,
  Edit2,
  ExternalLink,
  Info,
  MapPin,
  Printer,
  RefreshCw,
  Share2,
  Shuffle,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';

export const TournamentStudio: React.FC = () => {
  // Config state
  const [numTeams, setNumTeams] = useState<number>(16);
  const [numBids, setNumBids] = useState<number>(2);
  const [division, setDivision] = useState<DivisionType>('college_mens');
  const [activeView, setActiveView] = useState<'pools' | 'brackets' | 'roster'>('pools');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Custom team names state (map of index -> { name, cityOrSchool })
  const [customTeams, setCustomTeams] = useState<{ name: string; cityOrSchool?: string }[]>([]);

  // Initialize custom team names from division preset whenever division or numTeams change
  useEffect(() => {
    const preset = DIVISION_PRESETS[division] || DIVISION_PRESETS.college_mens;
    const initialList = [];
    for (let i = 0; i < numTeams; i++) {
      initialList.push(preset.defaultTeams[i] || { name: `Team ${i + 1}`, cityOrSchool: `Seed ${i + 1}` });
    }
    setCustomTeams(initialList);
  }, [division, numTeams]);

  // Load from URL hash if provided
  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash && hash.includes('tourney=')) {
        const payload = hash.split('tourney=')[1];
        const decoded = JSON.parse(decodeURIComponent(escape(atob(payload))));
        if (decoded.numTeams) setNumTeams(decoded.numTeams);
        if (decoded.numBids) setNumBids(decoded.numBids);
        if (decoded.division) setDivision(decoded.division);
        if (decoded.teams) setCustomTeams(decoded.teams);
      }
    } catch {
      // ignore invalid hash
    }
  }, []);

  // Build the complete tournament object
  const tournament: TournamentConfig = useMemo(() => {
    return buildTournament(numTeams, numBids, division, customTeams);
  }, [numTeams, numBids, division, customTeams]);

  // Update specific team name
  const handleUpdateTeamName = (index: number, newName: string, newCity?: string) => {
    const updated = [...customTeams];
    updated[index] = {
      name: newName,
      cityOrSchool: newCity !== undefined ? newCity : updated[index]?.cityOrSchool,
    };
    setCustomTeams(updated);
  };

  // Shuffle seeds randomly
  const handleShuffleTeams = () => {
    const shuffled = [...customTeams];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCustomTeams(shuffled);
  };

  // Reset to division defaults
  const handleResetTeams = () => {
    const preset = DIVISION_PRESETS[division] || DIVISION_PRESETS.college_mens;
    const list = [];
    for (let i = 0; i < numTeams; i++) {
      list.push(preset.defaultTeams[i] || { name: `Team ${i + 1}`, cityOrSchool: `Seed ${i + 1}` });
    }
    setCustomTeams(list);
  };

  // Generate shareable link
  const handleCopyShareLink = () => {
    const state = {
      numTeams,
      numBids,
      division,
      teams: customTeams,
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    const url = `${window.location.origin}${window.location.pathname}#tourney=${encoded}`;

    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // Trigger browser print for printable bracket
  const handlePrint = () => {
    window.print();
  };

  // Download CSV of Tournament Schedule
  const handleDownloadCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += `Tournament Name,"${tournament.name}"\n`;
    csvContent += `USAU Format,"${tournament.usauFormatName}"\n`;
    csvContent += `Teams,${tournament.numTeams},Bids,${tournament.numBids}\n\n`;

    csvContent += '--- POOL PLAY MATCHUPS ---\n';
    csvContent += 'Pool,Round,Team 1 (Seed),Team 2 (Seed),Time Slot,Field\n';

    tournament.pools.forEach((pool) => {
      pool.matchups.forEach((m) => {
        const t1 = tournament.teams.find((t) => t.seed === m.team1Seed)?.name || `Seed ${m.team1Seed}`;
        const t2 = tournament.teams.find((t) => t.seed === m.team2Seed)?.name || `Seed ${m.team2Seed}`;
        csvContent += `"${pool.name}",Round ${m.round},"${t1} (#${m.team1Seed})","${t2} (#${m.team2Seed})","${m.timeSlot || ''}","${m.field || ''}"\n`;
      });
    });

    csvContent += '\n--- BRACKET GAMES ---\n';
    csvContent += 'Bracket Type,Round,Game,Team 1,Team 2,Game To Go?,Advances To,Time,Field\n';

    tournament.bracketGames.forEach((g) => {
      csvContent += `"${g.bracketType}","${g.roundName}","Game ${g.gameNumber}","${g.team1Placeholder}","${g.team2Placeholder}","${g.isGameToGo ? 'YES - BID AWARD' : 'No'}","${g.winnerAdvancesTo || ''}","${g.timeSlot || ''}","${g.field || ''}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `USAU_Tournament_${numTeams}_Teams_${numBids}_Bids.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter games
  const champGames = tournament.bracketGames.filter((g) => g.bracketType === 'championship');
  const backdoorGames = tournament.bracketGames.filter((g) => g.bracketType === 'backdoor_bid');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Hidden print stylesheet container */}
      <div className="hidden print:block">
        <PrintableBracket config={tournament} />
      </div>

      {/* Screen Interface Header */}
      <div className="print:hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
              <Trophy className="w-3.5 h-3.5" />
              <span>Official USA Ultimate Tournament Formats Manual</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              USAU Tournament & Bid Bracket Generator
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Design tournament formats for any number of teams and bids (1 winner, 2 bids, 3 bids,
              4 bids). Auto-computes snake pools, round-robin schedules, and backdoor "Game-to-Go"
              elimination brackets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium transition shadow-sm active:scale-95"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-blue-400" />
                  <span>Copy Share Link</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition shadow-md shadow-blue-950 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium transition active:scale-95"
              title="Download CSV spreadsheet"
            >
              <Download className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </div>
        </div>

        {/* USAU Guidelines Link banner */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-300">{tournament.usauFormatName}</span>
          </div>
          <a
            href="https://usaultimate.org/resources/tournament-directors/formats/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold hover:underline"
          >
            <span>USAU Tournament Formats Manual (usaultimate.org)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Tournament Settings Controls Bar */}
      <div className="print:hidden bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bids Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              1. Bids at Stake (End Result)
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setNumBids(b)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center ${
                    numBids === b
                      ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400 font-black'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-sm">{b}</span>
                  <span className="text-[10px] font-medium uppercase">
                    {b === 1 ? 'Winner' : 'Bids'}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              {numBids === 1
                ? 'Single champion takes the lone qualifying bid.'
                : `${numBids} teams qualify via Championship & Backdoor Games-to-Go.`}
            </p>
          </div>

          {/* Number of Teams */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              2. Number of Teams
            </label>
            <select
              value={numTeams}
              onChange={(e) => setNumTeams(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value={4}>4 Teams (1 Pool of 4)</option>
              <option value={6}>6 Teams (2 Pools of 3)</option>
              <option value={8}>8 Teams (2 Pools of 4)</option>
              <option value={10}>10 Teams (2 Pools of 5)</option>
              <option value={12}>12 Teams (4 Pools of 3)</option>
              <option value={16}>16 Teams (Standard USAU 4 Pools of 4)</option>
              <option value={20}>20 Teams (4 Pools of 5)</option>
            </select>
            <p className="text-[11px] text-slate-500">
              Snake seeded into {tournament.pools.length} pool{tournament.pools.length > 1 ? 's' : ''}.
            </p>
          </div>

          {/* Division Preset */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              3. Division Preset
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value as DivisionType)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              {Object.entries(DIVISION_PRESETS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              Prepopulates realistic team names & schools.
            </p>
          </div>

          {/* Quick Roster Actions */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              4. Seeding & Roster Actions
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShuffleTeams}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                title="Shuffle Seeds Randomly"
              >
                <Shuffle className="w-3.5 h-3.5 text-slate-600" />
                <span>Shuffle Seeds</span>
              </button>
              <button
                type="button"
                onClick={handleResetTeams}
                className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                title="Reset to Preset Defaults"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Customizable below in the Editable Roster tab.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('pools')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeView === 'pools'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Pool Play & Schedule ({tournament.pools.length} Pools)</span>
            </button>

            <button
              onClick={() => setActiveView('brackets')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeView === 'brackets'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>
                Bracket & Games-to-Go ({tournament.bracketGames.length} Games)
              </span>
            </button>

            <button
              onClick={() => setActiveView('roster')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeView === 'roster'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Team Names ({tournament.teams.length})</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <Award className="w-4 h-4" />
            <span>{numBids} Bid{numBids > 1 ? 's' : ''} to Nationals/Regionals</span>
          </div>
        </div>
      </div>

      {/* VIEW 1: POOL PLAY & ROUND ROBIN SCHEDULE */}
      {activeView === 'pools' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Pool Play Structure & Seeding (Snake Distribution)</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Top teams advance to Championship Bracket
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tournament.pools.map((pool) => (
              <div
                key={pool.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-blue-400 transition"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                    {pool.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    {pool.teamSeeds.length} Teams
                  </span>
                </div>

                {/* Team Seeds List */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Seeded Teams
                  </span>
                  <div className="space-y-1">
                    {pool.teamSeeds.map((seed, idx) => {
                      const team = tournament.teams.find((t) => t.seed === seed);
                      return (
                        <div
                          key={seed}
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-150 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 font-bold font-mono flex items-center justify-center text-[11px]">
                              {seed}
                            </span>
                            <span className="font-semibold text-slate-800 truncate max-w-[140px]">
                              {team?.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Pool Pos #{idx + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Round Robin Matchups for this Pool */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Pool Schedule
                  </span>
                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {pool.matchups.map((m) => {
                      const t1 = tournament.teams.find((t) => t.seed === m.team1Seed);
                      const t2 = tournament.teams.find((t) => t.seed === m.team2Seed);
                      return (
                        <div
                          key={m.id}
                          className="p-2 rounded-lg bg-slate-50/70 border border-slate-200 text-[11px] space-y-0.5"
                        >
                          <div className="flex justify-between text-slate-500 font-mono text-[10px]">
                            <span>Round {m.round}</span>
                            <span>{m.timeSlot}</span>
                          </div>
                          <div className="flex items-center justify-between font-semibold text-slate-800">
                            <span className="truncate pr-1">
                              #{m.team1Seed} {t1?.name}
                            </span>
                            <span className="text-slate-400 text-[10px] font-normal">vs</span>
                            <span className="truncate pl-1 text-right">
                              #{m.team2Seed} {t2?.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: BRACKETS & GAMES-TO-GO */}
      {activeView === 'brackets' && (
        <div className="space-y-8">
          {/* Championship Bracket Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>Championship Bracket (Awards Bid #1)</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Standard USAU elimination bracket. The 1st place champion directly clinches Bid #1.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                1st Place Final = Bid #1 Game-to-Go
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {champGames.map((g) => (
                <div
                  key={g.id}
                  className={`border rounded-2xl p-4 shadow-sm transition space-y-3 bg-white ${
                    g.isGameToGo
                      ? 'border-2 border-amber-500 bg-amber-50/20 ring-1 ring-amber-400'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-800">{g.roundName}</span>
                    <span className="font-mono text-[11px]">{g.timeSlot}</span>
                  </div>

                  {/* Matchup Slots */}
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-800">
                      <span className="font-mono font-semibold">{g.team1Placeholder}</span>
                      <span className="text-[11px] text-slate-400 font-mono">Slot A</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-800">
                      <span className="font-mono font-semibold">{g.team2Placeholder}</span>
                      <span className="text-[11px] text-slate-400 font-mono">Slot B</span>
                    </div>
                  </div>

                  {/* Advances to indicator */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="text-slate-500 truncate max-w-[180px]">
                      Winner: <span className="font-semibold text-emerald-600">{g.winnerAdvancesTo}</span>
                    </div>
                    <div className="text-slate-400 text-right truncate">
                      Loser: {g.loserAdvancesTo}
                    </div>
                  </div>

                  {/* Golden Game-to-Go Banner */}
                  {g.isGameToGo && (
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs py-1.5 px-3 rounded-xl text-center shadow-md flex items-center justify-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>OFFICIAL GAME-TO-GO: QUALIFIES FOR BID #1</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Backdoor Elimination Bracket (Games-to-Go for 2, 3, or 4 Bids) */}
          {backdoorGames.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span>
                      Backdoor Bracket & Games-to-Go (Bids 2 to {numBids})
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    USAU Modified Double Elimination playback format. Loser of championship final drops
                    to play winner of backdoor bracket.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {numBids - 1} Additional Bid{numBids - 1 > 1 ? 's' : ''} Awarded Here
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {backdoorGames.map((g) => (
                  <div
                    key={g.id}
                    className={`border rounded-2xl p-4 shadow-sm transition space-y-3 bg-white ${
                      g.isGameToGo
                        ? 'border-2 border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-400'
                        : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-800">{g.roundName}</span>
                      <span className="font-mono text-[11px]">{g.timeSlot}</span>
                    </div>

                    {/* Matchup Slots */}
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-800">
                        <span className="font-mono font-semibold">{g.team1Placeholder}</span>
                        <span className="text-[11px] text-slate-400 font-mono">Team 1</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-800">
                        <span className="font-mono font-semibold">{g.team2Placeholder}</span>
                        <span className="text-[11px] text-slate-400 font-mono">Team 2</span>
                      </div>
                    </div>

                    {/* Advances to indicator */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <div className="text-slate-500 truncate max-w-[180px]">
                        Winner: <span className="font-semibold text-emerald-600">{g.winnerAdvancesTo}</span>
                      </div>
                      <div className="text-slate-400 text-right truncate">
                        Loser: {g.loserAdvancesTo}
                      </div>
                    </div>

                    {/* Green Game-to-Go Banner for Backdoor Bids */}
                    {g.isGameToGo && (
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs py-1.5 px-3 rounded-xl text-center shadow-md flex items-center justify-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>QUALIFIES FOR BID #{g.bidNumber} (GAME-TO-GO)</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: EDITABLE TEAM ROSTER */}
      {activeView === 'roster' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-600" />
                <span>Customize Team Names & Seeds ({numTeams} Teams)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Rename any team, school, or city. Seeding automatically maps into pools and bracket slots.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShuffleTeams}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition flex items-center gap-1"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Randomize</span>
              </button>
              <button
                type="button"
                onClick={handleResetTeams}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {tournament.teams.map((team, idx) => (
                <div
                  key={team.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white space-y-2 transition focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600 font-mono">Seed #{team.seed}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {tournament.pools.find((p) => p.teamSeeds.includes(team.seed))?.name}
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">
                      Team Name
                    </label>
                    <input
                      type="text"
                      value={customTeams[idx]?.name || ''}
                      onChange={(e) => handleUpdateTeamName(idx, e.target.value)}
                      placeholder={`Team ${team.seed}`}
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent border-b border-slate-300 focus:outline-none focus:border-blue-600 py-0.5"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">
                      City / College
                    </label>
                    <input
                      type="text"
                      value={customTeams[idx]?.cityOrSchool || ''}
                      onChange={(e) =>
                        handleUpdateTeamName(idx, customTeams[idx]?.name || '', e.target.value)
                      }
                      placeholder="City or School"
                      className="w-full text-[11px] text-slate-500 bg-transparent border-b border-slate-200 focus:outline-none focus:border-blue-600 py-0.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
