"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Leaderboard() {
  const [players, setPlayers] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const unsubPlayers = onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsubMatches = onSnapshot(collection(db, "matches"), (snap) => {
      setMatches(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubPlayers();
      unsubMatches();
    };
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>

      <h2>Players</h2>
      {players.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}

      <h2>Matches</h2>
      {matches.map((m) => (
        <div key={m.id}>{m.title}</div>
      ))}
    </div>
  );
}