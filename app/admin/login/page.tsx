"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) router.push("/admin");
    else alert("Wrong password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
        <h1 className="text-xl font-bold mb-4 text-indigo-950">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-indigo-200 rounded-2xl p-3 mb-4 focus:ring-2 focus:ring-indigo-600 outline-none"
        />
        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-2xl font-semibold hover:bg-indigo-700 transition">Login</button>
      </form>
    </div>
  );
}