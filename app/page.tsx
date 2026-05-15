"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          🎮 EFB Tamim Tournament
        </h1>

        <p className="mt-4 text-gray-300">
          Welcome to NextGen eFootball Platform
        </p>

        <button
          onClick={() => router.push("/login")}
          className="mt-6 px-6 py-3 bg-green-500 rounded-xl"
        >
          Enter App
        </button>
      </div>
    </div>
  );
}