"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Players() {
  const [players, setPlayers] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    return onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });
  }, []);

  const addPlayer = async () => {
    if (!name) return;

    await addDoc(collection(db, "players"), {
      name,
    });

    setName("");
  };

  const deletePlayer = async (id: string) => {
    await deleteDoc(doc(db, "players", id));
  };

  return (
    <div className="min-h-screen text-white p-6 bg-[length:400%_400%] animate-gradient bg-gradient-to-r from-purple-900 via-black to-green-900">
      
      <h1 className="text-4xl font-bold mb-6">
        👥 Players
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          className="bg-black/40 border border-gray-600 p-3 rounded-xl w-72"
        />

        <button
          onClick={addPlayer}
          className="bg-green-500 hover:scale-110 transition-all duration-300 px-6 py-3 rounded-xl font-bold"
        >
          Add
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {players.map((p) => (
          <div
            key={p.id}
            className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold">
              🎮 {p.name}
            </h2>

            <button
              onClick={() => deletePlayer(p.id)}
              className="mt-4 bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}