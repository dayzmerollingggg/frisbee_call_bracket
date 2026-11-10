import {
  CallCategory,
  CallerType,
  CallSituationOption,
  ContestStatus,
  PresetScenario,
  RuleDecision,
  ThrowOutcome,
} from '../types/rules';

export interface CategoryInfo {
  id: CallCategory;
  name: string;
  iconName: string;
  description: string;
  usauRuleReference: string;
}

export const CALL_CATEGORIES: CategoryInfo[] = [
  {
    id: 'throwing_foul',
    name: 'Throwing Foul',
    iconName: 'RotateCcw',
    description: 'Contact initiated by defender on thrower, or non-incidental contact during windup/release.',
    usauRuleReference: 'USAU Rule 17.I.4.a',
  },
  {
    id: 'receiving_foul',
    name: 'Receiving Foul',
    iconName: 'Award',
    description: 'Contact affecting catching attempt between receiver and defender in the air or on the ground.',
    usauRuleReference: 'USAU Rule 17.I.4.b',
  },
  {
    id: 'marking_infraction',
    name: 'Marking Infraction (Drop 2)',
    iconName: 'Shield',
    description: 'Fast count, disc space violation, straddle, double team, or vision obstruction by marker.',
    usauRuleReference: 'USAU Rule 15.B',
  },
  {
    id: 'pick',
    name: 'Pick Call',
    iconName: 'Users',
    description: 'A defensive player is prevented or delayed from guarding their matchup due to another player.',
    usauRuleReference: 'USAU Rule 17.J & 16.C',
  },
  {
    id: 'travel',
    name: 'Travel Infraction',
    iconName: 'Compass',
    description: 'Thrower drags or switches pivot foot, speeds up after catching, or fails to establish pivot.',
    usauRuleReference: 'USAU Rule 17.K',
  },
  {
    id: 'stall_out',
    name: 'Stall-Out Call',
    iconName: 'AlertTriangle',
    description: 'Marker completes counting to 10 ("T" of ten) before thrower releases disc.',
    usauRuleReference: 'USAU Rule 15.A.2 & 15.A.5',
  },
  {
    id: 'strip',
    name: 'Strip Call',
    iconName: 'Disc',
    description: 'A defensive player contacts the disc after the offensive receiver has secured catch/control.',
    usauRuleReference: 'USAU Rule 17.I.4.d',
  },
  {
    id: 'dangerous_play',
    name: 'Dangerous Play',
    iconName: 'AlertTriangle',
    description: 'Reckless disregard for safety of players, treating near-collisions or egregious contact as fouls.',
    usauRuleReference: 'USAU Rule 17.I.1',
  },
  {
    id: 'out_of_bounds',
    name: 'Out-of-Bounds Dispute',
    iconName: 'HelpCircle',
    description: 'Dispute over whether disc was caught in bounds, on the boundary line, or out of bounds.',
    usauRuleReference: 'USAU Rule 10',
  },
  {
    id: 'offsides_pull',
    name: 'Offsides on the Pull',
    iconName: 'SlidersHorizontal',
    description: 'Players cross goal line before the pull is released by the pulling team.',
    usauRuleReference: 'USAU Rule 9.B.4',
  },
];

export const CALL_SITUATIONS: CallSituationOption[] = [
  // Throwing fouls
  {
    id: 'def_foul_during_throw',
    label: 'Defensive Foul: Contact on Thrower during release/windup',
    category: 'throwing_foul',
    caller: 'offense',
    description: 'Marker contacts thrower’s arm, hand, or body during the throwing motion before or at release.',
    possibleOutcomes: ['completed', 'turnover_ground', 'not_thrown'],
    ruleCitation: 'USAU Rule 17.I.4.a.2 & 15.A.5.a.2',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },
  {
    id: 'def_contact_after_release',
    label: 'Defensive Contact: Follow-through contact after release',
    category: 'throwing_foul',
    caller: 'offense',
    description: 'Contact occurs after the disc is completely released from the thrower’s hand.',
    possibleOutcomes: ['completed', 'turnover_ground'],
    ruleCitation: 'USAU Rule 17.I.4.a.1 (Incidental unless dangerous)',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },
  {
    id: 'off_foul_thrower',
    label: 'Offensive Foul: Thrower pivots or jumps into legal defender',
    category: 'throwing_foul',
    caller: 'defense',
    description: 'Thrower initiates non-incidental contact with a legally positioned defender/marker.',
    possibleOutcomes: ['completed', 'turnover_ground', 'not_thrown'],
    ruleCitation: 'USAU Rule 17.I.4.a.3',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },

  // Receiving fouls
  {
    id: 'def_receiving_foul_air',
    label: 'Defensive Foul on Receiver: Contact during jump/catch attempt',
    category: 'receiving_foul',
    caller: 'offense',
    description: 'Defender initiates contact with offensive receiver while contesting a pass in the air.',
    possibleOutcomes: ['completed', 'turnover_ground', 'caught_in_endzone'],
    ruleCitation: 'USAU Rule 17.I.4.b.2',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },
  {
    id: 'off_receiving_foul_push',
    label: 'Offensive Foul on Receiver: Receiver pushes or undercuts defender',
    category: 'receiving_foul',
    caller: 'defense',
    description: 'Offensive cutter shoves off or undercuts a defender who has established position.',
    possibleOutcomes: ['completed', 'turnover_ground'],
    ruleCitation: 'USAU Rule 17.I.4.b.1',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },

  // Marking infractions
  {
    id: 'marking_fast_count',
    label: 'Fast Count: Marker counting faster than 1 second intervals',
    category: 'marking_infraction',
    caller: 'offense',
    description: 'Marker does not say "Stalling" or counts in less than 1-second cadence, or skips numbers.',
    possibleOutcomes: ['not_thrown', 'completed', 'turnover_ground'],
    ruleCitation: 'USAU Rule 15.B.2 & 15.B.9',
    ruleUrl: 'https://usaultimate.org/rules/#15',
  },
  {
    id: 'marking_disc_space',
    label: 'Disc Space / Straddle: Marker closer than disc diameter',
    category: 'marking_infraction',
    caller: 'offense',
    description: 'Any part of marker is closer than one disc diameter (10.75 in) to thrower’s torso.',
    possibleOutcomes: ['not_thrown', 'completed', 'turnover_ground'],
    ruleCitation: 'USAU Rule 15.B.3 & 15.B.9',
    ruleUrl: 'https://usaultimate.org/rules/#15',
  },
  {
    id: 'marking_double_team',
    label: 'Double Team: Second defender within 10 feet of thrower',
    category: 'marking_infraction',
    caller: 'offense',
    description: 'More than one defender within 10 feet of thrower without guarding another offensive player.',
    possibleOutcomes: ['not_thrown', 'completed', 'turnover_ground'],
    ruleCitation: 'USAU Rule 15.B.4 & 15.B.9',
    ruleUrl: 'https://usaultimate.org/rules/#15',
  },

  // Pick call
  {
    id: 'pick_in_air',
    label: 'Pick Called: Defender obstructed while pass is in the air',
    category: 'pick',
    caller: 'defense',
    description: 'Defender calls "Pick" right as or after the throw is released toward the endzone or open cutter.',
    possibleOutcomes: ['completed', 'turnover_ground'],
    ruleCitation: 'USAU Rule 17.J & 16.C.2',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },
  {
    id: 'pick_before_throw',
    label: 'Pick Called: Defender obstructed before throw occurs (disc held)',
    category: 'pick',
    caller: 'defense',
    description: 'Defender is screened/picked while guarding cutter while the thrower still holds the disc.',
    possibleOutcomes: ['not_thrown'],
    ruleCitation: 'USAU Rule 17.J & 15.A.5.a.3',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },

  // Travel
  {
    id: 'travel_pivot_drag',
    label: 'Travel: Thrower drags pivot foot or switches pivot',
    category: 'travel',
    caller: 'defense',
    description: 'Thrower lifts or drags pivot foot before disc release, or changes pivot foot.',
    possibleOutcomes: ['not_thrown', 'completed', 'turnover_ground'],
    ruleCitation: 'USAU Rule 17.K & 15.A.5.a.3',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },
  {
    id: 'travel_speed_up_catch',
    label: 'Travel: Receiver fails to decelerate or changes direction after catch',
    category: 'travel',
    caller: 'defense',
    description: 'Receiver takes extra steps or changes direction instead of stopping as quickly as possible.',
    possibleOutcomes: ['not_thrown', 'completed'],
    ruleCitation: 'USAU Rule 17.K.1',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },

  // Stall-out
  {
    id: 'stall_out_call',
    label: 'Stall-Out: Marker reaches "T" of Ten',
    category: 'stall_out',
    caller: 'defense',
    description: 'Marker utters the "T" of ten before the disc is in flight out of the thrower’s hand.',
    possibleOutcomes: ['not_thrown', 'completed', 'turnover_ground'],
    ruleCitation: 'USAU Rule 15.A.2 & 15.A.5.b.1',
    ruleUrl: 'https://usaultimate.org/rules/#15',
  },

  // Strip
  {
    id: 'strip_call_receiver',
    label: 'Strip: Defender knocks disc out of receiver’s secured hands',
    category: 'strip',
    caller: 'offense',
    description: 'Receiver has sustained rotation stoppage and contact, then defender contacts disc or arms.',
    possibleOutcomes: ['completed', 'caught_in_endzone', 'turnover_ground'],
    ruleCitation: 'USAU Rule 17.I.4.d',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },

  // Dangerous Play
  {
    id: 'dangerous_play_call',
    label: 'Dangerous Play: Egregious bidding or unsafe collision danger',
    category: 'dangerous_play',
    caller: 'either',
    description: 'Jumping without regard for where players will land, blind-side bids, or reckless body checks.',
    possibleOutcomes: ['completed', 'turnover_ground', 'not_thrown'],
    ruleCitation: 'USAU Rule 17.I.1',
    ruleUrl: 'https://usaultimate.org/rules/#17',
  },

  // Out of bounds
  {
    id: 'oob_line_dispute',
    label: 'Out of Bounds: Receiver lands on the boundary line',
    category: 'out_of_bounds',
    caller: 'defense',
    description: 'Dispute over first ground contact touching the perimeter line (perimeter line is out-of-bounds).',
    possibleOutcomes: ['turnover_ground', 'completed'],
    ruleCitation: 'USAU Rule 10.C & 10.E',
    ruleUrl: 'https://usaultimate.org/rules/#10',
  },

  // Offsides on pull
  {
    id: 'offsides_defense',
    label: 'Offsides: Defensive team crosses goal line before pull release',
    category: 'offsides_pull',
    caller: 'offense',
    description: 'Defensive players run past their goal line before the puller lets go of the disc.',
    possibleOutcomes: ['not_thrown'],
    ruleCitation: 'USAU Rule 9.B.4.d',
    ruleUrl: 'https://usaultimate.org/rules/#9',
  },
  {
    id: 'offsides_offense',
    label: 'Offsides: Offensive players not holding goal line before pull',
    category: 'offsides_pull',
    caller: 'defense',
    description: 'Offensive players move or cross their goal line prior to the pull release.',
    possibleOutcomes: ['not_thrown'],
    ruleCitation: 'USAU Rule 9.B.4.c',
    ruleUrl: 'https://usaultimate.org/rules/#9',
  },
];

export const OUTCOME_OPTIONS: { id: ThrowOutcome; label: string; description: string }[] = [
  {
    id: 'completed',
    label: 'Pass Completed to Receiver',
    description: 'The pass was thrown and caught by an offensive player.',
  },
  {
    id: 'turnover_ground',
    label: 'Pass Incomplete / Turnover (Hit Ground)',
    description: 'The pass was thrown and was not caught (hit ground or defense swatted it down).',
  },
  {
    id: 'not_thrown',
    label: 'Disc Not Thrown / Held by Thrower',
    description: 'Thrower still held the disc in their hand when play stopped.',
  },
  {
    id: 'caught_in_endzone',
    label: 'Caught in Attacking Endzone',
    description: 'Receiver completed the catch with first point of contact in their attacking endzone.',
  },
];

export const CONTEST_OPTIONS: { id: ContestStatus; label: string; description: string }[] = [
  {
    id: 'uncontested',
    label: 'Uncontested (Accepted)',
    description: 'The player accused of the foul/infraction agrees that the call was valid.',
  },
  {
    id: 'contested',
    label: 'Contested (Disputed)',
    description: 'The player disagrees that a foul occurred or believes it was clean/incidental.',
  },
  {
    id: 'retracted',
    label: 'Retracted (Withdrawn by Caller)',
    description: 'The player who made the call withdraws it upon discussion with teammates/opponents.',
  },
];

/**
 * Resolver function: computes the exact USAU outcome, stall count, disc status, and citation
 */
export function resolvePlayCall(params: {
  situationId: string;
  outcomeId: ThrowOutcome;
  contestId: ContestStatus;
  currentStall: number; // e.g. 5
}): RuleDecision {
  const { situationId, outcomeId, contestId, currentStall } = params;
  const sit = CALL_SITUATIONS.find((s) => s.id === situationId) || CALL_SITUATIONS[0];

  // Default calculation helpers
  const countPlus1 = Math.min(10, currentStall + 1);

  // 1. MARKING INFRACTIONS (Fast count, disc space, double team)
  if (sit.category === 'marking_infraction') {
    if (contestId === 'uncontested') {
      const drop2Val = Math.max(1, currentStall - 2);
      return {
        possession: 'offense_thrower',
        possessionSummary: 'Offense retains disc with Thrower. Play does NOT stop.',
        discAction: 'stays_with_receiver',
        stallAction: 'drops_2',
        stallExplanation: `Stall count DROPS BY 2! (Marker was at ${currentStall}, resumes at ${drop2Val}). If call was at 1 or 2, resumes at "stalling 1".`,
        calculatedStallResume: drop2Val,
        isContested: false,
        ruleTitle: 'USAU Rule 15.B: Marking Infractions (Fast Count, Disc Space, Double Team)',
        ruleCitation: 'USAU Rule 15.B.9',
        ruleUrl: 'https://usaultimate.org/rules/#15',
        explanation:
          'When a marking infraction is called, play does NOT stop unless the marker contests. The marker must immediately pause counting, correct the violation, drop the count by 2, and resume with "stalling [count minus 2]".',
        checkInProcedure:
          'No check is required! Marker simply pauses, steps back to correct distance, announces "Stalling ' +
          drop2Val +
          '" and continues counting.',
      };
    } else if (contestId === 'contested') {
      const contVal = Math.max(1, currentStall - 1);
      return {
        possession: 'offense_thrower',
        possessionSummary: 'Offense retains disc. Play stops for dispute.',
        discAction: 'returned_to_thrower',
        stallAction: 'unchanged',
        stallExplanation: `Play stops. Stall resumes at count reached minus 1 (resumes at ${contVal}) or at count reached.`,
        calculatedStallResume: contVal,
        isContested: true,
        ruleTitle: 'USAU Rule 15.B.2: Contested Marking Infraction',
        ruleCitation: 'USAU Rule 15.B.2.c',
        ruleUrl: 'https://usaultimate.org/rules/#15',
        explanation:
          'If the marker contests a fast count or marking infraction, play stops. The marker must discuss briefly. Play restarts with a ground touch check at count reached minus 1.',
        checkInProcedure: 'Defensive ground-touch check. Marker announces "Stalling ' + contVal + '".',
      };
    }
  }

  // 2. DEFENSIVE THROWING FOUL
  if (sit.id === 'def_foul_during_throw') {
    if (contestId === 'uncontested') {
      if (outcomeId === 'completed') {
        return {
          possession: 'offense_receiver',
          possessionSummary: 'Offense retains possession! Pass is completed (Continuation Rule applies).',
          discAction: 'stays_with_receiver',
          stallAction: 'reset_to_1',
          stallExplanation: 'Stall count resets to 1 for the new receiver.',
          calculatedStallResume: 1,
          isContested: false,
          ruleTitle: 'USAU Rule 16.C.2: Continuation Rule (Play-On Completed Pass)',
          ruleCitation: 'USAU Rule 16.C.2 & 17.I.4.a.2',
          ruleUrl: 'https://usaultimate.org/rules/#16',
          explanation:
            'If a foul is called by the thrower during the throw and the pass is completed anyway, play continues as if no call occurred (continuation rule 16.C). Play does not stop, or if stopped, resumes with the receiver holding the disc.',
          checkInProcedure: 'If players stopped play, the receiver touches the disc to the ground and play restarts.',
        };
      } else {
        // turnover ground or held
        return {
          possession: 'offense_thrower',
          possessionSummary: 'Disc is RETURNED to the Thrower. Foul was uncontested.',
          discAction: 'returned_to_thrower',
          stallAction: 'reset_to_1',
          stallExplanation: 'Stall count RESETS TO 1! (Count restarts at "Stalling 1").',
          calculatedStallResume: 1,
          isContested: false,
          ruleTitle: 'USAU Rule 17.I.4.a.2: Uncontested Throwing Foul',
          ruleCitation: 'USAU Rule 17.I.4.a.2 & Rule 15.A.5.a.2',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'When a defensive throwing foul is uncontested and the pass was incomplete or not thrown, the disc goes back to the thrower and the stall count completely resets to 1.',
          checkInProcedure:
            'Thrower returns to pivot spot where contact occurred. Marker touches disc to check it in, then begins counting "Stalling 1".',
        };
      }
    } else if (contestId === 'contested') {
      if (outcomeId === 'completed') {
        return {
          possession: 'offense_receiver',
          possessionSummary: 'Pass completed stands! Catch maintained by offense.',
          discAction: 'stays_with_receiver',
          stallAction: 'reset_to_1',
          stallExplanation: 'Stall count resets to 1 for new receiver.',
          calculatedStallResume: 1,
          isContested: true,
          ruleTitle: 'USAU Rule 16.C.3: Contested Foul with Completion',
          ruleCitation: 'USAU Rule 16.C.3',
          ruleUrl: 'https://usaultimate.org/rules/#16',
          explanation:
            'Even when contested by defense, if the pass was thrown and completed to the intended receiver, the result stands and play continues.',
          checkInProcedure: 'If play stopped, receiver ground-checks disc and play resumes.',
        };
      } else {
        const resumeCount = Math.min(6, countPlus1);
        return {
          possession: 'offense_thrower',
          possessionSummary: 'Disc is RETURNED to Thrower. Contested defensive call.',
          discAction: 'returned_to_thrower',
          stallAction: 'count_plus_1_max_6',
          stallExplanation: `Stall resumes at count reached plus 1, MAXIMUM 6! (Input stall was ${currentStall} -> restarts at ${resumeCount}).`,
          calculatedStallResume: resumeCount,
          isContested: true,
          ruleTitle: 'USAU Rule 15.A.5.b.3: Contested Defensive Call',
          ruleCitation: 'USAU Rule 15.A.5.b.3',
          ruleUrl: 'https://usaultimate.org/rules/#15',
          explanation:
            'When an offensive call against defense is contested (such as a contested throwing foul), the disc returns to the thrower and the stall resumes at count reached plus 1, but capped at a maximum of 6 (if count was 5 or higher, restarts at 6).',
          checkInProcedure:
            'Thrower establishes pivot. Marker touches disc and resumes count at "Stalling ' + resumeCount + '".',
        };
      }
    }
  }

  // 3. DEFENSIVE RECEIVING FOUL
  if (sit.id === 'def_receiving_foul_air') {
    if (contestId === 'uncontested') {
      if (outcomeId === 'caught_in_endzone') {
        return {
          possession: 'offense_receiver',
          possessionSummary: 'GOAL OFFENSE! Catch completed in the endzone.',
          discAction: 'stays_with_receiver',
          stallAction: 'reset_to_1',
          stallExplanation: 'Goal scored. Ready for next pull.',
          calculatedStallResume: 1,
          isContested: false,
          ruleTitle: 'USAU Rule 17.I.4.b.2: Uncontested Receiving Foul in Endzone',
          ruleCitation: 'USAU Rule 17.I.4.b.2',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'If an uncontested foul occurred in the endzone, the receiver is awarded possession at the spot of the foul. Since the foul occurred in the attacking endzone, it results in a GOAL!',
          checkInProcedure: 'Goal signalled. Offensive and defensive teams switch sides for the next point.',
        };
      } else if (outcomeId === 'completed') {
        return {
          possession: 'offense_receiver',
          possessionSummary: 'Catch stands. Receiver maintains possession.',
          discAction: 'stays_with_receiver',
          stallAction: 'reset_to_1',
          stallExplanation: 'Stall count resets to 1 for receiver.',
          calculatedStallResume: 1,
          isContested: false,
          ruleTitle: 'USAU Rule 16.C.2: Continuation on Receiving Foul',
          ruleCitation: 'USAU Rule 16.C.2',
          ruleUrl: 'https://usaultimate.org/rules/#16',
          explanation: 'Pass completed despite the contact. Play continues.',
          checkInProcedure: 'If play was stopped, receiver touches disc to ground and resumes at Stalling 1.',
        };
      } else {
        // incomplete
        return {
          possession: 'offense_receiver',
          possessionSummary: 'Disc awarded to the FOULED RECEIVER at spot of the foul!',
          discAction: 'stays_with_receiver',
          stallAction: 'reset_to_1',
          stallExplanation: 'Stall count resets to 1 ("Stalling 1").',
          calculatedStallResume: 1,
          isContested: false,
          ruleTitle: 'USAU Rule 17.I.4.b.2: Uncontested Receiving Foul',
          ruleCitation: 'USAU Rule 17.I.4.b.2',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'An uncontested receiving foul treats the catch as completed! The fouled receiver gains possession at the spot of the foul. If the foul was in the endzone, it is a goal.',
          checkInProcedure:
            'Fouled receiver establishes pivot at spot of foul. Defense checks disc. Marker begins "Stalling 1".',
        };
      }
    } else if (contestId === 'contested') {
      const resumeCount = Math.min(6, countPlus1);
      return {
        possession: 'offense_thrower',
        possessionSummary: 'Disc is SENT BACK to the Thrower! Contested receiving foul.',
        discAction: 'returned_to_thrower',
        stallAction: 'count_plus_1_max_6',
        stallExplanation: `Disc sent back to thrower. Stall resumes at count reached plus 1, MAXIMUM 6 (resumes at ${resumeCount}).`,
        calculatedStallResume: resumeCount,
        isContested: true,
        ruleTitle: 'USAU Rule 17.I.4.b.2 & 15.A.5.b.3: Contested Receiving Foul',
        ruleCitation: 'USAU Rule 15.A.5.b.3',
        ruleUrl: 'https://usaultimate.org/rules/#15',
        explanation:
          'When a receiving foul is contested by defense, the disc CANNOT stay with the receiver; it is sent back to the original thrower. Stall count resumes at count reached plus 1, max 6.',
        checkInProcedure:
          'Thrower takes original pivot spot. Receiver and defender return to positions held at time of throw. Marker checks disc and announces "Stalling ' +
          resumeCount +
          '".',
      };
    }
  }

  // 4. PICK CALL
  if (sit.category === 'pick') {
    if (contestId === 'uncontested') {
      if (outcomeId === 'turnover_ground') {
        return {
          possession: 'turnover_defense',
          possessionSummary: 'TURNOVER STANDS! Defense takes possession.',
          discAction: 'turnover_at_spot',
          stallAction: 'reset_to_1',
          stallExplanation: 'Turnover stands. Defense takes disc with count at 1.',
          calculatedStallResume: 1,
          isContested: false,
          ruleTitle: 'USAU Rule 16.C.2: Pick Called on Incomplete Pass',
          ruleCitation: 'USAU Rule 16.C.2 & 17.J',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'Under USAU continuation rules, a defensive pick call cannot rescue an offensive turnover. If the pass was incomplete or dropped, the turnover stands because the defense called the infraction and the turnover favored the defense.',
          checkInProcedure: 'Defense picks up disc at spot of turnover, checks disc in with ground touch.',
        };
      } else if (outcomeId === 'completed') {
        const resumeCount = Math.min(9, countPlus1);
        return {
          possession: 'offense_thrower',
          possessionSummary: 'Disc is SENT BACK to Thrower! Pick affected play.',
          discAction: 'returned_to_thrower',
          stallAction: 'count_plus_1_max_9',
          stallExplanation: `Disc returns to thrower. Stall resumes at count reached plus 1, MAXIMUM 9 (now at ${resumeCount}).`,
          calculatedStallResume: resumeCount,
          isContested: false,
          ruleTitle: 'USAU Rule 17.J & 15.A.5.a.3: Uncontested Pick',
          ruleCitation: 'USAU Rule 15.A.5.a.3',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'If the pick affected the play and the pass was completed, the disc goes back to the thrower. The picked defender is permitted to catch up to the relative position they held prior to the pick. Stall restarts at count reached plus 1, max 9.',
          checkInProcedure:
            'Picked defender moves to recover relative separation. Thrower checks disc in with marker. Marker announces "Stalling ' +
            resumeCount +
            '".',
        };
      } else {
        // not thrown
        const resumeCount = Math.min(9, countPlus1);
        return {
          possession: 'offense_thrower',
          possessionSummary: 'Disc remains with Thrower. Picked defender recovers position.',
          discAction: 'stays_with_receiver',
          stallAction: 'count_plus_1_max_9',
          stallExplanation: `Stall resumes at count reached plus 1, MAXIMUM 9 (resumes at ${resumeCount}).`,
          calculatedStallResume: resumeCount,
          isContested: false,
          ruleTitle: 'USAU Rule 17.J: Pick Before Throw',
          ruleCitation: 'USAU Rule 15.A.5.a.3',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'Defender was picked while disc was held. Play stops. Defender catches up to the distance they had when the pick occurred. Stall resumes at count reached plus 1, capped at 9.',
          checkInProcedure: 'Players hold positions. Marker touches disc, resumes at "Stalling ' + resumeCount + '".',
        };
      }
    } else if (contestId === 'contested') {
      const resumeCount = Math.min(8, countPlus1);
      return {
        possession: 'offense_thrower',
        possessionSummary: 'Contested Pick: Disc returns to thrower.',
        discAction: 'returned_to_thrower',
        stallAction: 'count_plus_1_max_8',
        stallExplanation: `Contested defensive call by offense: Stall resumes at count plus 1, MAXIMUM 8 (resumes at ${resumeCount}).`,
        calculatedStallResume: resumeCount,
        isContested: true,
        ruleTitle: 'USAU Rule 15.A.5.b.2: Contested Pick Infraction',
        ruleCitation: 'USAU Rule 15.A.5.b.2',
        ruleUrl: 'https://usaultimate.org/rules/#15',
        explanation:
          'If the offense contests the pick (claiming no obstruction occurred or separation was greater than 10 ft), the disc goes back to the thrower. Stall count resumes at count reached plus 1, max 8.',
        checkInProcedure: 'Defensive check on disc. Marker resumes at "Stalling ' + resumeCount + '".',
      };
    }
  }

  // 5. TRAVEL INFRACTION
  if (sit.category === 'travel') {
    if (contestId === 'uncontested') {
      if (outcomeId === 'turnover_ground') {
        return {
          possession: 'turnover_defense',
          possessionSummary: 'TURNOVER STANDS! Continuation rule applies.',
          discAction: 'turnover_at_spot',
          stallAction: 'reset_to_1',
          stallExplanation: 'Turnover stands. Defense takes over at 1.',
          calculatedStallResume: 1,
          isContested: false,
          ruleTitle: 'USAU Rule 16.C.2: Travel on Incomplete Pass',
          ruleCitation: 'USAU Rule 16.C.2',
          ruleUrl: 'https://usaultimate.org/rules/#16',
          explanation:
            'If travel was called by defense and the pass was incomplete, the travel does not undo the turnover. Defense gains possession at the spot of the disc.',
          checkInProcedure: 'Defense checks disc in with ground touch.',
        };
      } else if (outcomeId === 'completed') {
        const resumeCount = Math.min(9, countPlus1);
        return {
          possession: 'offense_thrower',
          possessionSummary: 'Disc is SENT BACK to Thrower at the correct pivot spot.',
          discAction: 'returned_to_thrower',
          stallAction: 'count_plus_1_max_9',
          stallExplanation: `Disc returned to thrower. Stall resumes at count reached plus 1, MAXIMUM 9 (now at ${resumeCount}).`,
          calculatedStallResume: resumeCount,
          isContested: false,
          ruleTitle: 'USAU Rule 17.K: Uncontested Travel on Thrown Pass',
          ruleCitation: 'USAU Rule 15.A.5.a.3 & 17.K',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'If travel was called and the disc was thrown and completed, play stops and the disc is sent back to the thrower. The thrower returns to the exact pivot spot where the travel originated. Stall resumes at count reached plus 1, max 9.',
          checkInProcedure:
            'Thrower re-establishes pivot at correct spot. Marker touches disc and resumes "Stalling ' +
            resumeCount +
            '".',
        };
      } else {
        // not thrown
        return {
          possession: 'offense_thrower',
          possessionSummary: 'Thrower returns to correct pivot. Play does NOT require full stoppage.',
          discAction: 'placed_at_infraction_spot',
          stallAction: 'unchanged',
          stallExplanation: `Stall count pauses while thrower corrects pivot, then resumes where paused (at ${currentStall}).`,
          calculatedStallResume: currentStall,
          isContested: false,
          ruleTitle: 'USAU Rule 17.K.3: Travel with Disc Held',
          ruleCitation: 'USAU Rule 17.K.3',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'When a travel is called on a thrower who has not released the disc, play does not stop for a check! The thrower must return to the correct pivot point, and the marker pauses counting until the pivot is established, then resumes counting.',
          checkInProcedure: 'Marker pauses stall, touches disc once pivot is reset, resumes at current count.',
        };
      }
    } else if (contestId === 'contested') {
      const resumeCount = Math.min(8, countPlus1);
      return {
        possession: 'offense_thrower',
        possessionSummary: 'Contested Travel: Disc returns to thrower.',
        discAction: 'returned_to_thrower',
        stallAction: 'count_plus_1_max_8',
        stallExplanation: `Contested call: Stall resumes at count reached plus 1, MAXIMUM 8 (resumes at ${resumeCount}).`,
        calculatedStallResume: resumeCount,
        isContested: true,
        ruleTitle: 'USAU Rule 15.A.5.b.2: Contested Travel Call',
        ruleCitation: 'USAU Rule 15.A.5.b.2',
        ruleUrl: 'https://usaultimate.org/rules/#15',
      explanation:
          'If the thrower contests that a travel occurred, play stops and disc returns to thrower. Stall resumes at count reached plus 1, maximum 8.',
        checkInProcedure: 'Defensive check. Marker resumes at "Stalling ' + resumeCount + '".',
      };
    }
  }

  // 6. STALL-OUT CALL
  if (sit.category === 'stall_out') {
    if (contestId === 'uncontested') {
      return {
        possession: 'turnover_defense',
        possessionSummary: 'TURNOVER! Stall-Out is uncontested.',
        discAction: 'turnover_at_spot',
        stallAction: 'turnover',
        stallExplanation: 'Turnover at the spot of the thrower. Defense takes possession with count at 1.',
        calculatedStallResume: 1,
        isContested: false,
        ruleTitle: 'USAU Rule 15.A.2: Uncontested Stall-Out',
        ruleCitation: 'USAU Rule 15.A.2 & 13.A.2',
        ruleUrl: 'https://usaultimate.org/rules/#15',
        explanation:
          'If the marker uttered the "T" of ten before the disc was released and the thrower does not contest, it is an immediate turnover. The marker puts the disc on the ground and play restarts with defensive possession.',
        checkInProcedure: 'New offensive thrower (former marker) picks up disc and checks in with ground touch.',
      };
    } else if (contestId === 'contested') {
      if (outcomeId === 'turnover_ground') {
        return {
          possession: 'turnover_defense',
          possessionSummary: 'TURNOVER STANDS! Throw was incomplete despite contested stall.',
          discAction: 'turnover_at_spot',
          stallAction: 'reset_to_1',
          stallExplanation: 'Incomplete pass resulted in turnover.',
          calculatedStallResume: 1,
          isContested: true,
          ruleTitle: 'USAU Rule 16.C: Continuation on Contested Stall',
          ruleCitation: 'USAU Rule 16.C.2',
          ruleUrl: 'https://usaultimate.org/rules/#16',
          explanation:
            'Even though the stall was contested, the throw was attempted and hit the ground. The turnover stands under the continuation rule.',
          checkInProcedure: 'Defense checks disc in with ground touch.',
        };
      } else {
        // completed or held
        return {
          possession: 'offense_thrower',
          possessionSummary: 'Disc returns to Thrower! Contested stall-out.',
          discAction: 'returned_to_thrower',
          stallAction: 'max_8',
          stallExplanation: 'Stall count resumes at EXACTLY 8 ("Stalling 8")!',
          calculatedStallResume: 8,
          isContested: true,
          ruleTitle: 'USAU Rule 15.A.5.b.1: Contested Stall-Out',
          ruleCitation: 'USAU Rule 15.A.5.b.1',
          ruleUrl: 'https://usaultimate.org/rules/#15',
          explanation:
            'If the thrower contests the stall-out (believing the release happened before the "T" of ten or claiming a fast count occurred), the disc returns to the thrower and the stall count resumes at 8 ("Stalling 8").',
          checkInProcedure: 'Marker touches disc and resumes count: "Stalling 8... 9... 10...".',
        };
      }
    }
  }

  // 7. STRIP CALL
  if (sit.category === 'strip') {
    if (contestId === 'uncontested') {
      if (outcomeId === 'caught_in_endzone') {
        return {
          possession: 'offense_receiver',
          possessionSummary: 'GOAL OFFENSE! Strip in the endzone.',
          discAction: 'stays_with_receiver',
          stallAction: 'reset_to_1',
          stallExplanation: 'Goal scored.',
          calculatedStallResume: 1,
          isContested: false,
          ruleTitle: 'USAU Rule 17.I.4.d: Uncontested Strip in Endzone',
          ruleCitation: 'USAU Rule 17.I.4.d',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'A strip occurs when an opponent contacts the disc after the receiver has secured possession. When uncontested in the endzone, it results directly in a GOAL!',
          checkInProcedure: 'Goal scored. Ready for next point.',
        };
      } else {
        return {
          possession: 'offense_receiver',
          possessionSummary: 'Disc AWARDED to Receiver at spot of strip.',
          discAction: 'stays_with_receiver',
          stallAction: 'reset_to_1',
          stallExplanation: 'Stall count resets to 1 ("Stalling 1").',
          calculatedStallResume: 1,
          isContested: false,
          ruleTitle: 'USAU Rule 17.I.4.d: Uncontested Strip',
          ruleCitation: 'USAU Rule 17.I.4.d',
          ruleUrl: 'https://usaultimate.org/rules/#17',
          explanation:
            'Uncontested strip restores possession to the receiver who caught it. Stall count starts fresh at 1.',
          checkInProcedure: 'Receiver establishes pivot, defender checks disc, marker begins "Stalling 1".',
        };
      }
    } else if (contestId === 'contested') {
      const resumeCount = Math.min(8, countPlus1);
      return {
        possession: 'offense_thrower',
        possessionSummary: 'Treated as contested foul. Disc SENT BACK to Thrower.',
        discAction: 'returned_to_thrower',
        stallAction: 'count_plus_1_max_8',
        stallExplanation: `Contested strip: disc goes back to thrower. Stall resumes at count reached plus 1, MAXIMUM 8 (resumes at ${resumeCount}).`,
        calculatedStallResume: resumeCount,
        isContested: true,
        ruleTitle: 'USAU Rule 17.I.4.d: Contested Strip',
        ruleCitation: 'USAU Rule 17.I.4.d & 15.A.5.b.2',
        ruleUrl: 'https://usaultimate.org/rules/#17',
      explanation:
          'If the defender contests that possession had been established prior to the disc being dislodged, it is treated as a contested foul. Disc returns to thrower, stall max 8.',
        checkInProcedure: 'Thrower checks disc in with marker. Marker announces "Stalling ' + resumeCount + '".',
      };
    }
  }

  // 8. DANGEROUS PLAY
  if (sit.category === 'dangerous_play') {
    if (contestId === 'uncontested') {
      return {
        possession: 'offense_receiver',
        possessionSummary: 'Disc awarded to the endangered player at spot of infraction.',
        discAction: 'placed_at_infraction_spot',
        stallAction: 'reset_to_1',
        stallExplanation: 'Stall count resets to 1 ("Stalling 1").',
        calculatedStallResume: 1,
        isContested: false,
        ruleTitle: 'USAU Rule 17.I.1: Dangerous Play (Uncontested)',
        ruleCitation: 'USAU Rule 17.I.1',
        ruleUrl: 'https://usaultimate.org/rules/#17',
        explanation:
          'Reckless disregard for the safety of players is a foul regardless of whether or when contact occurs. The endangered player is awarded the disc as if the foul had prevented the play.',
        checkInProcedure: 'Player checks disc in at spot of call. Stall begins at 1.',
      };
    } else {
      const resumeCount = Math.min(6, countPlus1);
      return {
        possession: 'offense_thrower',
        possessionSummary: 'Disc returns to Thrower. Contested dangerous play.',
        discAction: 'returned_to_thrower',
        stallAction: 'count_plus_1_max_6',
        stallExplanation: `Disc sent back to thrower. Stall resumes at count reached plus 1, MAXIMUM 6 (resumes at ${resumeCount}).`,
        calculatedStallResume: resumeCount,
        isContested: true,
        ruleTitle: 'USAU Rule 17.I.1 & 15.A.5.b.3: Contested Dangerous Play',
        ruleCitation: 'USAU Rule 17.I.1 & 15.A.5.b.3',
        ruleUrl: 'https://usaultimate.org/rules/#17',
        explanation:
          'If the dangerous play call is contested, the disc is returned to the original thrower and stall count resumes at count reached plus 1, max 6.',
        checkInProcedure: 'Defensive check. Marker resumes at "Stalling ' + resumeCount + '".',
      };
    }
  }

  // 9. OFFSIDES ON PULL
  if (sit.category === 'offsides_pull') {
    if (sit.id === 'offsides_defense') {
      return {
        possession: 'offense_receiver',
        possessionSummary: 'Defensive Offsides! Offense option: Take disc at Brick Mark + 10 Yards!',
        discAction: 'taken_at_brick_or_goal',
        stallAction: 'reset_to_1',
        stallExplanation: 'Stall begins at 1 once checked in.',
        calculatedStallResume: 1,
        isContested: false,
        ruleTitle: 'USAU Rule 9.B.4.d: Defensive Offsides Penalty',
        ruleCitation: 'USAU Rule 9.B.4.d',
        ruleUrl: 'https://usaultimate.org/rules/#9',
        explanation:
          'If the defense is offsides on the pull, the receiving team may elect to put the disc into play at their brick mark plus an additional 10 yards forward toward their attacking endzone, or at the spot the disc landed.',
        checkInProcedure: 'Offensive handler carries disc to designated spot, taps disc to turf to check it in.',
      };
    } else {
      return {
        possession: 'offense_receiver',
        possessionSummary: 'Offensive Offsides: Disc put into play at Goal Line or Brick.',
        discAction: 'taken_at_brick_or_goal',
        stallAction: 'reset_to_1',
        stallExplanation: 'Stall begins at 1 once checked in.',
        calculatedStallResume: 1,
        isContested: false,
        ruleTitle: 'USAU Rule 9.B.4.c: Offensive Offsides Penalty',
        ruleCitation: 'USAU Rule 9.B.4.c',
        ruleUrl: 'https://usaultimate.org/rules/#9',
        explanation:
          'If the receiving team is offsides, the pull is played without advantage; receiving team must check disc in at their defending goal line or brick mark if out of bounds.',
        checkInProcedure: 'Ground touch check-in by receiving team.',
      };
    }
  }

  // 10. RETRACTED CALL DEFAULT
  if (contestId === 'retracted') {
    const resumeCount = Math.min(8, countPlus1);
    return {
      possession: 'offense_thrower',
      possessionSummary: 'Call Retracted! Play resets to position prior to call.',
      discAction: outcomeId === 'completed' ? 'stays_with_receiver' : 'returned_to_thrower',
      stallAction: 'count_plus_1_max_8',
      stallExplanation: `Stall resumes at count reached plus 1, MAXIMUM 8 (resumes at ${resumeCount}).`,
      calculatedStallResume: resumeCount,
      isContested: false,
      ruleTitle: 'USAU Rule 15.A.5.b.2: Retracted Call Resolution',
      ruleCitation: 'USAU Rule 15.A.5.b.2',
      ruleUrl: 'https://usaultimate.org/rules/#15',
      explanation:
        'When a player calls an infraction or foul and subsequently retracts it after consultation, play resumes with stall count at count reached plus 1, maximum 8.',
      checkInProcedure: 'Standard defensive disc-check.',
    };
  }

  // General fallback
  const resumeCount = Math.min(8, countPlus1);
  return {
    possession: 'offense_thrower',
    possessionSummary: 'Play stopped. Disc returns to Thrower.',
    discAction: 'returned_to_thrower',
    stallAction: 'count_plus_1_max_8',
    stallExplanation: `Stall resumes at count reached plus 1, max 8 (resumes at ${resumeCount}).`,
    calculatedStallResume: resumeCount,
    isContested: contestId === 'contested',
    ruleTitle: 'USAU Rule 15.A: Stall Count Rules & Stoppages',
    ruleCitation: 'USAU Rule 15.A.5',
    ruleUrl: 'https://usaultimate.org/rules/#15',
    explanation:
      'General rule for play stoppages under USA Ultimate regulations. Review official rules for nuance.',
    checkInProcedure: 'Defensive check on disc.',
  };
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'preset_contested_huck_foul',
    title: 'Contested Deep Huck Foul',
    tagline: 'Deep pass contested contact in the air',
    category: 'receiving_foul',
    situationId: 'def_receiving_foul_air',
    outcomeId: 'turnover_ground',
    contestId: 'contested',
    initialStall: 7,
  },
  {
    id: 'preset_uncontested_endzone_foul',
    title: 'Uncontested Endzone Foul',
    tagline: 'Foul on receiver inside the endzone',
    category: 'receiving_foul',
    situationId: 'def_receiving_foul_air',
    outcomeId: 'caught_in_endzone',
    contestId: 'uncontested',
    initialStall: 6,
  },
  {
    id: 'preset_pick_mid_flight',
    title: 'Pick Called Mid-Flight',
    tagline: 'Defense calls pick while throw was in the air',
    category: 'pick',
    situationId: 'pick_in_air',
    outcomeId: 'completed',
    contestId: 'uncontested',
    initialStall: 5,
  },
  {
    id: 'preset_drop2_fastcount',
    title: 'Fast Count / Disc Space (Drop 2)',
    tagline: 'Marker rushes count or crowds pivot',
    category: 'marking_infraction',
    situationId: 'marking_fast_count',
    outcomeId: 'not_thrown',
    contestId: 'uncontested',
    initialStall: 7,
  },
  {
    id: 'preset_contested_stallout',
    title: 'Contested Stall-Out (8 on the Stall)',
    tagline: 'Thrower claims release happened before "T" of ten',
    category: 'stall_out',
    situationId: 'stall_out_call',
    outcomeId: 'not_thrown',
    contestId: 'contested',
    initialStall: 10,
  },
  {
    id: 'preset_uncontested_strip',
    title: 'Uncontested Strip',
    tagline: 'Disc knocked out of receiver’s grasp',
    category: 'strip',
    situationId: 'strip_call_receiver',
    outcomeId: 'completed',
    contestId: 'uncontested',
    initialStall: 4,
  },
  {
    id: 'preset_travel_pivot_drag',
    title: 'Travel on Throw Pivot',
    tagline: 'Pass was completed but pivot foot slid',
    category: 'travel',
    situationId: 'travel_pivot_drag',
    outcomeId: 'completed',
    contestId: 'uncontested',
    initialStall: 8,
  },
  {
    id: 'preset_defensive_offsides',
    title: 'Defensive Offsides on Pull',
    tagline: 'Defense crosses goal line before pull release',
    category: 'offsides_pull',
    situationId: 'offsides_defense',
    outcomeId: 'not_thrown',
    contestId: 'uncontested',
    initialStall: 1,
  },
];
