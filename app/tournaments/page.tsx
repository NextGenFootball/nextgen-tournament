"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export default function Tournaments() {
  const [name, setName] = useState("");
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    onSnapshot(collection(db, "tournaments"), (s) =>
      setTournaments(s.docs.map(d => d.data()))
    );
  }, []);

  const add = async () => {
    await addDoc(collection(db, "tournaments"), { name });
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={add}>Add</button>

      {tournaments.map((t, i) => (
        <div key={i}>{t.name}</div>
      ))}
    </div>
  );
}