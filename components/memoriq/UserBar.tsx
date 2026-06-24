"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "firebase/auth";
import { onAuthChange, signOut } from "@/lib/memoriq-auth";
import AuthModal from "./AuthModal";

export default function UserBar() {
  const [user, setUser] = useState<User | null>(null);
  const [xp, setXp] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u);
      if (u) {
        try {
          const { getDb } = await import("@/lib/firebase");
          const { doc, getDoc } = await import("firebase/firestore");
          const snap = await getDoc(doc(getDb(), "memoriq_profiles", u.uid));
          if (snap.exists()) setXp(snap.data().totalXp || 0);
        } catch {}
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) {
    return (
      <>
        <button onClick={() => setShowModal(true)} className="gold-gradient-btn" style={{ padding: "8px 18px", borderRadius: 8, fontSize: 14, border: "none", cursor: "pointer" }}>Sign In</button>
        {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      </>
    );
  }

  const displayName = user.email?.split("@")[0] || "Player";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setShowDropdown(!showDropdown)} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "6px 12px", cursor: "pointer" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #F5A623, #C17D0E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#000" }}>{initials}</div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{displayName}</div>
          <div style={{ fontSize: 11, color: "#F5A623" }}>⚡ {xp.toLocaleString()} XP</div>
        </div>
      </button>
      {showDropdown && (
        <div className="animate-fade-in" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#0E0E14", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, width: 180, overflow: "hidden", zIndex: 100 }}>
          <a href="/memorabilia" style={{ display: "block", padding: "12px 16px", fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>🏆 My Entries</a>
          <button onClick={() => signOut()} style={{ width: "100%", textAlign: "left", padding: "12px 16px", fontSize: 14, color: "rgba(255,255,255,0.5)", background: "transparent", border: "none", cursor: "pointer", borderTop: "1px solid rgba(255,255,255,0.06)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>Sign Out</button>
        </div>
      )}
    </div>
  );
}
