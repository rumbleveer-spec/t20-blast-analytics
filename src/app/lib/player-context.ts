import { PlayerMatchLog } from "../types/player-context";

export function getRollingBatImpact(logs: PlayerMatchLog[], window = 5) {
  return logs.map((_, idx) => {
    const slice = logs.slice(Math.max(0, idx - window + 1), idx + 1);
    const avgRuns = slice.reduce((acc, l) => acc + l.runs, 0) / slice.length;
    const avgSR = slice.reduce((acc, l) => acc + l.strikeRate, 0) / slice.length;
    const avgPressure = slice.reduce((acc, l) => acc + l.pressureRating, 0) / slice.length;
    return Number((avgRuns * 0.55 + avgSR * 0.25 + avgPressure * 0.20).toFixed(2));
  });
}

export function getVolatilityScore(logs: PlayerMatchLog[]) {
  if (logs.length < 2) return 0;
  const mean = logs.reduce((acc, l) => acc + l.runs, 0) / logs.length;
  const variance =
    logs.reduce((acc, l) => acc + Math.pow(l.runs - mean, 2), 0) / logs.length;
  return Number(Math.sqrt(variance).toFixed(2));
}

export function getRecoveryAfterLowScore(logs: PlayerMatchLog[]) {
  const rebounds: number[] = [];
  for (let i = 1; i < logs.length; i++) {
    if (logs[i - 1].runs < 15) rebounds.push(logs[i].runs);
  }
  if (!rebounds.length) return null;
  return Number((rebounds.reduce((a, b) => a + b, 0) / rebounds.length).toFixed(2));
}
