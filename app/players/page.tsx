"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

type Player = {
  name: string;
};

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    return onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(snap.docs.map((d) => d.data() as Player));
    });
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-2xl mb-4">👥 Players</h1>

      <input
        className="p-2 text-black"
        placeholder="Enter player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="ml-2 bg-green-500 px-3 py-2"
        onClick={async () => {
          const { addDoc, collection } = await import("firebase/firestore");
          await addDoc(collection(db, "players"), { name });
          setName("");
        }}
      >
        Add
      </button>

      <div className="mt-5">
        {players.map((p, i) => (
          <div key={i}>{p.name}</div>
        ))}
      </div>
    </div>
  );
}