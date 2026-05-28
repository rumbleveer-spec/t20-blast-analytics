import { runScenario } from "../lib/scenario-engine";
import { ScenarioLab } from "../components/ScenarioLab";
import { WinProbabilityPanel } from "../components/WinProbabilityPanel";
import { Lightbulb } from 'lucide-react';

export default function PredictionsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const input = {
    teamA: String(searchParams.teamA ?? "SUR"),
    teamB: String(searchParams.teamB ?? "HAM"),
    venueId: String(searchParams.venueId ?? "the-oval"),
    tossWinner: String(searchParams.tossWinner ?? "SUR"),
    tossDecision: (searchParams.tossDecision as "bat" | "field") ?? "field",
    dewFactor: Number(searchParams.dewFactor ?? 68),
    pitchGrip: Number(searchParams.pitchGrip ?? 41),
    xFactorPlayerIds: [],
    weights: {
      powerplay: 35,
      middle: 20,
      death: 25,
      form: 20,
    },
  };

  const result = runScenario(input);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Prediction & Scenario Lab</h1>
        <p className="text-foreground/70 mt-2">Server-driven projections and interactive win probabilities.</p>
      </div>

      <ScenarioLab />

      <div className="grid gap-4 md:grid-cols-5">
        <Stat label="Projected Low" value={result.projectedTotalLow} />
        <Stat label="Projected High" value={result.projectedTotalHigh} color="text-primary" />
        <Stat label="Chase Viability" value={`${result.chaseViability}%`} color="text-positive" />
        <Stat label="Batting Edge" value={result.battingEdge} />
        <Stat label="Bowling Edge" value={result.bowlingEdge} />
      </div>

      <div className="rounded-2xl border border-surface-hover bg-surface p-6">
        <h4 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
            <Lightbulb className="text-warning"/> Key Drivers
        </h4>
        <ul className="space-y-3 text-sm text-foreground/80">
          {result.keyDrivers.map((driver) => (
            <li key={driver} className="flex gap-2 items-start">
                <span className="text-primary shrink-0">&bull;</span>
                {driver}
            </li>
          ))}
        </ul>
      </div>

      {/* Integrate Feature 1 as well */}
      <WinProbabilityPanel initialVenueId="v-1" battingTeamId="t-1" bowlingTeamId="t-2" />
    </div>
  );
}

function Stat({ label, value, color = "text-white" }: { label: string; value: string | number, color?: string }) {
  return (
    <div className="rounded-xl border border-surface-hover bg-background p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-foreground/50 font-bold">{label}</div>
      <div className={`mt-2 text-3xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
