export interface ScenarioInput {
  teamA: string;
  teamB: string;
  venueId: string;
  tossWinner: string;
  tossDecision: "bat" | "field";
  dewFactor: number; // 0-100
  pitchGrip: number; // 0-100
  xFactorPlayerIds: string[];
  weights: {
    powerplay: number;
    middle: number;
    death: number;
    form: number;
  };
}

export interface ScenarioOutput {
  projectedTotalLow: number;
  projectedTotalHigh: number;
  chaseViability: number;
  battingEdge: number;
  bowlingEdge: number;
  keyDrivers: string[];
}
