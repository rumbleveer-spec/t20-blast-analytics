import { FormSparkline } from "../../components/FormSparkline";
import { getRollingBatImpact, getRecoveryAfterLowScore, getVolatilityScore } from "../../lib/player-context";
import type { PlayerMatchLog } from "../../types/player-context";
import { Activity } from 'lucide-react';

export function PlayerContextSection({ logs }: { logs: PlayerMatchLog[] }) {
  if (!logs || logs.length === 0) return null;

  const rolling = getRollingBatImpact(logs);
  const volatility = getVolatilityScore(logs);
  const rebound = getRecoveryAfterLowScore(logs);

  return (
    <section className="rounded-2xl border border-surface-hover bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="text-primary"/> Contextual Form Graph
        </h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          Volatility {volatility}
        </span>
      </div>

      <FormSparkline data={rolling} />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Info label="Recovery after low score" value={rebound ? rebound.toString() : "N/A"} />
        <Info
          label="Best use-case"
          value={logs.some((l) => l.pressureRating > 70) ? "Pressure-capable" : "Low-pressure optimizer"}
        />
        <Info
          label="Model note"
          value={volatility > 18 ? "High-variance player" : "Stable performer"}
        />
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-surface-hover bg-background p-4">
      <div className="text-xs uppercase tracking-wide text-foreground/50">{label}</div>
      <div className="mt-2 text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}
