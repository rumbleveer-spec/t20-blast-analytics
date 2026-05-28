import { MatchState, WinProbabilityOutput } from "./win-probability";

type TeamStrengthContext = {
  battingRating: number; // 0-100
  bowlingRating: number; // 0-100
  venueBias: number; // -10 to +10; positive favors batting team
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function getWinProbability(
  state: MatchState,
  ctx: TeamStrengthContext
): WinProbabilityOutput {
  const ballsRemaining = state.innings === 1 ? 120 - state.ballsBowled : 240 - state.ballsBowled;
  const wicketsInHand = 10 - state.wicketsLost;
  const currentRunRate = state.ballsBowled > 0 ? (state.runsScored / state.ballsBowled) * 6 : 0;

  const requiredRuns =
    state.innings === 2 && state.target ? Math.max(state.target - state.runsScored, 0) : 0;
  const requiredRate =
    state.innings === 2 && ballsRemaining > 0 ? (requiredRuns / ballsRemaining) * 6 : 0;

  const runsMomentum = ballsRemaining > 0 ? wicketsInHand / ballsRemaining : 0;
  const performanceIndex = currentRunRate * wicketsInHand;
  const chasePressureIndex =
    state.innings === 2 ? requiredRate * (1 + (10 - wicketsInHand) * 0.06) : 0;

  let base = 50;

  if (state.innings === 1) {
    const projectedTotal = currentRunRate * 20 + wicketsInHand * 1.8;
    base += (projectedTotal - 165) * 0.35;
    base += (wicketsInHand - 5) * 1.8;
    base += ctx.venueBias * 0.8;
  } else {
    base += (currentRunRate - requiredRate) * 6.5;
    base += (wicketsInHand - 4) * 2.4;
    base -= Math.max(requiredRate - 10, 0) * 3.2;
    base += ctx.venueBias * 0.6;
  }

  const battingStrengthAdj = (ctx.battingRating - 50) * 0.35;
  const bowlingStrengthAdj = (50 - ctx.bowlingRating) * 0.30;
  const venueAdj = ctx.venueBias;
  const pressureAdj = state.innings === 2 ? -chasePressureIndex * 1.4 : runsMomentum * 120;
  const wicketsAdj = (wicketsInHand - 5) * 1.2;

  const winProbability = clamp(
    base + battingStrengthAdj + bowlingStrengthAdj + pressureAdj + wicketsAdj,
    1,
    99
  );

  const projectedTotal =
    state.innings === 1
      ? Math.round(currentRunRate * 20 + wicketsInHand * 1.8)
      : state.target
        ? state.target - requiredRuns + Math.max(0, Math.round((currentRunRate - 1.5) * (ballsRemaining / 6)))
        : Math.round(state.runsScored);

  return {
    winProbability: Number(winProbability.toFixed(1)),
    projectedTotal,
    chasePressureIndex: Number(chasePressureIndex.toFixed(2)),
    performanceIndex: Number(performanceIndex.toFixed(2)),
    breakdown: {
      base: Number(base.toFixed(2)),
      battingStrengthAdj: Number(battingStrengthAdj.toFixed(2)),
      bowlingStrengthAdj: Number(bowlingStrengthAdj.toFixed(2)),
      venueAdj: Number(venueAdj.toFixed(2)),
      pressureAdj: Number(pressureAdj.toFixed(2)),
      wicketsAdj: Number(wicketsAdj.toFixed(2)),
    },
  };
}
