"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Leaderboard() {
  const router = useRouter();

  const [players, setPlayers] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "matches"), (snap) => {
      setMatches(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  const getPoints = (name: string) => {
    let points = 0;

    matches.forEach((m) => {
      if (m.p1 === name && m.score1 > m.score2) points += 3;
      else if (m.p2 === name && m.score2 > m.score1) points += 3;
      else if (m.p1 === name || m.p2 === name) points += 1;
    });

    return points;
  };

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-6 rounded-lg bg-zinc-800 px-5 py-2"
      >
        Back
      </button>

      <h1 className="text-4xl font-bold">
        Leaderboard
      </h1>

      <div className="mt-10 rounded-2xl bg-zinc-900 p-6">
        {players.map((p, index) => (
          <div
            key={index}
            className="flex justify-between border-b border-zinc-700 py-3"
          >
            <span>{p.name}</span>

            <span>{getPoints(p.name)} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}