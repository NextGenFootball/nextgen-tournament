"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

export default function Tournaments() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [tournaments, setTournaments] = useState<any[]>([]);

  const tournamentRef = collection(db, "tournaments");

  // Load from Firebase
  useEffect(() => {
    const unsub = onSnapshot(tournamentRef, (snapshot) => {
      setTournaments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  // Add tournament
  const addTournament = async () => {
    if (name.trim() === "") return;

    await addDoc(tournamentRef, {
      name,
    });

    setName("");
  };

  return (
    <div className="min-h-screen bg-black p-10 text-white">

      <button
        onClick={() => router.push("/dashboard")}
        className="mb-6 rounded-lg bg-zinc-800 px-5 py-2"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold">
        🏆 Tournaments
      </h1>

      {/* Input */}
      <div className="mt-8 flex gap-3">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter tournament name"
          className="w-80 rounded-lg bg-white p-3 text-black outline-none"
        />

        <button
          onClick={addTournament}
          className="rounded-lg bg-green-500 px-6 py-3 font-semibold"
        >
          Add
        </button>

      </div>

      {/* List */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

        {tournaments.length === 0 ? (
          <p className="text-gray-400">
            No tournaments created yet.
          </p>
        ) : (
          tournaments.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-zinc-900 p-5"
            >
              <h2 className="text-2xl font-semibold">
                🏆 {t.name}
              </h2>

              <p className="mt-2 text-gray-400">
                Firebase Tournament
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}