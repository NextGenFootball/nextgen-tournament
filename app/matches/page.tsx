"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function Matches() {
  const router = useRouter();

  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [matches, setMatches] = useState<any[]>([]);

  // 🔥 Load Matches
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "matches"), (snap) => {
      setMatches(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  // ➕ Add Match
  const addMatch = async () => {
    if (!p1 || !p2) return;

    await addDoc(collection(db, "matches"), {
      p1,
      p2,
      score1: Number(score1) || 0,
      score2: Number(score2) || 0,
      createdAt: Date.now(),
    });

    setP1("");
    setP2("");
    setScore1("");
    setScore2("");
  };

  // ❌ Delete Match
  const deleteMatch = async (id: string) => {
    await deleteDoc(doc(db, "matches", id));
  };

  return (
    <div className="min-h-screen bg-black p-10 text-white">

      <button
        onClick={() => router.push("/dashboard")}
        className="mb-6 rounded-lg bg-zinc-800 px-5 py-2"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold">⚔️ Matches</h1>

      {/* INPUT */}
      <div className="mt-8 grid gap-3 md:grid-cols-4">

        <input
          value={p1}
          onChange={(e) => setP1(e.target.value)}
          placeholder="Player 1"
          className="rounded-lg bg-white p-3 text-black"
        />

        <input
          value={p2}
          onChange={(e) => setP2(e.target.value)}
          placeholder="Player 2"
          className="rounded-lg bg-white p-3 text-black"
        />

        <input
          value={score1}
          onChange={(e) => setScore1(e.target.value)}
          placeholder="Score 1"
          className="rounded-lg bg-white p-3 text-black"
        />

        <input
          value={score2}
          onChange={(e) => setScore2(e.target.value)}
          placeholder="Score 2"
          className="rounded-lg bg-white p-3 text-black"
        />

      </div>

      <button
        onClick={addMatch}
        className="mt-5 rounded-lg bg-green-500 px-6 py-3 font-bold"
      >
        Add Match
      </button>

      {/* LIST */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">

        {matches.length === 0 ? (
          <p className="text-gray-400">No match created yet.</p>
        ) : (
          matches.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl bg-zinc-900 p-5"
            >
              <h2 className="text-xl font-bold">
                ⚔️ {m.p1} vs {m.p2}
              </h2>

              <p className="mt-2 text-gray-400">
                🎯 Score: {m.score1} - {m.score2}
              </p>

              <button
                onClick={() => deleteMatch(m.id)}
                className="mt-4 rounded-lg bg-red-500 px-4 py-2"
              >
                Delete
              </button>
            </div>
          ))
        )}

      </div>

    </div>
  );
}