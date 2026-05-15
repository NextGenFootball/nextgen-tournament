"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Leaderboard() {
  const router = useRouter();

  const [players, setPlayers] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, "players"), (s) =>
      setPlayers(s.docs.map((d) => d.data()))
    );
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, "matches"), (s) =>
      setMatches(s.docs.map((d) => d.data()))
    );
  }, []);

  const getPoints = (name: string) => {
    let p = 0;

    matches.forEach((m) => {
      if (m.p1 === name || m.p2 === name) {
        const s1 = Number(m.score1);
        const s2 = Number(m.score2);

        if (m.p1 === name && s1 > s2) p += 3;
        else if (m.p2 === name && s2 > s1) p += 3;
        else if (s1 === s2) p += 1;
      }
    });

    return p;
  };

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <button onClick={() => router.push("/dashboard")} className="bg-zinc-800 p-2 rounded mb-5">
        Back
      </button>

      <h1 className="text-3xl font-bold">Leaderboard</h1>

      <div className="mt-6 space-y-2">
        {players
          .map((p) => ({ name: p.name, points: getPoints(p.name) }))
          .sort((a, b) => b.points - a.points)
          .map((p, i) => (
            <div key={i} className="flex justify-between bg-zinc-900 p-3 rounded">
              <span>#{i + 1} {p.name}</span>
              <span>{p.points} pts</span>
            </div>
          ))}
      </div>
    </div>
  );
}