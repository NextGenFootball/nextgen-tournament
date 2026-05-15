"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();

  const [players, setPlayers] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tournaments"), (snap) => {
      setTournaments(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "matches"), (snap) => {
      setMatches(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "schedules"), (snap) => {
      setSchedules(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 p-5">
        <h1 className="text-2xl font-bold text-green-400">
          NextGen Football
        </h1>

        <div className="mt-10 flex flex-col gap-4">
          <button onClick={() => router.push("/players")} className="bg-zinc-800 p-3 rounded-lg">Players</button>
          <button onClick={() => router.push("/tournaments")} className="bg-zinc-800 p-3 rounded-lg">Tournaments</button>
          <button onClick={() => router.push("/matches")} className="bg-zinc-800 p-3 rounded-lg">Matches</button>
          <button onClick={() => router.push("/schedules")} className="bg-zinc-800 p-3 rounded-lg">Schedules</button>
        </div>

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-500 py-3 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold">Welcome 👋</h1>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl">Players: {players.length}</div>
          <div className="bg-zinc-900 p-6 rounded-xl">Tournaments: {tournaments.length}</div>
          <div className="bg-zinc-900 p-6 rounded-xl">Matches: {matches.length}</div>
          <div className="bg-zinc-900 p-6 rounded-xl">Schedules: {schedules.length}</div>
        </div>
      </div>
    </div>
  );
}