import { notFound } from "next/navigation";
import Link from "next/link";
import { memorabiliaItems, getRarityConfig, formatValue } from "@/lib/memorabilia-data";
import UserBar from "@/components/memoriq/UserBar";
import Countdown from "@/components/memoriq/Countdown";

export function generateStaticParams() {
  return memorabiliaItems.map((item) => ({ id: item.id }));
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = memorabiliaItems.find((i) => i.id === params.id);
  if (!item) notFound();

  const rarity = getRarityConfig(item.rarity);
  const fill = Math.round((item.spotsUsed / item.totalSpots) * 100);
  const spotsLeft = item.totalSpots - item.spotsUsed;

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

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          <Link href="/memorabilia" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Vault</Link>
          <span>›</span>
          <span style={{ color: rarity.color }}>{rarity.label}</span>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.title}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>
        <div>
          <div style={{ background: "#0E0E14", border: `1px solid ${rarity.borderColor}`, borderRadius: 24, overflow: "hidden", marginBottom: 32 }}>
            <div className={rarity.barClass} style={{ height: 3 }} />
            <div style={{ padding: "60px 40px", textAlign: "center", background: `radial-gradient(ellipse at center, ${rarity.glow} 0%, transparent 70%)` }}>
              <div className="animate-float" style={{ fontSize: 100, lineHeight: 1, marginBottom: 20 }}>{item.image}</div>
              <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, background: "rgba(255,255,255,0.06)", border: `1px solid ${rarity.borderColor}`, fontSize: 12, fontWeight: 700, color: rarity.color, letterSpacing: "0.1em" }}>{rarity.label}</div>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.celebrity} · {item.category}</div>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>{item.title}</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {item.tags.map((tag) => (<span key={tag} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{tag}</span>))}
            </div>
          </div>

          <div style={{ background: "#0E0E14", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 16 }}>The Story</h3>
            <blockquote style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.75)", borderLeft: `3px solid ${rarity.color}`, paddingLeft: 20, margin: 0 }}>{item.story}</blockquote>
          </div>

          <div style={{ background: "#0E0E14", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 28 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 16 }}>Authentication</h3>
            {["Certificate of Authenticity included","Third-party expert verification","Holographic security seal","Provenance documentation","Secure tracked delivery"].map((a) => (
              <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.7)" }}><span style={{ color: "#22C55E", fontSize: 16 }}>✓</span>{a}</div>
            ))}
          </div>
        </div>

        <div style={{ position: "sticky", top: 80 }}>
          <div style={{ background: "#0E0E14", border: `1px solid ${rarity.borderColor}`, borderRadius: 20, overflow: "hidden" }}>
            <div className={rarity.barClass} style={{ height: 3 }} />
            <div style={{ padding: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                <div style={{ background: "#16161F", borderRadius: 10, padding: "14px 16px" }}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Est. Value</div><div style={{ fontSize: 22, fontWeight: 900, color: "#F5A623" }}>{formatValue(item.estimatedValue)}</div></div>
                <div style={{ background: "#16161F", borderRadius: 10, padding: "14px 16px" }}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>XP Reward</div><div style={{ fontSize: 22, fontWeight: 900, color: "#A78BFA" }}>⚡ {item.xpReward}</div></div>
                <div style={{ background: "#16161F", borderRadius: 10, padding: "14px 16px" }}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Winners</div><div style={{ fontSize: 22, fontWeight: 900 }}>{item.winnersCount}</div></div>
                <div style={{ background: "#16161F", borderRadius: 10, padding: "14px 16px" }}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Spots Left</div><div style={{ fontSize: 22, fontWeight: 900, color: spotsLeft < 100 ? "#EF4444" : "#fff" }}>{spotsLeft.toLocaleString()}</div></div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Challenge Closes In</div>
                <Countdown endsAt={item.endsAt} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Challengers joined</span><span style={{ fontSize: 13, fontWeight: 600 }}>{fill}%</span></div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 8, overflow: "hidden" }}><div style={{ height: "100%", width: `${fill}%`, background: `linear-gradient(90deg, ${rarity.color}, ${rarity.color}aa)`, borderRadius: 6 }} /></div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{item.spotsUsed.toLocaleString()} of {item.totalSpots.toLocaleString()} joined</div>
              </div>

              <div style={{ background: "rgba(245,166,35,0.06)", border: "1px solid rgba(245,166,35,0.15)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#F5A623", marginBottom: 8 }}>{item.challenge.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: 12 }}>{item.challenge.description}</div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Questions</div><div style={{ fontSize: 15, fontWeight: 700 }}>{item.challenge.questions.length}</div></div>
                  <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Min Score</div><div style={{ fontSize: 15, fontWeight: 700, color: "#22C55E" }}>{item.challenge.minScoreToQualify}%</div></div>
                  <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Time/Q</div><div style={{ fontSize: 15, fontWeight: 700 }}>20s</div></div>
                </div>
              </div>

              <Link href={`/memorabilia/${item.id}/challenge`} style={{ textDecoration: "none" }}>
                <button className="gold-gradient-btn" style={{ width: "100%", padding: "16px", borderRadius: 12, fontSize: 16, border: "none", cursor: "pointer" }}>START CHALLENGE →</button>
              </Link>
              <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>Score {item.challenge.minScoreToQualify}% or higher to enter the draw</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
