"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function PlayersPage() {
  const router = useRouter();

  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState<any[]>([]);

  const playersRef = collection(db, "players");

  // Load players
  useEffect(() => {
    const unsub = onSnapshot(playersRef, (snapshot) => {
      setPlayers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  // Add player
  const addPlayer = async () => {
    if (player.trim() === "") return;

    await addDoc(playersRef, {
      name: player,
    });

    setPlayer("");
  };

  // Delete player
  const deletePlayer = async (id: string) => {
    await deleteDoc(doc(db, "players", id));
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
        Players List 🎮
      </h1>

      {/* Input */}
      <div className="mt-8 flex gap-3">

        <input
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          placeholder="Enter player name"
          className="w-80 rounded-lg bg-white p-3 text-black outline-none"
        />

        <button
          onClick={addPlayer}
          className="rounded-lg bg-green-500 px-6 py-3 font-semibold"
        >
          Add
        </button>

      </div>

      {/* Players List */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

        {players.length === 0 ? (
          <p className="text-gray-400">
            No players added yet.
          </p>
        ) : (
          players.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-zinc-900 p-5 flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-semibold">
                  🎮 {p.name}
                </h2>

                <p className="mt-2 text-gray-400">
                  Firebase Player
                </p>
              </div>

              <button
                onClick={() => deletePlayer(p.id)}
                className="rounded-lg bg-red-500 px-4 py-2"
              >
                Delete
              </button>
            </div>
          ))
        )}

      </div>

    </div>
  );
}