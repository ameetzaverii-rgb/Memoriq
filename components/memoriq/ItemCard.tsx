import Link from "next/link";
import { MemorabiliaItem, formatValue, getRarityConfig } from "@/lib/memorabilia-data";
import Countdown from "./Countdown";

export default function ItemCard({ item }: { item: MemorabiliaItem }) {
  const rarity = getRarityConfig(item.rarity);
  const fill = Math.round((item.spotsUsed / item.totalSpots) * 100);

  return (
    <Link href={`/memorabilia/${item.id}`} style={{ textDecoration: "none" }}>
      <div style={{ background: "#0E0E14", border: `1px solid ${rarity.borderColor}`, borderRadius: 20, overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${rarity.glow}`; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        <div className={rarity.barClass} style={{ height: 3 }} />
        <div style={{ padding: "32px 24px 20px", textAlign: "center", background: `radial-gradient(ellipse at center, ${rarity.glow} 0%, transparent 70%)` }}>
          <div className="animate-float" style={{ fontSize: 64, lineHeight: 1 }}>{item.image}</div>
          <div style={{ display: "inline-block", marginTop: 12, padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.06)", border: `1px solid ${rarity.borderColor}`, fontSize: 11, fontWeight: 700, color: rarity.color, letterSpacing: "0.1em" }}>{rarity.label}</div>
        </div>
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.celebrity}</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>{item.title}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            <div style={{ background: "#16161F", borderRadius: 8, padding: "8px 10px" }}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Est. Value</div><div style={{ fontSize: 14, fontWeight: 700, color: "#F5A623" }}>{formatValue(item.estimatedValue)}</div></div>
            <div style={{ background: "#16161F", borderRadius: 8, padding: "8px 10px" }}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>XP Reward</div><div style={{ fontSize: 14, fontWeight: 700, color: "#A78BFA" }}>⚡ {item.xpReward}</div></div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Challengers</span><span style={{ fontSize: 12, fontWeight: 600 }}>{item.spotsUsed.toLocaleString()} / {item.totalSpots.toLocaleString()}</span></div>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 6, overflow: "hidden" }}><div style={{ height: "100%", width: `${fill}%`, background: `linear-gradient(90deg, ${rarity.color}, ${rarity.color}aa)`, borderRadius: 4, transition: "width 0.5s" }} /></div>
          </div>
          <div style={{ marginBottom: 16 }}><Countdown endsAt={item.endsAt} compact /></div>
          <button className="gold-gradient-btn" style={{ width: "100%", padding: "12px", borderRadius: 10, fontSize: 14, border: "none", cursor: "pointer" }}>Enter Challenge →</button>
        </div>
      </div>
    </Link>
  );
}
