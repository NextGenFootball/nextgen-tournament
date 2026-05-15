"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Schedules() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    onSnapshot(collection(db, "schedules"), (s) =>
      setSchedules(s.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const add = async () => {
    await addDoc(collection(db, "schedules"), {
      p1,
      p2,
      time,
    });
  };

  const del = async (id: string) => {
    await deleteDoc(doc(db, "schedules", id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <input onChange={(e) => setP1(e.target.value)} />
      <input onChange={(e) => setP2(e.target.value)} />
      <input onChange={(e) => setTime(e.target.value)} />

      <button onClick={add}>Add</button>

      {schedules.map((s) => (
        <div key={s.id}>
          {s.p1} vs {s.p2} - {s.time}
          <button onClick={() => del(s.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}