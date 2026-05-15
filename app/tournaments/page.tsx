"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export default function Tournaments() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tournaments"), (snap) => {
      setTournaments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const addTournament = async () => {
    if (!name.trim()) return;
    await addDoc(collection(db, "tournaments"), { name });
    setName("");
  };

  return (
    <div className="min-h-screen bg-black p-10 text-white">

      <button onClick={() => router.push("/dashboard")} className="mb-6 bg-zinc-800 px-5 py-2 rounded-lg">
        ← Back
      </button>

      <h1 className="text-4xl font-bold">Tournaments</h1>

      <div className="mt-8 flex gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className="p-3 text-black rounded" />
        <button onClick={addTournament} className="bg-green-500 px-6 py-3 rounded-lg">
          Add
        </button>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {tournaments.map((t) => (
          <div key={t.id} className="bg-zinc-900 p-5 rounded-xl">
            {t.name}
          </div>
        ))}
      </div>

    </div>
  );
}