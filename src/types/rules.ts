/**
 * Types for USA Ultimate Rules & Call Resolution Engine
 */

export type CallerType = 'offense' | 'defense' | 'either';

export type CallCategory =
  | 'throwing_foul'
  | 'receiving_foul'
  | 'marking_infraction'
  | 'pick'
  | 'travel'
  | 'stall_out'
  | 'strip'
  | 'out_of_bounds'
  | 'dangerous_play'
  | 'inadvertent_call'
  | 'offsides_pull'
  | 'double_team';

export type ContestStatus = 'uncontested' | 'contested' | 'retracted';

export type ThrowOutcome =
  | 'not_thrown'
  | 'completed'
  | 'turnover_ground'
  | 'turnover_intercepted'
  | 'caught_in_endzone';

export type StallAction =
  | 'reset_to_1'
  | 'drops_2'
  | 'max_6'
  | 'max_8'
  | 'max_9'
  | 'count_plus_1_max_6'
  | 'count_plus_1_max_8'
  | 'count_plus_1_max_9'
  | 'unchanged'
  | 'turnover';

export interface RuleDecision {
  possession: 'offense_thrower' | 'offense_receiver' | 'turnover_defense' | 're_pull';
  possessionSummary: string;
  discAction: 'returned_to_thrower' | 'stays_with_receiver' | 'placed_at_infraction_spot' | 'turnover_at_spot' | 'play_continues' | 'taken_at_brick_or_goal';
  stallAction: StallAction;
  stallExplanation: string;
  calculatedStallResume: number; // e.g. if input stall is 7 and rule is max 6, this evaluates to 6
  isContested: boolean;
  ruleTitle: string;
  ruleCitation: string;
  ruleUrl: string;
  explanation: string;
  checkInProcedure: string;
}

export interface CallSituationOption {
  id: string;
  label: string;
  category: CallCategory;
  caller: CallerType;
  description: string;
  possibleOutcomes: string[]; // references to possible throw outcomes
  ruleCitation: string;
  ruleUrl: string;
}

export interface PresetScenario {
  id: string;
  title: string;
  tagline: string;
  category: CallCategory;
  situationId: string;
  outcomeId: ThrowOutcome;
  contestId: ContestStatus;
  initialStall: number;
}
