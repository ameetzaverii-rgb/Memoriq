"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { completeSignIn } from "@/lib/memoriq-auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    async function finish() {
      try {
        const user = await completeSignIn(window.location.href);
        if (user) {
          setStatus("success");
          setTimeout(() => router.push("/memorabilia"), 1500);
        } else {
          setError("This link is invalid or has expired.");
          setStatus("error");
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Sign in failed. Please try again.");
        setStatus("error");
      }
    }
    finish();
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", background: "#060608", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 24 }}>
      {status === "loading" && (<><div style={{ fontSize: 48 }}>⏳</div><h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>Signing you in...</h2><p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Just a moment</p></>)}
      {status === "success" && (<><div style={{ fontSize: 48 }}>🎉</div><h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>You&apos;re in!</h2><p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Redirecting to the Vault...</p></>)}
      {status === "error" && (<><div style={{ fontSize: 48 }}>❌</div><h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>Sign in failed</h2><p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, textAlign: "center", maxWidth: 340 }}>{error}</p><a href="/memorabilia" style={{ marginTop: 8, padding: "12px 24px", borderRadius: 10, background: "linear-gradient(135deg, #F5A623, #C17D0E)", color: "#000", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>Return to Vault</a></>)}
    </div>
  );
}
