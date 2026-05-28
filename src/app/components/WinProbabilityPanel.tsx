"use client";

import { useState } from "react";

type Props = {
  initialVenueId: string;
  battingTeamId: string;
  bowlingTeamId: string;
};

export function WinProbabilityPanel({
  initialVenueId,
  battingTeamId,
  bowlingTeamId,
}: Props) {
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    innings: 2,
    ballsBowled: 150,
    runsScored: 132,
    wicketsLost: 4,
    target: 174,
    venueId: initialVenueId,
    battingTeamId,
    bowlingTeamId,
  });

  async function calculate() {
    const res = await fetch("/api/win-probability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        state: form,
        context: {
          battingRating: 64,
          bowlingRating: 56,
          venueBias: 3,
        },
      }),
    });
    const data = await res.json();
    setResult(data);
  }

  return (
    <div className="rounded-2xl border border-surface-hover bg-surface p-5 mt-6">
      <h3 className="mb-4 text-lg font-semibold text-primary">Win Probability Engine</h3>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["ballsBowled", "Balls Bowled"],
          ["runsScored", "Runs Scored"],
          ["wicketsLost", "Wickets Lost"],
          ["target", "Target"],
        ].map(([key, label]) => (
          <label key={key} className="text-sm text-foreground/70">
            <span className="mb-1 block">{label}</span>
            <input
              type="number"
              value={(form as any)[key]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [key]: Number(e.target.value) }))
              }
              className="w-full rounded-lg border border-surface-hover bg-background px-3 py-2 text-foreground"
            />
          </label>
        ))}
      </div>

      <button
        onClick={calculate}
        className="mt-4 rounded-xl bg-primary px-4 py-2 font-medium text-background hover:bg-primary-focus transition-colors"
      >
        Calculate Win Probability
      </button>

      {result && (
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <MetricCard label="Win %" value={`${result.winProbability}%`} color="text-positive" />
          <MetricCard label="Projected Total" value={result.projectedTotal} />
          <MetricCard label="Pressure Index" value={result.chasePressureIndex} color="text-warning" />
          <MetricCard label="Performance Index" value={result.performanceIndex} />
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, color = "text-foreground" }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="rounded-xl border border-surface-hover bg-background p-4">
      <div className="text-xs uppercase tracking-wide text-foreground/50">{label}</div>
      <div className={`mt-2 text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
