"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="text-center p-6">
        
        <h1 className="text-5xl font-bold mb-4">
          ⚽ NextGen Tournament
        </h1>

        <p className="text-gray-400 mb-6">
          Professional eFootball Tournament Platform
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition"
        >
          Enter App
        </button>

      </div>
    </div>
  );
}