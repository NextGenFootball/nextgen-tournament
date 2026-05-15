"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="w-80 rounded-xl bg-zinc-900 p-6">
        <h1 className="text-center text-2xl font-bold mb-5">Login</h1>

        <input
          className="w-full p-3 mb-3 text-black rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 text-black rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-green-500 p-3 rounded font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}