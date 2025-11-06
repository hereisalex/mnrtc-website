'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TrafficChartProps = {
  data: Array<{ day: string; view_count: number }>;
};

export function TrafficChart({ data }: TrafficChartProps) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
          <XAxis
            dataKey="day"
            stroke="rgba(148, 163, 184, 0.75)"
            fontSize={12}
            tickFormatter={(value: string) => {
              const date = new Date(value);
              return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            }}
          />
          <YAxis
            stroke="rgba(148, 163, 184, 0.75)"
            fontSize={12}
            allowDecimals={false}
            width={48}
          />
          <Tooltip
            formatter={(value: number) => [`${value} views`, "Daily Total"]}
            labelFormatter={(value: string) => {
              const date = new Date(value);
              return date.toLocaleDateString(undefined, {
                weekday: "short",
                month: "long",
                day: "numeric",
              });
            }}
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              borderRadius: "0.75rem",
              border: "1px solid rgba(148,163,184,0.25)",
              color: "#f8fafc",
            }}
          />
          <Area
            type="monotone"
            dataKey="view_count"
            stroke="#38bdf8"
            fillOpacity={1}
            fill="url(#colorViews)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}


