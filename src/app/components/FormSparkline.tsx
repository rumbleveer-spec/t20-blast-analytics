"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export function FormSparkline({ data }: { data: number[] }) {
  const chartData = data.map((value, i) => ({ index: i + 1, value }));

  return (
    <div className="h-32 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="impactFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis hide dataKey="index" />
          <Tooltip
            contentStyle={{
              background: "#09090b", // background
              border: "1px solid #27272a", // surface-hover
              borderRadius: "0.5rem",
              color: "#e4e4e7" // foreground
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2dd4bf"
            strokeWidth={2}
            fill="url(#impactFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
