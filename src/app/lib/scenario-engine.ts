import { ScenarioInput, ScenarioOutput } from "../types/scenario";

export function runScenario(input: ScenarioInput): ScenarioOutput {
  const base = 165;
  const battingBoost = input.weights.powerplay * 0.18 + input.weights.form * 0.12;
  const bowlingControl = input.weights.death * 0.16 + input.weights.middle * 0.10;

  const dewAdj = input.dewFactor * 0.22;
  const gripAdj = input.pitchGrip * 0.15;
  const tossAdj = input.tossDecision === "field" ? 6 : -2;
  const xFactorAdj = input.xFactorPlayerIds.length * 2.5;

  const projected = base + battingBoost - bowlingControl + dewAdj - gripAdj + tossAdj + xFactorAdj;

  return {
    projectedTotalLow: Math.round(projected - 11),
    projectedTotalHigh: Math.round(projected + 13),
    chaseViability: Math.max(1, Math.min(99, Math.round(58 + dewAdj * 0.3 - gripAdj * 0.2 + tossAdj))),
    battingEdge: Number((battingBoost + xFactorAdj / 2).toFixed(1)),
    bowlingEdge: Number((bowlingControl + gripAdj / 8).toFixed(1)),
    keyDrivers: [
      input.dewFactor > 60 ? "Heavy dew increases late chasing control" : "Limited dew impact",
      input.pitchGrip > 55 ? "Surface likely to assist slower balls and grip-based bowling" : "Surface looks freer for strokeplay",
      input.tossDecision === "field" ? "Field-first strategy supports chase calibration" : "Bat-first strategy favors scoreboard pressure",
    ],
  };
}
