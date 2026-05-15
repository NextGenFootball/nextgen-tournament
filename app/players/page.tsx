"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function PlayersPage() {
  const router = useRouter();

  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snapshot) => {
      setPlayers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const addPlayer = async () => {
    if (!player.trim()) return;
    await addDoc(collection(db, "players"), { name: player });
    setPlayer("");
  };

  const deletePlayer = async (id: string) => {
    await deleteDoc(doc(db, "players", id));
  };

  return (
    <div className="min-h-screen bg-black p-10 text-white">

      <button onClick={() => router.push("/dashboard")} className="mb-6 bg-zinc-800 px-5 py-2 rounded-lg">
        ← Back
      </button>

      <h1 className="text-4xl font-bold">Players</h1>

      <div className="mt-8 flex gap-3">
        <input
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          className="p-3 rounded-lg text-black"
          placeholder="Enter player"
        />

        <button onClick={addPlayer} className="bg-green-500 px-6 py-3 rounded-lg">
          Add
        </button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {players.map((p) => (
          <div key={p.id} className="bg-zinc-900 p-5 rounded-xl flex justify-between">
            <span>{p.name}</span>
            <button onClick={() => deletePlayer(p.id)} className="bg-red-500 px-3 py-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}