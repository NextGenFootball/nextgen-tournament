"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex gap-6 p-4 bg-black/40 backdrop-blur-md text-white border-b border-white/10">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/players">Players</Link>
      <Link href="/tournaments">Tournaments</Link>
      <Link href="/matches">Matches</Link>
    </div>
  );
}