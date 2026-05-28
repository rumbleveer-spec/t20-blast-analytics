"use client";

import { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

export function ScenarioLab() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const scenario = useMemo(() => {
    return {
      teamA: params.get("teamA") ?? "SUR",
      teamB: params.get("teamB") ?? "HAM",
      venueId: params.get("venueId") ?? "the-oval",
      tossWinner: params.get("tossWinner") ?? "SUR",
      tossDecision: (params.get("tossDecision") as "bat" | "field") ?? "field",
      dewFactor: Number(params.get("dewFactor") ?? 68),
      pitchGrip: Number(params.get("pitchGrip") ?? 41),
    };
  }, [params]);

  function updateParam(key: string, value: string | number) {
    const next = new URLSearchParams(params.toString());
    next.set(key, String(value));
    startTransition(() => {
      router.push(`/predictions?${next.toString()}`);
    });
  }

  return (
    <div className="rounded-2xl border border-surface-hover bg-surface p-6">
      <h3 className="mb-6 text-xl font-bold text-primary flex items-center gap-2">
         <SlidersHorizontal /> Scenario Lab
      </h3>

      <div className="grid gap-8 md:grid-cols-2">
        <RangeControl
          label="Dew Factor (Affects chasing viablity)"
          value={scenario.dewFactor}
          onChange={(v) => updateParam("dewFactor", v)}
        />
        <RangeControl
          label="Pitch Grip (Affects middle overs control)"
          value={scenario.pitchGrip}
          onChange={(v) => updateParam("pitchGrip", v)}
        />
      </div>

      <div className="mt-6 text-sm text-foreground/50 font-mono bg-background p-2 rounded inline-block">
        {isPending ? "Recalculating engine..." : "State is securely synced via URL parameters"}
      </div>
    </div>
  );
}

function RangeControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-3 flex items-center justify-between text-sm text-foreground/70 font-bold">
        <span>{label}</span>
        <span className="text-primary bg-primary/10 px-2 py-1 rounded-md">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary h-2 bg-surface-hover rounded-lg appearance-none cursor-pointer"
      />
    </label>
  );
}
