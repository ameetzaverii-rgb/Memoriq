"use client";

import {
  ActionCodeSettings,
  User,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getAuthInstance, getDb } from "./firebase";

export const AUTH_EMAIL_KEY = "memoriq_signin_email";

export async function sendMagicLink(email: string): Promise<void> {
  const actionCodeSettings: ActionCodeSettings = {
    url: `${window.location.origin}/auth/callback`,
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(getAuthInstance(), email, actionCodeSettings);
  window.localStorage.setItem(AUTH_EMAIL_KEY, email);
}

export async function completeSignIn(url: string): Promise<User | null> {
  const auth = getAuthInstance();
  if (!isSignInWithEmailLink(auth, url)) return null;
  let email = window.localStorage.getItem(AUTH_EMAIL_KEY);
  if (!email) {
    email = window.prompt("Please provide your email for confirmation") || "";
  }
  const result = await signInWithEmailLink(auth, email, url);
  window.localStorage.removeItem(AUTH_EMAIL_KEY);
  await ensureProfile(result.user);
  return result.user;
}

export async function ensureProfile(user: User): Promise<void> {
  const db = getDb();
  const ref = doc(db, "memoriq_profiles", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { email: user.email, displayName: user.email?.split("@")[0] || "Player", totalXp: 0, badges: [], createdAt: serverTimestamp(), lastSeen: serverTimestamp() });
  } else {
    await updateDoc(ref, { lastSeen: serverTimestamp() });
  }
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(getAuthInstance(), callback);
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getAuthInstance());
}

export async function saveAttempt(uid: string, itemId: string, score: number, xp: number, qualified: boolean, answers: number[]): Promise<void> {
  const db = getDb();
  const attemptRef = doc(db, "memoriq_attempts", `${uid}_${itemId}`);
  await setDoc(attemptRef, { uid, itemId, score, xp, qualified, completedAt: serverTimestamp(), answers });
  const profileRef = doc(db, "memoriq_profiles", uid);
  const profileSnap = await getDoc(profileRef);
  if (profileSnap.exists()) {
    const current = profileSnap.data().totalXp || 0;
    await updateDoc(profileRef, { totalXp: current + xp, lastSeen: serverTimestamp() });
  }
}

export async function getLeaderboard(itemId: string): Promise<Array<{ uid: string; displayName: string; score: number; xp: number; qualified: boolean }>> {
  const db = getDb();
  const { collection, getDocs, orderBy, limit, query, where } = await import("firebase/firestore");
  const q = query(collection(db, "memoriq_attempts"), where("itemId", "==", itemId), orderBy("score", "desc"), orderBy("xp", "desc"), limit(20));
  const snap = await getDocs(q);
  const results = await Promise.all(snap.docs.map(async (d) => {
    const data = d.data();
    const profileSnap = await getDoc(doc(db, "memoriq_profiles", data.uid));
    const displayName = profileSnap.exists() ? profileSnap.data().displayName : "Player";
    return { uid: data.uid, displayName, score: data.score, xp: data.xp, qualified: data.qualified };
  }));
  return results;
}
