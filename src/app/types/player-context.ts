export interface PlayerPhaseSplit {
  powerplaySR: number;
  middleOversSR: number;
  deathOversSR: number;
  vsPaceAvg: number;
  vsSpinAvg: number;
  chasingAvg: number;
  battingFirstAvg: number;
}

export interface PlayerMatchLog {
  matchId: string;
  opponent: string;
  venueId: string;
  runs: number;
  balls: number;
  strikeRate: number;
  phaseImpact: number;
  pressureRating: number; // 0-100
  date: string;
}

export interface PlayerContextProfile {
  playerId: string;
  rollingForm: number[];
  baselineForm: number[];
  phaseSplit: PlayerPhaseSplit;
  matchLogs: PlayerMatchLog[];
}
