"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
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
    return onSnapshot(collection(db, "players"), (s) =>
      setPlayers(s.docs.map((d) => d.data()))
    );
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, "tournaments"), (s) =>
      setTournaments(s.docs.map((d) => d.data()))
    );
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, "matches"), (s) =>
      setMatches(s.docs.map((d) => d.data()))
    );
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, "schedules"), (s) =>
      setSchedules(s.docs.map((d) => d.data()))
    );
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">

      <div className="w-64 bg-zinc-900 p-5">
        <h1 className="text-xl font-bold">NextGen Football</h1>

        <div className="mt-5 space-y-3">
          <button onClick={() => router.push("/players")} className="w-full bg-zinc-800 p-2 rounded">
            Players
          </button>

          <button onClick={() => router.push("/tournaments")} className="w-full bg-zinc-800 p-2 rounded">
            Tournaments
          </button>

          <button onClick={() => router.push("/matches")} className="w-full bg-zinc-800 p-2 rounded">
            Matches
          </button>

          <button onClick={() => router.push("/schedules")} className="w-full bg-zinc-800 p-2 rounded">
            Schedules
          </button>

          <button onClick={() => router.push("/leaderboard")} className="w-full bg-zinc-800 p-2 rounded">
            Leaderboard
          </button>
        </div>

        <button onClick={logout} className="mt-6 w-full bg-red-500 p-2 rounded">
          Logout
        </button>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-zinc-900 p-4 rounded">Players: {players.length}</div>
          <div className="bg-zinc-900 p-4 rounded">Tournaments: {tournaments.length}</div>
          <div className="bg-zinc-900 p-4 rounded">Matches: {matches.length}</div>
          <div className="bg-zinc-900 p-4 rounded">Schedules: {schedules.length}</div>
        </div>
      </div>
    </div>
  );
}