"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

type Tournament = {
  name: string;
};

export default function Tournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    return onSnapshot(collection(db, "tournaments"), (snap) => {
      setTournaments(snap.docs.map((d) => d.data() as Tournament));
    });
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-2xl">🏆 Tournaments</h1>

      <input
        className="p-2 text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tournament name"
      />

      <button
        className="ml-2 bg-blue-500 px-3 py-2"
        onClick={async () => {
          const { addDoc, collection } = await import("firebase/firestore");
          await addDoc(collection(db, "tournaments"), { name });
          setName("");
        }}
      >
        Add
      </button>

      <div className="mt-5">
        {tournaments.map((t, i) => (
          <div key={i} className="p-2 bg-white/10 mt-2 rounded">
            {t.name}
          </div>
        ))}
      </div>
    </div>
  );
}