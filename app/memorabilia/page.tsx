"use client";

import { useState } from "react";
import { memorabiliaItems, Category } from "@/lib/memorabilia-data";
import ItemCard from "@/components/memoriq/ItemCard";
import UserBar from "@/components/memoriq/UserBar";

const categories: { label: string; value: "all" | Category }[] = [
  { label: "All", value: "all" },
  { label: "🏘 Cricket", value: "cricket" },
  { label: "⚽ Football", value: "football" },
  { label: "🎾 Tennis", value: "tennis" },
  { label: "🎬 Film", value: "film" },
  { label: "🎵 Music", value: "music" },
];

const totalValue = memorabiliaItems.reduce((s, i) => s + i.estimatedValue, 0);
const totalChallengers = memorabiliaItems.reduce((s, i) => s + i.spotsUsed, 0);

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState<"all" | Category>("all");

  const filtered =
    activeCategory === "all"
      ? memorabiliaItems
      : memorabiliaItems.filter((i) => i.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#060608" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(6,6,8,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em" }}>MEM<span style={{ color: "#F5A623" }}>O</span>RIQ</span>
          </a>
          <UserBar />
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.2)", borderRadius: 20, padding: "6px 14px", fontSize: 13, color: "#F5A623" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
            {memorabiliaItems.length} LIVE CHALLENGES
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 16 }}>
          Own a Piece of{" "}
          <span className="gold-gradient-text">Legend</span>
        </h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 540, lineHeight: 1.6, marginBottom: 40 }}>
          Prove your knowledge. Beat the challenge. Win authenticated iconic memorabilia from the greatest names in sport and culture.
        </p>

        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 48 }}>
          {[
            { label: "Challengers", value: totalChallengers.toLocaleString() },
            { label: "Live Items", value: memorabiliaItems.length.toString() },
            { label: "In Play", value: `$${(totalValue / 1000).toFixed(0)}K+` },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#F5A623" }}>{value}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {categories.map(({ label, value }) => (
            <button key={value} onClick={() => setActiveCategory(value)} style={{ padding: "8px 18px", borderRadius: 100, fontSize: 14, fontWeight: 600, border: "1px solid", cursor: "pointer", transition: "all 0.2s", background: activeCategory === value ? "#F5A623" : "transparent", borderColor: activeCategory === value ? "#F5A623" : "rgba(255,255,255,0.12)", color: activeCategory === value ? "#000" : "rgba(255,255,255,0.6)" }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {filtered.map((item) => (<ItemCard key={item.id} item={item} />))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.3)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18 }}>No items in this category yet</div>
          </div>
        )}
      </div>
    </div>
  );
}
