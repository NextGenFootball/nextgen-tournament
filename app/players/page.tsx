"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Players() {
  const [players, setPlayers] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    return onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const addPlayer = async () => {
    if (!name) return;
    await addDoc(collection(db, "players"), { name });
    setName("");
  };

  const deletePlayer = async (id: string) => {
    await deleteDoc(doc(db, "players", id));
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-black via-gray-900 to-black p-6">
      
      <h1 className="text-4xl font-bold mb-6">
        👥 Players
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          className="p-3 rounded-xl bg-black/40 border border-gray-600 w-72"
        />

        <button
          onClick={addPlayer}
          className="px-5 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-bold transition"
        >
          Add
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {players.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
          >
            <h2 className="text-xl font-bold">🎮 {p.name}</h2>

            <button
              onClick={() => deletePlayer(p.id)}
              className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}