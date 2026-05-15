"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [players, setPlayers] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    const unsub1 = onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(snap.docs.map((d) => d.data()));
    });

    const unsub2 = onSnapshot(collection(db, "tournaments"), (snap) => {
      setTournaments(snap.docs.map((d) => d.data()));
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      
      <h1 className="text-3xl font-bold mb-6">
        ⚽ Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 p-5 rounded-xl">
          <h2 className="text-xl mb-3">👥 Players ({players.length})</h2>
          {players.length === 0 && <p className="text-gray-400">No players</p>}
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h2 className="text-xl mb-3">🏆 Tournaments ({tournaments.length})</h2>
          {tournaments.length === 0 && <p className="text-gray-400">No tournaments</p>}
        </div>

      </div>
    </div>
  );
}