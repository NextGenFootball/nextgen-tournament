"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Leaderboard() {
  const router = useRouter();

  const [players, setPlayers] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  // Load players
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  // Load matches
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

  // Simple points system
  const getPoints = (playerName: string) => {
    let points = 0;

    matches.forEach((m) => {
      if (m.player1 === playerName || m.player2 === playerName) {
        const s1 = Number(m.score1);
        const s2 = Number(m.score2);

        if (m.player1 === playerName && s1 > s2) points += 3;
        else if (m.player2 === playerName && s2 > s1) points += 3;
        else if (s1 === s2) points += 1;
      }
    });

    return points;
  };

  return (
    <div className="min-h-screen bg-black p-10 text-white">

      <button
        onClick={() => router.push("/dashboard")}
        className="mb-6 rounded-lg bg-zinc-800 px-5 py-2"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold">
        🏆 Leaderboard
      </h1>

      {/* Table */}
      <div className="mt-10 rounded-2xl bg-zinc-900 p-6">

        {players.length === 0 ? (
          <p className="text-gray-400">
            No players available.
          </p>
        ) : (
          players
            .map((p) => ({
              name: p.name,
              points: getPoints(p.name),
            }))
            .sort((a, b) => b.points - a.points)
            .map((p, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-zinc-700 py-3"
              >
                <span>
                  #{index + 1} {p.name}
                </span>

                <span className="text-green-400 font-bold">
                  {p.points} pts
                </span>
              </div>
            ))
        )}

      </div>

    </div>
  );
}