import {
  BracketGame,
  DivisionType,
  Pool,
  PoolMatchup,
  Team,
  TournamentConfig,
} from '../types/tournament';

export const DIVISION_PRESETS: Record<
  DivisionType,
  { label: string; defaultTeams: { name: string; cityOrSchool: string }[] }
> = {
  college_mens: {
    label: "Men's College Division",
    defaultTeams: [
      { name: 'Darkside', cityOrSchool: 'UNC Chapel Hill' },
      { name: 'CUT', cityOrSchool: 'Carleton College' },
      { name: 'Brownian Motion', cityOrSchool: 'Brown University' },
      { name: 'Ego', cityOrSchool: 'University of Oregon' },
      { name: 'Mamabird', cityOrSchool: 'Colorado Boulder' },
      { name: 'Hodags', cityOrSchool: 'Wisconsin Madison' },
      { name: 'Pittsburgh Encline', cityOrSchool: 'Univ of Pittsburgh' },
      { name: 'Cal Ursa Major', cityOrSchool: 'UC Berkeley' },
      { name: 'Texas TUFF', cityOrSchool: 'Univ of Texas' },
      { name: 'Georgia Jojah', cityOrSchool: 'Univ of Georgia' },
      { name: 'Washington Sundodgers', cityOrSchool: 'Univ of Washington' },
      { name: 'Michigan MagnUM', cityOrSchool: 'Univ of Michigan' },
      { name: 'SLOcore', cityOrSchool: 'Cal Poly SLO' },
      { name: 'Minnesota Grey Duck', cityOrSchool: 'Univ of Minnesota' },
      { name: 'UCLA Smaug', cityOrSchool: 'UCLA' },
      { name: 'Northeastern Huskies', cityOrSchool: 'Northeastern' },
      { name: 'NC State Alpha', cityOrSchool: 'NC State' },
      { name: 'Ohio State Leadbelly', cityOrSchool: 'Ohio State' },
      { name: 'Tufts E-Men', cityOrSchool: 'Tufts University' },
      { name: 'Stanford Bloodthirsty', cityOrSchool: 'Stanford Univ' },
    ],
  },
  college_womens: {
    label: "Women's College Division",
    defaultTeams: [
      { name: 'Pleiades', cityOrSchool: 'UNC Chapel Hill' },
      { name: 'Syzygy', cityOrSchool: 'Carleton College' },
      { name: 'Colorado Quandary', cityOrSchool: 'Colorado Boulder' },
      { name: 'Fugue', cityOrSchool: 'University of Oregon' },
      { name: 'British Columbia Thunderbirds', cityOrSchool: 'UBC' },
      { name: 'Vermont Ruckus', cityOrSchool: 'Univ of Vermont' },
      { name: 'Stanford Superfly', cityOrSchool: 'Stanford Univ' },
      { name: 'Washington Element', cityOrSchool: 'Univ of Washington' },
      { name: 'Tufts E-Wo', cityOrSchool: 'Tufts University' },
      { name: 'UCSB Burning Skirts', cityOrSchool: 'UC Santa Barbara' },
      { name: 'Pittsburgh Danger', cityOrSchool: 'Univ of Pittsburgh' },
      { name: 'Virginia Hydra', cityOrSchool: 'Univ of Virginia' },
      { name: 'Georgia Athena', cityOrSchool: 'Univ of Georgia' },
      { name: 'Michigan Flywheel', cityOrSchool: 'Univ of Michigan' },
      { name: 'UC Davis Rogue', cityOrSchool: 'UC Davis' },
      { name: 'Texas Melee', cityOrSchool: 'Univ of Texas' },
      { name: 'Western Washington Chaos', cityOrSchool: 'Western Wash.' },
      { name: 'Wisconsin Bella Donna', cityOrSchool: 'Univ of Wisconsin' },
      { name: 'Brown Shiver', cityOrSchool: 'Brown University' },
      { name: 'Cal Pie Queens', cityOrSchool: 'UC Berkeley' },
    ],
  },
  club_open: {
    label: "Club Men's / Open Division",
    defaultTeams: [
      { name: 'Truck Stop', cityOrSchool: 'Washington DC' },
      { name: 'Ring of Fire', cityOrSchool: 'Raleigh, NC' },
      { name: 'PoNY', cityOrSchool: 'New York, NY' },
      { name: 'Revolver', cityOrSchool: 'San Francisco, CA' },
      { name: 'Sockeye', cityOrSchool: 'Seattle, WA' },
      { name: 'Machine', cityOrSchool: 'Chicago, IL' },
      { name: 'Johnny Bravo', cityOrSchool: 'Denver, CO' },
      { name: 'DiG', cityOrSchool: 'Boston, MA' },
      { name: 'Chain Lightning', cityOrSchool: 'Atlanta, GA' },
      { name: 'Sub Zero', cityOrSchool: 'Minneapolis, MN' },
      { name: 'GOAT', cityOrSchool: 'Toronto, ON' },
      { name: 'Condors', cityOrSchool: 'Southern California' },
      { name: 'Temper', cityOrSchool: 'Pittsburgh, PA' },
      { name: 'Mad Men', cityOrSchool: 'Madison, WI' },
      { name: 'Sprout', cityOrSchool: 'Amherst, MA' },
      { name: 'Tanasi', cityOrSchool: 'Nashville, TN' },
      { name: 'Incline', cityOrSchool: 'Denver, CO' },
      { name: 'Blueprint', cityOrSchool: 'New York, NY' },
      { name: 'Vault', cityOrSchool: 'Virginia' },
      { name: 'Lantern', cityOrSchool: 'Boston, MA' },
    ],
  },
  club_womens: {
    label: "Club Women's Division",
    defaultTeams: [
      { name: 'Brute Squad', cityOrSchool: 'Boston, MA' },
      { name: 'Fury', cityOrSchool: 'San Francisco, CA' },
      { name: 'Riot', cityOrSchool: 'Seattle, WA' },
      { name: 'Scandal', cityOrSchool: 'Washington DC' },
      { name: 'Molly Brown', cityOrSchool: 'Denver, CO' },
      { name: 'Phoenix', cityOrSchool: 'Raleigh, NC' },
      { name: '6ixers', cityOrSchool: 'Toronto, ON' },
      { name: 'Traffic', cityOrSchool: 'Vancouver, BC' },
      { name: 'Nemesis', cityOrSchool: 'Chicago, IL' },
      { name: 'Nightlock', cityOrSchool: 'San Francisco, CA' },
      { name: 'Schwa', cityOrSchool: 'Portland, OR' },
      { name: 'Pop', cityOrSchool: 'Minneapolis, MN' },
      { name: 'Siege', cityOrSchool: 'Boston, MA' },
      { name: 'Grit', cityOrSchool: 'Washington DC' },
      { name: 'Ozone', cityOrSchool: 'Atlanta, GA' },
      { name: 'Wildfire', cityOrSchool: 'San Diego, CA' },
      { name: 'Parcha', cityOrSchool: 'Washington DC' },
      { name: 'Iris', cityOrSchool: 'Quebec' },
      { name: 'Tabby Rosa', cityOrSchool: 'Gainesville, FL' },
      { name: 'Heist', cityOrSchool: 'Madison, WI' },
    ],
  },
  club_mixed: {
    label: 'Club Mixed Division',
    defaultTeams: [
      { name: 'BFG', cityOrSchool: 'Seattle, WA' },
      { name: 'Mixtape', cityOrSchool: 'Seattle, WA' },
      { name: 'AMP', cityOrSchool: 'Philadelphia, PA' },
      { name: 'Drag’n Thrust', cityOrSchool: 'Minneapolis, MN' },
      { name: 'hybrid', cityOrSchool: 'Ann Arbor, MI' },
      { name: 'Lawless', cityOrSchool: 'Tempe, AZ' },
      { name: 'Space Heater', cityOrSchool: 'Washington DC' },
      { name: 'Sprocket', cityOrSchool: 'Boston, MA' },
      { name: 'Slow White', cityOrSchool: 'Boston, MA' },
      { name: 'Toro', cityOrSchool: 'Raleigh, NC' },
      { name: 'Public Enemy', cityOrSchool: 'Dallas, TX' },
      { name: 'Lochsa', cityOrSchool: 'Boise, ID' },
      { name: 'Mischief', cityOrSchool: 'San Francisco, CA' },
      { name: 'Polar Bears', cityOrSchool: 'San Francisco, CA' },
      { name: 'Shame.', cityOrSchool: 'Fort Collins, CO' },
      { name: 'Red Flag', cityOrSchool: 'Vancouver, BC' },
      { name: 'Cocktails', cityOrSchool: 'Cleveland, OH' },
      { name: 'XIST', cityOrSchool: 'New York, NY' },
      { name: '‘Shine', cityOrSchool: 'Nashville, TN' },
      { name: 'Alloy', cityOrSchool: 'Pittsburgh, PA' },
    ],
  },
  custom: {
    label: 'Custom / Club League',
    defaultTeams: [
      { name: 'Alpha Squad', cityOrSchool: 'Team 1' },
      { name: 'Beta Flyers', cityOrSchool: 'Team 2' },
      { name: 'Gamma Disc', cityOrSchool: 'Team 3' },
      { name: 'Delta Force', cityOrSchool: 'Team 4' },
      { name: 'Epsilon Elite', cityOrSchool: 'Team 5' },
      { name: 'Zeta Wind', cityOrSchool: 'Team 6' },
      { name: 'Eta Storm', cityOrSchool: 'Team 7' },
      { name: 'Theta Surge', cityOrSchool: 'Team 8' },
      { name: 'Iota Blaze', cityOrSchool: 'Team 9' },
      { name: 'Kappa Hammer', cityOrSchool: 'Team 10' },
      { name: 'Lambda Scoober', cityOrSchool: 'Team 11' },
      { name: 'Mu Layout', cityOrSchool: 'Team 12' },
      { name: 'Nu Sky', cityOrSchool: 'Team 13' },
      { name: 'Xi Huck', cityOrSchool: 'Team 14' },
      { name: 'Omicron Blade', cityOrSchool: 'Team 15' },
      { name: 'Pi Callahan', cityOrSchool: 'Team 16' },
      { name: 'Rho Breakmark', cityOrSchool: 'Team 17' },
      { name: 'Sigma Force', cityOrSchool: 'Team 18' },
      { name: 'Tau Vortex', cityOrSchool: 'Team 19' },
      { name: 'Upsilon Apex', cityOrSchool: 'Team 20' },
    ],
  },
};

/**
 * Generate standard USAU Snake Pools
 */
export function generatePools(teams: Team[], numPools: number): Pool[] {
  const pools: Pool[] = [];
  const poolLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  for (let i = 0; i < numPools; i++) {
    pools.push({
      id: `pool_${poolLetters[i]}`,
      name: `Pool ${poolLetters[i]}`,
      teamSeeds: [],
      matchups: [],
    });
  }

  // Snake seeding algorithm
  // E.g., for 4 pools:
  // Round 1: 1 -> A, 2 -> B, 3 -> C, 4 -> D
  // Round 2: 5 -> D, 6 -> C, 7 -> B, 8 -> A
  // Round 3: 9 -> A, 10 -> B, 11 -> C, 12 -> D
  // Round 4: 13 -> D, 14 -> C, 15 -> B, 16 -> A
  let currentPoolIdx = 0;
  let ascending = true;

  for (let i = 0; i < teams.length; i++) {
    const seed = teams[i].seed;
    pools[currentPoolIdx].teamSeeds.push(seed);

    if (ascending) {
      if (currentPoolIdx === numPools - 1) {
        ascending = false;
      } else {
        currentPoolIdx++;
      }
    } else {
      if (currentPoolIdx === 0) {
        ascending = true;
      } else {
        currentPoolIdx--;
      }
    }
  }

  // Generate Round Robin matchups for each pool
  pools.forEach((pool) => {
    pool.matchups = generateRoundRobinMatchups(pool.id, pool.teamSeeds);
  });

  return pools;
}

/**
 * Generate standard USAU Round Robin matchups for a pool of seeds
 */
function generateRoundRobinMatchups(poolId: string, seeds: number[]): PoolMatchup[] {
  const matchups: PoolMatchup[] = [];
  const count = seeds.length;

  if (count === 3) {
    // 3 teams: 1v3, 2v3, 1v2
    matchups.push(
      { id: `${poolId}_m1`, round: 1, team1Seed: seeds[0], team2Seed: seeds[2], timeSlot: 'Round 1 (9:00 AM)', field: 'Field 1' },
      { id: `${poolId}_m2`, round: 2, team1Seed: seeds[1], team2Seed: seeds[2], timeSlot: 'Round 2 (11:00 AM)', field: 'Field 1' },
      { id: `${poolId}_m3`, round: 3, team1Seed: seeds[0], team2Seed: seeds[1], timeSlot: 'Round 3 (1:00 PM)', field: 'Field 1' }
    );
  } else if (count === 4) {
    // 4 teams (Standard USAU):
    // Round 1: 1v4, 2v3
    // Round 2: 1v3, 2v4
    // Round 3: 1v2, 3v4
    matchups.push(
      { id: `${poolId}_m1`, round: 1, team1Seed: seeds[0], team2Seed: seeds[3], timeSlot: 'Round 1 (9:00 AM)', field: 'Field A' },
      { id: `${poolId}_m2`, round: 1, team1Seed: seeds[1], team2Seed: seeds[2], timeSlot: 'Round 1 (9:00 AM)', field: 'Field B' },
      { id: `${poolId}_m3`, round: 2, team1Seed: seeds[0], team2Seed: seeds[2], timeSlot: 'Round 2 (11:15 AM)', field: 'Field A' },
      { id: `${poolId}_m4`, round: 2, team1Seed: seeds[1], team2Seed: seeds[3], timeSlot: 'Round 2 (11:15 AM)', field: 'Field B' },
      { id: `${poolId}_m5`, round: 3, team1Seed: seeds[0], team2Seed: seeds[1], timeSlot: 'Round 3 (1:30 PM)', field: 'Field A' },
      { id: `${poolId}_m6`, round: 3, team1Seed: seeds[2], team2Seed: seeds[3], timeSlot: 'Round 3 (1:30 PM)', field: 'Field B' }
    );
  } else if (count === 5) {
    // 5 teams standard USAU schedule
    matchups.push(
      { id: `${poolId}_m1`, round: 1, team1Seed: seeds[1], team2Seed: seeds[4], timeSlot: 'Round 1 (9:00 AM)', field: 'Field 1' },
      { id: `${poolId}_m2`, round: 1, team1Seed: seeds[2], team2Seed: seeds[3], timeSlot: 'Round 1 (9:00 AM)', field: 'Field 2' },
      { id: `${poolId}_m3`, round: 2, team1Seed: seeds[0], team2Seed: seeds[3], timeSlot: 'Round 2 (10:45 AM)', field: 'Field 1' },
      { id: `${poolId}_m4`, round: 2, team1Seed: seeds[1], team2Seed: seeds[2], timeSlot: 'Round 2 (10:45 AM)', field: 'Field 2' },
      { id: `${poolId}_m5`, round: 3, team1Seed: seeds[0], team2Seed: seeds[4], timeSlot: 'Round 3 (12:30 PM)', field: 'Field 1' },
      { id: `${poolId}_m6`, round: 3, team1Seed: seeds[1], team2Seed: seeds[3], timeSlot: 'Round 3 (12:30 PM)', field: 'Field 2' },
      { id: `${poolId}_m7`, round: 4, team1Seed: seeds[0], team2Seed: seeds[2], timeSlot: 'Round 4 (2:15 PM)', field: 'Field 1' },
      { id: `${poolId}_m8`, round: 4, team1Seed: seeds[3], team2Seed: seeds[4], timeSlot: 'Round 4 (2:15 PM)', field: 'Field 2' },
      { id: `${poolId}_m9`, round: 5, team1Seed: seeds[0], team2Seed: seeds[1], timeSlot: 'Round 5 (4:00 PM)', field: 'Field 1' },
      { id: `${poolId}_m10`, round: 5, team1Seed: seeds[2], team2Seed: seeds[4], timeSlot: 'Round 5 (4:00 PM)', field: 'Field 2' }
    );
  } else {
    // Fallback round-robin for arbitrary count
    let matchCounter = 1;
    for (let r = 0; r < count; r++) {
      for (let s = r + 1; s < count; s++) {
        matchups.push({
          id: `${poolId}_m${matchCounter++}`,
          round: Math.floor(matchCounter / 2) + 1,
          team1Seed: seeds[r],
          team2Seed: seeds[s],
          timeSlot: `Match ${matchCounter}`,
        });
      }
    }
  }

  return matchups;
}

/**
 * Generate USAU Standard Bracket Games according to number of teams and bids
 */
export function generateBracketGames(
  numTeams: number,
  numBids: number,
  pools: Pool[]
): BracketGame[] {
  const games: BracketGame[] = [];

  // Helper labels
  const pA = pools[0]?.name || 'Pool A';
  const pB = pools[1]?.name || 'Pool B';
  const pC = pools[2]?.name || 'Pool C';
  const pD = pools[3]?.name || 'Pool D';

  if (numTeams === 4) {
    // 4 teams: 1 pool -> Semis or Final
    games.push(
      {
        id: 'g1',
        bracketType: 'championship',
        roundName: '1st Place Final (Bid 1)',
        gameNumber: 1,
        team1Placeholder: `${pA} #1`,
        team2Placeholder: `${pA} #2`,
        isGameToGo: true,
        bidNumber: 1,
        winnerAdvancesTo: 'Tournament Champion (Bid #1)',
        loserAdvancesTo: numBids >= 2 ? 'Game-to-Go (Bid 2)' : '2nd Place',
        timeSlot: 'Sunday 1:00 PM',
        field: 'Stadium Field',
      },
      {
        id: 'g2',
        bracketType: 'championship',
        roundName: '3rd Place Match',
        gameNumber: 2,
        team1Placeholder: `${pA} #3`,
        team2Placeholder: `${pA} #4`,
        isGameToGo: false,
        winnerAdvancesTo: numBids >= 2 ? 'Backdoor Playback' : '3rd Place',
        timeSlot: 'Sunday 11:00 AM',
        field: 'Field 2',
      }
    );

    if (numBids >= 2) {
      games.push({
        id: 'g3',
        bracketType: 'backdoor_bid',
        roundName: 'Game-to-Go (Bid 2)',
        gameNumber: 3,
        team1Placeholder: 'Loser 1st Place Final',
        team2Placeholder: 'Winner 3rd Place Match',
        isGameToGo: true,
        bidNumber: 2,
        winnerAdvancesTo: 'Qualifies for Regionals/Nationals (Bid #2)',
        loserAdvancesTo: 'Eliminated (3rd Place)',
        timeSlot: 'Sunday 3:30 PM',
        field: 'Stadium Field',
      });
    }
  } else if (numTeams === 6) {
    // 6 teams: 2 pools of 3 -> Semis, Final, 2nd Place Game-to-Go
    games.push(
      {
        id: 'c_semi1',
        bracketType: 'championship',
        roundName: 'Semifinal 1',
        gameNumber: 1,
        team1Placeholder: `${pA} #1`,
        team2Placeholder: `${pB} #2`,
        winnerAdvancesTo: 'Championship Final',
        loserAdvancesTo: 'Backdoor Semifinal',
        timeSlot: 'Sunday 9:00 AM',
        field: 'Field 1',
      },
      {
        id: 'c_semi2',
        bracketType: 'championship',
        roundName: 'Semifinal 2',
        gameNumber: 2,
        team1Placeholder: `${pB} #1`,
        team2Placeholder: `${pA} #2`,
        winnerAdvancesTo: 'Championship Final',
        loserAdvancesTo: 'Backdoor Semifinal',
        timeSlot: 'Sunday 9:00 AM',
        field: 'Field 2',
      },
      {
        id: 'c_final',
        bracketType: 'championship',
        roundName: '1st Place Championship (Bid 1)',
        gameNumber: 3,
        team1Placeholder: 'Winner Semifinal 1',
        team2Placeholder: 'Winner Semifinal 2',
        isGameToGo: true,
        bidNumber: 1,
        winnerAdvancesTo: 'Champion (Bid #1)',
        loserAdvancesTo: numBids >= 2 ? 'Game-to-Go (Bid 2)' : '2nd Place',
        timeSlot: 'Sunday 1:00 PM',
        field: 'Stadium Field',
      }
    );

    if (numBids >= 2) {
      games.push(
        {
          id: 'b_semi',
          bracketType: 'backdoor_bid',
          roundName: 'Backdoor Semifinal',
          gameNumber: 4,
          team1Placeholder: 'Loser Semifinal 1',
          team2Placeholder: 'Loser Semifinal 2',
          winnerAdvancesTo: 'Game-to-Go (Bid 2)',
          loserAdvancesTo: '4th Place',
          timeSlot: 'Sunday 11:30 AM',
          field: 'Field 1',
        },
        {
          id: 'b_g2g',
          bracketType: 'backdoor_bid',
          roundName: 'Game-to-Go (Bid 2)',
          gameNumber: 5,
          team1Placeholder: 'Loser Championship Final',
          team2Placeholder: 'Winner Backdoor Semifinal',
          isGameToGo: true,
          bidNumber: 2,
          winnerAdvancesTo: 'Bid #2 Qualifier',
          loserAdvancesTo: '3rd Place',
          timeSlot: 'Sunday 3:30 PM',
          field: 'Stadium Field',
        }
      );
    }
  } else if (numTeams === 8) {
    // 8 teams: 2 pools of 4 -> Semifinals (A1 vs B2, B1 vs A2) + Quarters / Backdoor
    games.push(
      {
        id: 'c_semi1',
        bracketType: 'championship',
        roundName: 'Championship Semifinal 1',
        gameNumber: 1,
        team1Placeholder: `${pA} #1`,
        team2Placeholder: `${pB} #2`,
        winnerAdvancesTo: '1st Place Final',
        loserAdvancesTo: 'Backdoor Semifinal A',
        timeSlot: 'Sunday 9:00 AM',
        field: 'Field 1',
      },
      {
        id: 'c_semi2',
        bracketType: 'championship',
        roundName: 'Championship Semifinal 2',
        gameNumber: 2,
        team1Placeholder: `${pB} #1`,
        team2Placeholder: `${pA} #2`,
        winnerAdvancesTo: '1st Place Final',
        loserAdvancesTo: 'Backdoor Semifinal B',
        timeSlot: 'Sunday 9:00 AM',
        field: 'Field 2',
      },
      {
        id: 'c_final',
        bracketType: 'championship',
        roundName: '1st Place Final (Bid 1)',
        gameNumber: 3,
        team1Placeholder: 'Winner Semifinal 1',
        team2Placeholder: 'Winner Semifinal 2',
        isGameToGo: true,
        bidNumber: 1,
        winnerAdvancesTo: 'Champion (Bid #1)',
        loserAdvancesTo: numBids >= 2 ? 'Game-to-Go (Bid 2)' : '2nd Place',
        timeSlot: 'Sunday 1:00 PM',
        field: 'Stadium Field',
      }
    );

    // Backdoor for 2 Bids or 3 Bids
    if (numBids >= 2) {
      games.push(
        {
          id: 'b_quarter1',
          bracketType: 'backdoor_bid',
          roundName: 'Backdoor Quarter 1',
          gameNumber: 4,
          team1Placeholder: `${pA} #3`,
          team2Placeholder: `${pB} #4`,
          winnerAdvancesTo: 'Backdoor Semifinal A',
          loserAdvancesTo: '7th Place Match',
          timeSlot: 'Sunday 9:00 AM',
          field: 'Field 3',
        },
        {
          id: 'b_quarter2',
          bracketType: 'backdoor_bid',
          roundName: 'Backdoor Quarter 2',
          gameNumber: 5,
          team1Placeholder: `${pB} #3`,
          team2Placeholder: `${pA} #4`,
          winnerAdvancesTo: 'Backdoor Semifinal B',
          loserAdvancesTo: '7th Place Match',
          timeSlot: 'Sunday 9:00 AM',
          field: 'Field 4',
        },
        {
          id: 'b_semi1',
          bracketType: 'backdoor_bid',
          roundName: 'Backdoor Semifinal A',
          gameNumber: 6,
          team1Placeholder: 'Loser Championship Semi 1',
          team2Placeholder: 'Winner Backdoor Quarter 1',
          winnerAdvancesTo: 'Backdoor Final',
          loserAdvancesTo: '5th Place Playback',
          timeSlot: 'Sunday 11:15 AM',
          field: 'Field 2',
        },
        {
          id: 'b_semi2',
          bracketType: 'backdoor_bid',
          roundName: 'Backdoor Semifinal B',
          gameNumber: 7,
          team1Placeholder: 'Loser Championship Semi 2',
          team2Placeholder: 'Winner Backdoor Quarter 2',
          winnerAdvancesTo: 'Backdoor Final',
          loserAdvancesTo: '5th Place Playback',
          timeSlot: 'Sunday 11:15 AM',
          field: 'Field 3',
        },
        {
          id: 'b_final',
          bracketType: 'backdoor_bid',
          roundName: 'Backdoor Final',
          gameNumber: 8,
          team1Placeholder: 'Winner Backdoor Semi A',
          team2Placeholder: 'Winner Backdoor Semi B',
          winnerAdvancesTo: 'Game-to-Go (Bid 2)',
          loserAdvancesTo: numBids >= 3 ? 'Game-to-Go (Bid 3)' : '4th Place',
          timeSlot: 'Sunday 1:15 PM',
          field: 'Field 2',
        },
        {
          id: 'b_g2g_bid2',
          bracketType: 'backdoor_bid',
          roundName: 'Game-to-Go (Bid 2)',
          gameNumber: 9,
          team1Placeholder: 'Loser 1st Place Final',
          team2Placeholder: 'Winner Backdoor Final',
          isGameToGo: true,
          bidNumber: 2,
          winnerAdvancesTo: 'Nationals/Regionals Qualifier (Bid #2)',
          loserAdvancesTo: numBids >= 3 ? 'Game-to-Go (Bid 3)' : '3rd Place',
          timeSlot: 'Sunday 3:30 PM',
          field: 'Stadium Field',
        }
      );
    }

    if (numBids >= 3) {
      games.push({
        id: 'b_g2g_bid3',
        bracketType: 'backdoor_bid',
        roundName: 'Game-to-Go (Bid 3)',
        gameNumber: 10,
        team1Placeholder: 'Loser Game-to-Go (Bid 2)',
        team2Placeholder: 'Loser Backdoor Final',
        isGameToGo: true,
        bidNumber: 3,
        winnerAdvancesTo: 'Nationals/Regionals Qualifier (Bid #3)',
        loserAdvancesTo: '4th Place',
        timeSlot: 'Sunday 5:30 PM',
        field: 'Stadium Field',
      });
    }
  } else {
    // 12 or 16 or 20 teams (Standard USAU 4-Pool Championship Bracket)
    games.push(
      {
        id: 'q1',
        bracketType: 'championship',
        roundName: 'Championship Quarterfinal 1',
        gameNumber: 1,
        team1Placeholder: `${pA} #1`,
        team2Placeholder: `${pD} #2`,
        winnerAdvancesTo: 'Semifinal 1',
        loserAdvancesTo: 'Backdoor Quarter 1',
        timeSlot: 'Sunday 8:30 AM',
        field: 'Field 1',
      },
      {
        id: 'q2',
        bracketType: 'championship',
        roundName: 'Championship Quarterfinal 2',
        gameNumber: 2,
        team1Placeholder: `${pC} #1`,
        team2Placeholder: `${pB} #2`,
        winnerAdvancesTo: 'Semifinal 1',
        loserAdvancesTo: 'Backdoor Quarter 1',
        timeSlot: 'Sunday 8:30 AM',
        field: 'Field 2',
      },
      {
        id: 'q3',
        bracketType: 'championship',
        roundName: 'Championship Quarterfinal 3',
        gameNumber: 3,
        team1Placeholder: `${pB} #1`,
        team2Placeholder: `${pC} #2`,
        winnerAdvancesTo: 'Semifinal 2',
        loserAdvancesTo: 'Backdoor Quarter 2',
        timeSlot: 'Sunday 8:30 AM',
        field: 'Field 3',
      },
      {
        id: 'q4',
        bracketType: 'championship',
        roundName: 'Championship Quarterfinal 4',
        gameNumber: 4,
        team1Placeholder: `${pD} #1`,
        team2Placeholder: `${pA} #2`,
        winnerAdvancesTo: 'Semifinal 2',
        loserAdvancesTo: 'Backdoor Quarter 2',
        timeSlot: 'Sunday 8:30 AM',
        field: 'Field 4',
      },
      {
        id: 'semi1',
        bracketType: 'championship',
        roundName: 'Championship Semifinal 1',
        gameNumber: 5,
        team1Placeholder: 'Winner QF 1',
        team2Placeholder: 'Winner QF 2',
        winnerAdvancesTo: '1st Place Final',
        loserAdvancesTo: 'Backdoor Semi 1',
        timeSlot: 'Sunday 10:45 AM',
        field: 'Field 1',
      },
      {
        id: 'semi2',
        bracketType: 'championship',
        roundName: 'Championship Semifinal 2',
        gameNumber: 6,
        team1Placeholder: 'Winner QF 3',
        team2Placeholder: 'Winner QF 4',
        winnerAdvancesTo: '1st Place Final',
        loserAdvancesTo: 'Backdoor Semi 2',
        timeSlot: 'Sunday 10:45 AM',
        field: 'Field 2',
      },
      {
        id: 'champ_final',
        bracketType: 'championship',
        roundName: '1st Place Final (Bid 1)',
        gameNumber: 7,
        team1Placeholder: 'Winner Semifinal 1',
        team2Placeholder: 'Winner Semifinal 2',
        isGameToGo: true,
        bidNumber: 1,
        winnerAdvancesTo: 'Champion (Bid #1)',
        loserAdvancesTo: numBids >= 2 ? 'Game-to-Go (Bid 2)' : '2nd Place',
        timeSlot: 'Sunday 1:30 PM',
        field: 'Stadium Field',
      }
    );

    if (numBids >= 2) {
      games.push(
        {
          id: 'bd_semi1',
          bracketType: 'backdoor_bid',
          roundName: 'Backdoor Semifinal 1',
          gameNumber: 8,
          team1Placeholder: 'Loser Championship Semi 1',
          team2Placeholder: 'Winner Backdoor Quarters',
          winnerAdvancesTo: 'Backdoor Final',
          loserAdvancesTo: 'Consolation',
          timeSlot: 'Sunday 1:00 PM',
          field: 'Field 3',
        },
        {
          id: 'bd_semi2',
          bracketType: 'backdoor_bid',
          roundName: 'Backdoor Semifinal 2',
          gameNumber: 9,
          team1Placeholder: 'Loser Championship Semi 2',
          team2Placeholder: 'Winner Backdoor Quarters',
          winnerAdvancesTo: 'Backdoor Final',
          loserAdvancesTo: 'Consolation',
          timeSlot: 'Sunday 1:00 PM',
          field: 'Field 4',
        },
        {
          id: 'bd_final',
          bracketType: 'backdoor_bid',
          roundName: 'Backdoor Final (Bid 2 Playoff)',
          gameNumber: 10,
          team1Placeholder: 'Winner Backdoor Semi 1',
          team2Placeholder: 'Winner Backdoor Semi 2',
          winnerAdvancesTo: 'Game-to-Go (Bid 2)',
          loserAdvancesTo: numBids >= 3 ? 'Game-to-Go (Bid 3)' : '3rd Place',
          timeSlot: 'Sunday 3:00 PM',
          field: 'Field 1',
        },
        {
          id: 'bd_g2g_bid2',
          bracketType: 'backdoor_bid',
          roundName: 'Game-to-Go (Bid 2)',
          gameNumber: 11,
          team1Placeholder: 'Loser 1st Place Final',
          team2Placeholder: 'Winner Backdoor Final',
          isGameToGo: true,
          bidNumber: 2,
          winnerAdvancesTo: 'Qualifier (Bid #2)',
          loserAdvancesTo: numBids >= 3 ? 'Game-to-Go (Bid 3)' : '3rd Place',
          timeSlot: 'Sunday 4:45 PM',
          field: 'Stadium Field',
        }
      );
    }

    if (numBids >= 3) {
      games.push({
        id: 'bd_g2g_bid3',
        bracketType: 'backdoor_bid',
        roundName: 'Game-to-Go (Bid 3)',
        gameNumber: 12,
        team1Placeholder: 'Loser Game-to-Go (Bid 2)',
        team2Placeholder: 'Loser Backdoor Final',
        isGameToGo: true,
        bidNumber: 3,
        winnerAdvancesTo: 'Qualifier (Bid #3)',
        loserAdvancesTo: '4th Place',
        timeSlot: 'Sunday 6:15 PM',
        field: 'Stadium Field',
      });
    }

    if (numBids >= 4) {
      games.push({
        id: 'bd_g2g_bid4',
        bracketType: 'backdoor_bid',
        roundName: 'Game-to-Go (Bid 4)',
        gameNumber: 13,
        team1Placeholder: 'Loser Game-to-Go (Bid 3)',
        team2Placeholder: 'Winner Consolation Bracket',
        isGameToGo: true,
        bidNumber: 4,
        winnerAdvancesTo: 'Qualifier (Bid #4)',
        loserAdvancesTo: '5th Place',
        timeSlot: 'Sunday 7:30 PM',
        field: 'Field 2',
      });
    }
  }

  return games;
}

/**
 * Build a complete Tournament Configuration
 */
export function buildTournament(
  numTeams: number,
  numBids: number,
  division: DivisionType,
  customTeamNames?: { name: string; cityOrSchool?: string }[]
): TournamentConfig {
  const preset = DIVISION_PRESETS[division] || DIVISION_PRESETS.college_mens;
  const teams: Team[] = [];

  for (let i = 0; i < numTeams; i++) {
    const custom = customTeamNames?.[i];
    const defaultData = preset.defaultTeams[i] || {
      name: `Team ${i + 1}`,
      cityOrSchool: `Seed ${i + 1}`,
    };

    teams.push({
      id: `team_${i + 1}`,
      seed: i + 1,
      name: custom?.name || defaultData.name,
      cityOrSchool: custom?.cityOrSchool || defaultData.cityOrSchool,
    });
  }

  // Determine pool count
  let numPools = 4;
  if (numTeams <= 4) numPools = 1;
  else if (numTeams <= 6) numPools = 2;
  else if (numTeams <= 8) numPools = 2;
  else numPools = 4;

  const pools = generatePools(teams, numPools);
  const bracketGames = generateBracketGames(numTeams, numBids, pools);

  let usauFormatName = `USAU ${numTeams}-Team Format (${numPools} Pools, ${numBids} Bid${numBids > 1 ? 's' : ''})`;
  if (numTeams === 16) {
    usauFormatName = `USAU Standard 16-Team Regional/National Format (4 Pools of 4, ${numBids} Bid${numBids > 1 ? 's' : ''})`;
  } else if (numTeams === 8) {
    usauFormatName = `USAU Standard 8-Team Modified Double Elimination (${numBids} Bid${numBids > 1 ? 's' : ''})`;
  }

  return {
    name: `${preset.label} Championship (${numTeams} Teams • ${numBids} Bid${numBids > 1 ? 's' : ''})`,
    numTeams,
    numBids,
    division,
    teams,
    pools,
    bracketGames,
    usauFormatName,
    usauManualUrl: 'https://usaultimate.org/resources/tournament-directors/formats/',
  };
}
