"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function Schedules() {
  const router = useRouter();

  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [time, setTime] = useState("");
  const [schedules, setSchedules] = useState<any[]>([]);

  // 🔥 Load from Firebase
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "schedules"), (snap) => {
      setSchedules(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  // ➕ Add Schedule
  const addSchedule = async () => {
    if (!p1 || !p2 || !time) return;

    await addDoc(collection(db, "schedules"), {
      p1,
      p2,
      time,
      createdAt: Date.now(),
    });

    setP1("");
    setP2("");
    setTime("");
  };

  // ❌ Delete Schedule
  const deleteSchedule = async (id: string) => {
    await deleteDoc(doc(db, "schedules", id));
  };

  return (
    <div className="min-h-screen bg-black p-10 text-white">

      <button
        onClick={() => router.push("/dashboard")}
        className="mb-6 rounded-lg bg-zinc-800 px-5 py-2"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold">📅 Match Schedule</h1>

      {/* INPUT */}
      <div className="mt-8 grid gap-3 md:grid-cols-3">

        <input
          value={p1}
          onChange={(e) => setP1(e.target.value)}
          placeholder="Player 1"
          className="rounded-lg bg-white p-3 text-black"
        />

        <input
          value={p2}
          onChange={(e) => setP2(e.target.value)}
          placeholder="Player 2"
          className="rounded-lg bg-white p-3 text-black"
        />

        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Time (e.g. 9 PM)"
          className="rounded-lg bg-white p-3 text-black"
        />

      </div>

      <button
        onClick={addSchedule}
        className="mt-5 rounded-lg bg-green-500 px-6 py-3 font-bold"
      >
        Add Schedule
      </button>

      {/* LIST */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">

        {schedules.length === 0 ? (
          <p className="text-gray-400">
            No schedule created yet.
          </p>
        ) : (
          schedules.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl bg-zinc-900 p-5"
            >
              <h2 className="text-xl font-bold">
                📅 {s.p1} vs {s.p2}
              </h2>

              <p className="mt-2 text-gray-400">
                🕒 Time: {s.time}
              </p>

              <button
                onClick={() => deleteSchedule(s.id)}
                className="mt-4 rounded-lg bg-red-500 px-4 py-2"
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