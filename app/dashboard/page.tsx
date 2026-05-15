"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();

  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [matches, setMatches] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });

    onSnapshot(collection(db, "players"), (s) =>
      setPlayers(s.docs.map(d => d.data()))
    );

    onSnapshot(collection(db, "tournaments"), (s) =>
      setTournaments(s.docs.map(d => d.data()))
    );

    onSnapshot(collection(db, "matches"), (s) =>
      setMatches(s.docs.map(d => d.data()))
    );

    onSnapshot(collection(db, "schedules"), (s) =>
      setSchedules(s.docs.map(d => d.data()))
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
        <div>Players: {players.length}</div>
        <div>Tournaments: {tournaments.length}</div>
        <div>Matches: {matches.length}</div>
        <div>Schedules: {schedules.length}</div>
      </div>

      <button
        onClick={() => signOut(auth)}
        className="mt-10 bg-red-500 px-5 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}