import React from 'react';
import { TournamentConfig } from '../types/tournament';
import { Award, Trophy } from 'lucide-react';

interface PrintableBracketProps {
  config: TournamentConfig;
}

export const PrintableBracket: React.FC<PrintableBracketProps> = ({ config }) => {
  const getTeamNameBySeed = (seed: number) => {
    const t = config.teams.find((team) => team.seed === seed);
    return t ? `#${t.seed} ${t.name}` : `Seed #${seed}`;
  };

  const champGames = config.bracketGames.filter((g) => g.bracketType === 'championship');
  const backdoorGames = config.bracketGames.filter((g) => g.bracketType === 'backdoor_bid');

  return (
    <div className="print-sheet bg-white text-black p-6 font-sans">
      {/* Print Header */}
      <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-black">
            {config.name}
          </h1>
          <p className="text-xs text-neutral-600 mt-1 font-medium">
            Official USA Ultimate Tournament Format • {config.usauFormatName}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            Total Teams: {config.numTeams} | Qualifying Bids: {config.numBids} | Source:{' '}
            <span className="font-mono text-[10px]">play.usaultimate.org</span>
          </p>
        </div>
        <div className="text-right border border-black px-3 py-1.5 rounded">
          <div className="text-xs font-bold uppercase">Bids at Stake</div>
          <div className="text-lg font-black">{config.numBids} BID{config.numBids > 1 ? 'S' : ''}</div>
        </div>
      </div>

      {/* Pools Table (Side by Side) */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">
          Pool Play Seeding & Schedule
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {config.pools.map((pool) => (
            <div key={pool.id} className="border border-neutral-400 rounded p-2.5 bg-neutral-50/50">
              <h3 className="font-bold text-xs uppercase border-b border-neutral-300 pb-1 mb-1.5">
                {pool.name}
              </h3>
              <ul className="text-xs space-y-1 mb-2">
                {pool.teamSeeds.map((seed) => (
                  <li key={seed} className="flex justify-between font-mono">
                    <span className="truncate pr-1">{getTeamNameBySeed(seed)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] text-neutral-500 border-t border-neutral-200 pt-1">
                {pool.matchups.length} Round-Robin Matches
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Championship Bracket Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between border-b border-black pb-1 mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4" />
            <span>Championship Bracket (Bid #1)</span>
          </h2>
          <span className="text-xs font-mono">Winner takes Bid #1</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {champGames.map((g) => (
            <div
              key={g.id}
              className={`border p-2.5 rounded text-xs ${
                g.isGameToGo ? 'border-2 border-black bg-neutral-100 font-semibold' : 'border-neutral-300'
              }`}
            >
              <div className="flex justify-between items-center mb-1.5 text-[10px] text-neutral-600 font-bold uppercase">
                <span>{g.roundName}</span>
                <span>{g.timeSlot}</span>
              </div>
              <div className="space-y-1 font-mono">
                <div className="border-b border-neutral-200 pb-1 flex justify-between">
                  <span>{g.team1Placeholder}</span>
                  <span className="w-6 border-b border-neutral-400"></span>
                </div>
                <div className="pt-0.5 flex justify-between">
                  <span>{g.team2Placeholder}</span>
                  <span className="w-6 border-b border-neutral-400"></span>
                </div>
              </div>
              {g.isGameToGo && (
                <div className="mt-2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded text-center font-bold">
                  ★ GAME-TO-GO: QUALIFIES FOR BID #1
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Backdoor Bracket / Bids 2, 3, 4 */}
      {backdoorGames.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between border-b border-black pb-1 mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Backdoor Bracket / Additional Bids ({config.numBids - 1} Remaining)</span>
            </h2>
            <span className="text-xs font-mono">Modified Double Elimination</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {backdoorGames.map((g) => (
              <div
                key={g.id}
                className={`border p-2.5 rounded text-xs ${
                  g.isGameToGo ? 'border-2 border-amber-600 bg-amber-50/50' : 'border-neutral-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1.5 text-[10px] text-neutral-600 font-bold uppercase">
                  <span>{g.roundName}</span>
                  <span>{g.timeSlot}</span>
                </div>
                <div className="space-y-1 font-mono">
                  <div className="border-b border-neutral-200 pb-1 flex justify-between">
                    <span>{g.team1Placeholder}</span>
                    <span className="w-6 border-b border-neutral-400"></span>
                  </div>
                  <div className="pt-0.5 flex justify-between">
                    <span>{g.team2Placeholder}</span>
                    <span className="w-6 border-b border-neutral-400"></span>
                  </div>
                </div>
                {g.isGameToGo && (
                  <div className="mt-2 text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded text-center font-bold">
                    ★ GAME-TO-GO: QUALIFIES FOR BID #{g.bidNumber}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="border-t border-neutral-300 pt-3 text-[10px] text-neutral-500 flex justify-between items-center">
        <span>USAU Tournament Formats Manual: usaultimate.org/resources/tournament-directors/formats/</span>
        <span>Generated via USAU Ultimate Studio</span>
      </div>
    </div>
  );
};
