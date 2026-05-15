"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Schedules() {
  const router = useRouter();

  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [time, setTime] = useState("");
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "schedules"), (snap) => {
      setSchedules(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const addSchedule = async () => {
    if (!p1 || !p2 || !time) return;

    await addDoc(collection(db, "schedules"), { p1, p2, time });

    setP1("");
    setP2("");
    setTime("");
  };

  const deleteSchedule = async (id: string) => {
    await deleteDoc(doc(db, "schedules", id));
  };

  return (
    <div className="min-h-screen bg-black p-10 text-white">

      <button onClick={() => router.push("/dashboard")} className="mb-6 bg-zinc-800 px-5 py-2 rounded-lg">
        ← Back
      </button>

      <h1 className="text-4xl font-bold">Schedules</h1>

      <div className="mt-8 grid md:grid-cols-3 gap-3">
        <input value={p1} onChange={(e) => setP1(e.target.value)} className="p-3 text-black rounded" placeholder="Player 1" />
        <input value={p2} onChange={(e) => setP2(e.target.value)} className="p-3 text-black rounded" placeholder="Player 2" />
        <input value={time} onChange={(e) => setTime(e.target.value)} className="p-3 text-black rounded" placeholder="Time" />
      </div>

      <button onClick={addSchedule} className="mt-5 bg-green-500 px-6 py-3 rounded-lg">
        Add
      </button>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {schedules.map((s) => (
          <div key={s.id} className="bg-zinc-900 p-5 rounded-xl">
            <h2>{s.p1} vs {s.p2}</h2>
            <p>{s.time}</p>

            <button onClick={() => deleteSchedule(s.id)} className="mt-3 bg-red-500 px-3 py-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}