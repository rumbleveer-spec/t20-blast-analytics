export interface MatchState {
  innings: 1 | 2;
  ballsBowled: number;
  runsScored: number;
  wicketsLost: number;
  target?: number;
  venueId: string;
  battingTeamId: string;
  bowlingTeamId: string;
}

export interface WinProbabilityBreakdown {
  base: number;
  battingStrengthAdj: number;
  bowlingStrengthAdj: number;
  venueAdj: number;
  pressureAdj: number;
  wicketsAdj: number;
}

export interface WinProbabilityOutput {
  winProbability: number;
  projectedTotal: number;
  chasePressureIndex: number;
  performanceIndex: number;
  breakdown: WinProbabilityBreakdown;
}
