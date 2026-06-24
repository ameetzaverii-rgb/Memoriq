/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { memorabiliaItems } from "@/lib/memorabilia-data";
import Link from "next/link";

const SECONDS_PER_Q = 20;

type Phase = "playing" | "result";
type AnswerState = "unanswered" | "correct" | "wrong";

interface XPPop {
  id: number;
  amount: number;
}

export default function ChallengePage() {
  const params = useParams();
  const item = memorabiliaItems.find((i) => i.id === params.id);

  const [phase, setPhase] = useState<Phase>("playing");
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_Q);
  const [xpPops, setXpPops] = useState<XPPop[]>([]);
  const popId = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const advanceRef = useRef<NodeJS.Timeout | null>(null);

  const questions = useMemo(() => item?.challenge.questions ?? [], [item]);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceRef.current) clearTimeout(advanceRef.current);
  }, []);

  const finishGame = useCallback(
    (finalAnswers: (number | null)[], finalXp: number) => {
      const correct = finalAnswers.filter((a, i) => a === questions[i]?.correct).length;
      const scorePercent = Math.round((correct / questions.length) * 100);
      setPhase("result");
      import("@/lib/memoriq-auth")
        .then(({ saveAttempt }) => {
          if (!item) return;
          saveAttempt("anonymous", item.id, scorePercent, finalXp, scorePercent >= item.challenge.minScoreToQualify, finalAnswers.map((a) => a ?? -1)).catch(() => {});
        })
        .catch(() => {});
    },
    [item, questions]
  );

  const advance = useCallback(
    (selectedIndex: number | null, currentAnswers: (number | null)[], currentXp: number) => {
      clearTimers();
      const newAnswers = [...currentAnswers, selectedIndex];
      if (qIndex + 1 >= questions.length) {
        setAnswers(newAnswers);
        finishGame(newAnswers, currentXp);
      } else {
        advanceRef.current = setTimeout(() => {
          setAnswers(newAnswers);
          setQIndex((q) => q + 1);
          setSelected(null);
          setAnswerState("unanswered");
          setTimeLeft(SECONDS_PER_Q);
        }, 1500);
      }
    },
    [clearTimers, finishGame, qIndex, questions.length]
  );

  function handleAnswer(optionIndex: number) {
    if (answerState !== "unanswered" || !item) return;
    setSelected(optionIndex);
    const q = questions[qIndex];
    const isCorrect = optionIndex === q.correct;
    setAnswerState(isCorrect ? "correct" : "wrong");
    let newXp = xp;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const multiplier = Math.min(newStreak, 3);
      const earned = 50 * multiplier;
      newXp = xp + earned;
      setXp(newXp);
      const pid = ++popId.current;
      setXpPops((prev) => [...prev, { id: pid, amount: earned }]);
      setTimeout(() => setXpPops((prev) => prev.filter((p) => p.id !== pid)), 1000);
    } else {
      setStreak(0);
    }
    advance(optionIndex, answers, newXp);
  }

  useEffect(() => {
    if (phase !== "playing" || answerState !== "unanswered") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimers();
          setAnswerState("wrong");
          setStreak(0);
          advance(null, answers, xp);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return clearTimers;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex, phase, answerState]);

  if (!item) {
    return (
      <div style={{ minHeight: "100vh", background: "#060608", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
        Item not found.{" "}
        <Link href="/memorabilia" style={{ color: "#F5A623", marginLeft: 8 }}>Back to Vault</Link>
      </div>
    );
  }

  const q = questions[qIndex];
  const timerPct = (timeLeft / SECONDS_PER_Q) * 100;
  const timerDanger = timerPct < 30;

  if (phase === "result") {
    return <ResultScreen item={item} answers={answers} questions={questions} xp={xp} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#060608", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#0E0E14", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>{item.image}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{item.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {streak >= 2 && (
            <div style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.3)", borderRadius: 8, padding: "4px 10px", fontSize: 13, fontWeight: 700, color: "#F5A623" }}>
              🔥 {streak}× Streak
            </div>
          )}
          <div style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 8, padding: "4px 10px", fontSize: 13, fontWeight: 700, color: "#A78BFA" }}>
            ⚡ {xp} XP
          </div>
        </div>
      </div>

      <div style={{ height: 4, background: "rgba(255,255,255,0.06)" }}>
        <div style={{ height: "100%", width: `${timerPct}%`, background: timerDanger ? "linear-gradient(90deg, #EF4444, #F87171)" : "linear-gradient(90deg, #22C55E, #4ADE80)", transition: "width 1s linear, background 0.3s" }} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", position: "relative" }}>
        {xpPops.map((pop) => (
          <div key={pop.id} className="animate-xp-pop" style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", fontSize: 24, fontWeight: 900, color: "#F5A623", pointerEvents: "none", zIndex: 10 }}>
            +{pop.amount} XP
          </div>
        ))}

        <div style={{ width: "100%", maxWidth: 680 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 32, justifyContent: "center" }}>
            {questions.map((_, i) => {
              const done = i < qIndex;
              const current = i === qIndex;
              const wasCorrect = done && answers[i] === questions[i].correct;
              return <div key={i} style={{ width: current ? 24 : 10, height: 10, borderRadius: 5, background: done ? (wasCorrect ? "#22C55E" : "#EF4444") : current ? "#F5A623" : "rgba(255,255,255,0.1)", transition: "all 0.2s" }} />;
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Question {qIndex + 1} of {questions.length}</span>
            <span style={{ fontSize: 24, fontWeight: 900, color: timerDanger ? "#EF4444" : "rgba(255,255,255,0.7)", minWidth: 40, textAlign: "right", transition: "color 0.3s" }}>{timeLeft}s</span>
          </div>

          <h2 key={qIndex} className="animate-fade-in" style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 800, lineHeight: 1.3, marginBottom: 32, textAlign: "center" }}>
            {q.question}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {q.options.map((option, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.correct;
              const revealed = answerState !== "unanswered";
              let bg = "#0E0E14", border = "rgba(255,255,255,0.08)", textColor = "rgba(255,255,255,0.8)";
              if (revealed) {
                if (isCorrect) { bg = "rgba(34,197,94,0.15)"; border = "#22C55E"; textColor = "#fff"; }
                else if (isSelected) { bg = "rgba(239,68,68,0.15)"; border = "#EF4444"; textColor = "rgba(255,255,255,0.6)"; }
              } else if (isSelected) { bg = "rgba(245,166,35,0.1)"; border = "#F5A623"; }
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={revealed} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: "16px 20px", textAlign: "left", fontSize: 15, color: textColor, cursor: revealed ? "default" : "pointer", transition: "all 0.2s", fontFamily: "inherit", fontWeight: 500, lineHeight: 1.4 }}>
                  <span style={{ display: "inline-block", width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.06)", fontSize: 12, fontWeight: 700, textAlign: "center", lineHeight: "24px", marginRight: 10, verticalAlign: "middle" }}>{String.fromCharCode(65 + i)}</span>
                  {option}
                </button>
              );
            })}
          </div>

          {answerState !== "unanswered" && (
            <div className="animate-fade-in" style={{ marginTop: 20, background: answerState === "correct" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${answerState === "correct" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: 12, padding: "14px 18px", fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700, color: answerState === "correct" ? "#22C55E" : "#EF4444", marginRight: 8 }}>{answerState === "correct" ? "✓ Correct!" : "✗ Wrong!"}</span>
              {q.explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultScreen({ item, answers, questions, xp }: { item: (typeof memorabiliaItems)[0]; answers: (number | null)[]; questions: (typeof memorabiliaItems)[0]["challenge"]["questions"]; xp: number; }) {
  const correct = answers.filter((a, i) => a === questions[i].correct).length;
  const total = questions.length;
  const score = Math.round((correct / total) * 100);
  const qualified = score >= item.challenge.minScoreToQualify;
  const ringCirc = 2 * Math.PI * 45;
  const ringOffset = ringCirc - (score / 100) * ringCirc;

  return (
    <div style={{ minHeight: "100vh", background: "#060608", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 560 }} className="animate-scale-in">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <svg width={120} height={120} style={{ display: "block", margin: "0 auto 16px" }}>
            <circle cx={60} cy={60} r={45} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
            <circle cx={60} cy={60} r={45} fill="none" stroke={qualified ? "#22C55E" : "#EF4444"} strokeWidth={8} strokeLinecap="round" strokeDasharray={ringCirc} strokeDashoffset={ringOffset} transform="rotate(-90 60 60)" style={{ transition: "stroke-dashoffset 1s ease-out" }} />
            <text x={60} y={55} textAnchor="middle" fill="#fff" fontSize={22} fontWeight={900}>{score}%</text>
            <text x={60} y={73} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={11}>SCORE</text>
          </svg>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: qualified ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${qualified ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: 100, padding: "6px 18px", fontSize: 14, fontWeight: 700, color: qualified ? "#22C55E" : "#EF4444", marginBottom: 12 }}>
            {qualified ? "✓ DRAW QUALIFIED" : "✗ NOT QUALIFIED"}
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>{qualified ? "You're in the Draw! 🎉" : "Better luck next time"}</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
            {qualified ? `You scored ${score}% and are now entered into the draw for ${item.title}` : `You needed ${item.challenge.minScoreToQualify}% to qualify. You scored ${score}%.`}
          </p>
        </div>

        <div style={{ background: "#0E0E14", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>XP Breakdown</h3>
          {[{ label: `Correct answers (${correct}/${total})`, value: correct * 50 }, { label: "Streak bonus", value: Math.max(0, xp - correct * 50) }].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14 }}>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>{label}</span>
              <span style={{ fontWeight: 700, color: "#A78BFA" }}>+{value} XP</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 16, fontWeight: 900 }}>
            <span>Total Earned</span>
            <span style={{ color: "#F5A623" }}>⚡ {xp} XP</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Link href={`/memorabilia/${item.id}`} style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", padding: "14px", borderRadius: 12, fontSize: 14, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>← Back to Item</button>
          </Link>
          <Link href="/memorabilia" style={{ textDecoration: "none" }}>
            <button className="gold-gradient-btn" style={{ width: "100%", padding: "14px", borderRadius: 12, fontSize: 14, border: "none", cursor: "pointer" }}>Browse More →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
