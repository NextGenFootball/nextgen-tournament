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

  // 🔐 Auth Protection
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });
    return () => unsub();
  }, []);

  // 📊 Players
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, []);

  // 📊 Tournaments
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tournaments"), (snap) => {
      setTournaments(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, []);

  // 📊 Matches
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "matches"), (snap) => {
      setMatches(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, []);

  // 📅 Schedules
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
          🎮 EFB Admin
        </h1>

        <div className="mt-10 flex flex-col gap-4">

          <button onClick={() => router.push("/players")}
            className="rounded-lg bg-zinc-800 p-3 text-left hover:bg-zinc-700">
            Players
          </button>

          <button onClick={() => router.push("/tournaments")}
            className="rounded-lg bg-zinc-800 p-3 text-left hover:bg-zinc-700">
            Tournaments
          </button>

          <button onClick={() => router.push("/matches")}
            className="rounded-lg bg-zinc-800 p-3 text-left hover:bg-zinc-700">
            Matches
          </button>

          <button onClick={() => router.push("/schedules")}
            className="rounded-lg bg-zinc-800 p-3 text-left hover:bg-zinc-700">
            Schedule
          </button>

        </div>

        <button
          onClick={logout}
          className="mt-10 w-full rounded-lg bg-red-500 py-3"
        >
          Logout
        </button>

      </div>

      {/* Main */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold">
          Welcome Admin 👋
        </h1>

        <p className="mt-3 text-gray-400">
          Complete eFootball Tournament System
        </p>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h2>Total Players</h2>
            <p className="text-3xl font-bold text-green-400">
              {players.length}
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h2>Tournaments</h2>
            <p className="text-3xl font-bold text-blue-400">
              {tournaments.length}
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h2>Matches</h2>
            <p className="text-3xl font-bold text-yellow-400">
              {matches.length}
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <h2>Schedules</h2>
            <p className="text-3xl font-bold text-purple-400">
              {schedules.length}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}