"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex gap-4 p-4 text-white bg-black/40">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/players">Players</Link>
      <Link href="/tournaments">Tournaments</Link>
      <Link href="/matches">Matches</Link>
    </div>
  );
}