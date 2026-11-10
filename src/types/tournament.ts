/**
 * Types for USA Ultimate Tournament & Bracket Generator
 */

export type DivisionType = 'college_mens' | 'college_womens' | 'club_open' | 'club_womens' | 'club_mixed' | 'custom';

export interface Team {
  id: string;
  seed: number;
  name: string;
  cityOrSchool?: string;
  poolId?: string;
}

export interface PoolMatchup {
  id: string;
  round: number;
  team1Seed: number;
  team2Seed: number;
  timeSlot?: string;
  field?: string;
  score1?: number;
  score2?: number;
}

export interface Pool {
  id: string;
  name: string; // e.g. "Pool A"
  teamSeeds: number[];
  matchups: PoolMatchup[];
}

export interface BracketGame {
  id: string;
  bracketType: 'championship' | 'backdoor_bid' | 'consolation';
  roundName: string; // e.g., "Quarterfinals", "Semifinals", "1st Place Final", "Game-to-Go (Bid 2)"
  gameNumber: number;
  team1Placeholder: string; // e.g., "Pool A #1" or "Winner G1"
  team2Placeholder: string; // e.g., "Pool B #2" or "Loser G4"
  sourceTeam1?: { fromGameId?: string; winOrLose?: 'win' | 'lose'; poolRank?: string };
  sourceTeam2?: { fromGameId?: string; winOrLose?: 'win' | 'lose'; poolRank?: string };
  isGameToGo?: boolean;
  bidNumber?: number; // e.g., 1, 2, 3
  winnerAdvancesTo?: string;
  loserAdvancesTo?: string;
  field?: string;
  timeSlot?: string;
}

export interface TournamentConfig {
  name: string;
  numTeams: number; // 4, 6, 8, 10, 12, 16, 20
  numBids: number; // 1, 2, 3, 4
  division: DivisionType;
  teams: Team[];
  pools: Pool[];
  bracketGames: BracketGame[];
  usauFormatName: string;
  usauManualUrl: string;
}
