export interface WeatherContext {
  tempC: number;
  humidity: number;
  dewExpected: boolean;
  cloudCover: number;
}

export interface VenueConditionProfile {
  paceFriendly: boolean;
  spinFriendly: boolean;
  shortBoundaries: boolean;
  highAltitude: boolean;
}

export interface VenueSeasonStats {
  season: string;
  avgFirstInnings: number;
  avgSecondInnings: number;
  chaseWinPercentage: number;
  tossImpactEstimate: number;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  avgFirstInnings: number;
  avgSecondInnings: number;
  highestTotal: number;
  lowestTotal: number;
  chaseWinPercentage: number;
  tossImpactEstimate: number;
  powerplayScoringAvg: number;
  deathOversRunRate: number;
  paceVsSpinEfficiency: {
    paceStrikeRate: number;
    spinStrikeRate: number;
    paceEconomy: number;
    spinEconomy: number;
  };
  boundaryNotes: string;
  weatherNotes: string;
  conditionProfile: VenueConditionProfile;
  recentTrends: VenueSeasonStats[];
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface PlayerForm {
  matches: number;
  runs: number;
  strikeRate: number;
  wickets: number;
  economy: number;
  recentScores: number[];
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  battingHand: 'Right' | 'Left';
  bowlingType?: 'Right-Arm Fast' | 'Left-Arm Fast' | 'Off-Spin' | 'Leg-Spin' | 'Left-Arm Orthodox';
  form: PlayerForm;
  venuePreferences: string[]; // venue ids
  performanceSplits: {
    battingFirstVsChasing: { first: number; chase: number };
    powerplay: number;
    middleOvers: number;
    deathOvers: number;
    knockoutPressure: number;
    afterRest: number;
  };
  riskFlags: string[];
  strengths: string[];
}

export interface Matchup {
  batsmanId: string;
  bowlerId: string;
  runs: number;
  balls: number;
  dismissals: number;
  strikeRate: number;
  edgeScore: number;
}

export interface PredictionInput {
  teamAId: string;
  teamBId: string;
  venueId: string;
  tossWinnerId: string;
  tossDecision: 'Bat' | 'Bowl';
  weather: WeatherContext;
  weights: {
    powerplayPerformance: number;
    deathBowlingQuality: number;
    middleOversStability: number;
    venueFamiliarity: number;
    recentPlayerForm: number;
  };
}

export interface PredictionOutput {
  projectedFirstInningsRange: [number, number];
  chaseViabilityIndex: number;
  venueSuitabilityScore: number;
  bowlingControlScore: number;
  battingExplosivenessScore: number;
  confidenceBand: number;
  topReasons: string[];
  redFlags: string[];
}

export interface ResearchNote {
  id: string;
  title: string;
  content: string; // Markdown
  tags: string[];
  anomalies: string[];
  lastUpdated: string;
  pinned: boolean;
}
