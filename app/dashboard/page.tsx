"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Dashboard() {
  const router = useRouter();

  const [players, setPlayers] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });

    const unsubPlayers = onSnapshot(collection(db, "players"), (snap) => {
      setPlayers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsubTournaments = onSnapshot(
      collection(db, "tournaments"),
      (snap) => {
        setTournaments(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        );
      }
    );

    return () => {
      unsubAuth();
      unsubPlayers();
      unsubTournaments();
    };
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>

      <h2>Players</h2>
      {players.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}

      <h2>Tournaments</h2>
      {tournaments.map((t) => (
        <div key={t.id}>{t.name}</div>
      ))}
    </div>
  );
}