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

export default function Matches() {
  const [matches, setMatches] = useState<any[]>([]);
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  useEffect(() => {
    onSnapshot(collection(db, "matches"), (s) =>
      setMatches(s.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const add = async () => {
    await addDoc(collection(db, "matches"), {
      p1,
      p2,
      score1: 0,
      score2: 0,
    });
  };

  const del = async (id: string) => {
    await deleteDoc(doc(db, "matches", id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <input onChange={(e) => setP1(e.target.value)} placeholder="P1" />
      <input onChange={(e) => setP2(e.target.value)} placeholder="P2" />

      <button onClick={add}>Add Match</button>

      {matches.map((m) => (
        <div key={m.id}>
          {m.p1} vs {m.p2}
          <button onClick={() => del(m.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}