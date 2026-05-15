"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Matches() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [matches, setMatches] = useState<any[]>([]);
  const [bg, setBg] = useState(0);

  const colors = [
    "from-black via-gray-900 to-black",
    "from-green-900 via-black to-black",
    "from-blue-900 via-black to-black",
    "from-purple-900 via-black to-black",
  ];

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "matches"), (snap) => {
      setMatches(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  const addMatch = async () => {
    if (!teamA || !teamB) return;

    await addDoc(collection(db, "matches"), {
      teamA,
      teamB,
      createdAt: Date.now(),
    });

    setTeamA("");
    setTeamB("");
  };

  const deleteMatch = async (id: string) => {
    await deleteDoc(doc(db, "matches", id));
  };

  return (
    <div
      className={`min-h-screen text-white p-6 transition-all duration-500 bg-gradient-to-r ${colors[bg]}`}
      onClick={() => setBg((bg + 1) % colors.length)}
    >
      
      <h1 className="text-3xl font-bold mb-6 animate-pulse">
        ⚽ Matches (click background to change theme)
      </h1>

      {/* INPUT */}
      <div className="flex gap-2 mb-6">
        <input
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
          placeholder="Team A"
          className="p-2 rounded bg-black/40 border border-gray-600"
        />

        <input
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
          placeholder="Team B"
          className="p-2 rounded bg-black/40 border border-gray-600"
        />

        <button
          onClick={addMatch}
          className="px-4 py-2 bg-green-500 rounded hover:scale-110 transition"
        >
          Add Match
        </button>
      </div>

      {/* MATCH LIST */}
      <div className="space-y-3">
        {matches.map((m) => (
          <div
            key={m.id}
            className="bg-black/40 p-3 rounded flex justify-between items-center hover:scale-[1.02] transition"
          >
            <span>
              ⚽ {m.teamA} vs {m.teamB}
            </span>

            <button
              onClick={() => deleteMatch(m.id)}
              className="text-red-400 hover:text-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}