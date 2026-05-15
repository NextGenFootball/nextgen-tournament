"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Leaderboard() {
  const router = useRouter();

  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "players"), (s) =>
      setPlayers(s.docs.map(d => d.data()))
    );

    onSnapshot(collection(db, "matches"), (s) =>
      setMatches(s.docs.map(d => d.data()))
    );
  }, []);

  const getPoints = (name: string) => {
    let p = 0;

    matches.forEach((m: any) => {
      if (m.p1 === name || m.p2 === name) {
        if (m.score1 > m.score2 && m.p1 === name) p += 3;
        else if (m.score2 > m.score1 && m.p2 === name) p += 3;
        else if (m.score1 === m.score2) p += 1;
      }
    });

    return p;
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <button onClick={() => router.push("/dashboard")}>
        Back
      </button>

      <h1 className="text-3xl mt-5">Leaderboard</h1>

      {players
        .map((p: any) => ({
          name: p.name,
          points: getPoints(p.name),
        }))
        .sort((a, b) => b.points - a.points)
        .map((p, i) => (
          <div key={i}>
            #{i + 1} {p.name} - {p.points} pts
          </div>
        ))}
    </div>
  );
}