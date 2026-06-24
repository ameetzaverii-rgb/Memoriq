"use client";

import { useEffect, useState } from "react";
import { getTimeRemaining } from "@/lib/memorabilia-data";

export default function Countdown({ endsAt, compact = false }: { endsAt: string; compact?: boolean }) {
  const [time, setTime] = useState(getTimeRemaining(endsAt));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeRemaining(endsAt)), 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  if (compact) {
    const label = time.days > 0 ? `${time.days}d ${time.hours}h` : time.hours > 0 ? `${time.hours}h ${time.minutes}m` : `${time.minutes}m ${time.seconds}s`;
    return <span style={{ color: time.isUrgent ? "#EF4444" : "rgba(255,255,255,0.5)", fontSize: 13 }}>{time.isUrgent ? "🔴" : "⏳"} {label}</span>;
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {[{ v: time.days, l: "Days" }, { v: time.hours, l: "Hours" }, { v: time.minutes, l: "Min" }, { v: time.seconds, l: "Sec" }].map(({ v, l }) => (
        <div key={l} style={{ background: "#16161F", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", textAlign: "center", minWidth: 52 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: time.isUrgent ? "#EF4444" : "#fff", lineHeight: 1 }}>{String(v).padStart(2, "0")}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
        </div>
      ))}
    </div>
  );
}
