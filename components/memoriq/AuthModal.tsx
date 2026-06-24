"use client";

import { useState } from "react";
import { sendMagicLink } from "@/lib/memoriq-auth";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      await sendMagicLink(email);
      setSent(true);
    } catch {
      setError("Failed to send link. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md animate-scale-in" style={{ background: "#0E0E14", border: "1px solid rgba(245,166,35,0.2)", borderRadius: "20px", padding: "40px" }}>
        {!sent ? (
          <>
            <div className="text-center mb-8">
              <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
              <h2 className="text-2xl font-black mb-2">Join MEMORIQ</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Sign in with your email to start winning legendary memorabilia</p>
            </div>
            <form onSubmit={handleSubmit}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required style={{ width: "100%", background: "#16161F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 16, marginBottom: 16, outline: "none" }} />
              {error && <p style={{ color: "#EF4444", fontSize: 13, marginBottom: 12 }}>{error}</p>}
              <button type="submit" disabled={loading} className="gold-gradient-btn w-full" style={{ padding: "14px", borderRadius: 10, fontSize: 15, border: "none", cursor: "pointer", width: "100%" }}>
                {loading ? "Sending..." : "Send Magic Link →"}
              </button>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textAlign: "center", marginTop: 12 }}>No password needed. Just click the link in your email.</p>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
            <h2 className="text-2xl font-black mb-3">Check your email</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>We sent a magic link to <strong style={{ color: "#fff" }}>{email}</strong>.<br />Click it to sign in instantly.</p>
            <button onClick={onClose} style={{ marginTop: 24, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 24px", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 14 }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
