"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Dashboard() {
  const router = useRouter();

  const [players, setPlayers] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(snap.docs.map((doc) => doc.data()));
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tournaments"), (snap) => {
      setTournaments(snap.docs.map((doc) => doc.data()));
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "matches"), (snap) => {
      setMatches(snap.docs.map((doc) => doc.data()));
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "schedules"), (snap) => {
      setSchedules(snap.docs.map((doc) => doc.data()));
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="w-64 bg-zinc-900 p-5">
        <h1 className="text-2xl font-bold text-green-400">
          NextGen Football
        </h1>

        <div className="mt-10 flex flex-col gap-4">
          <button onClick={() => router.push("/players")} className="rounded-lg bg-zinc-800 p-3">
            Players
          </button>

          <button onClick={() => router.push("/tournaments")} className="rounded-lg bg-zinc-800 p-3">
            Tournaments
          </button>

          <button onClick={() => router.push("/matches")} className="rounded-lg bg-zinc-800 p-3">
            Matches
          </button>

          <button onClick={() => router.push("/schedules")} className="rounded-lg bg-zinc-800 p-3">
            Schedules
          </button>

          <button onClick={() => router.push("/leaderboard")} className="rounded-lg bg-zinc-800 p-3">
            Leaderboard
          </button>
        </div>

        <button
          onClick={logout}
          className="mt-10 w-full rounded-lg bg-red-500 py-3"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold">
          Welcome Admin 👋
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-zinc-900 p-6">
            Players: {players.length}
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            Tournaments: {tournaments.length}
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            Matches: {matches.length}
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            Schedules: {schedules.length}
          </div>
        </div>
      </div>
    </div>
  );
}