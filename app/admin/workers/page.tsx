"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Worker {
  _id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  location: string;
  status: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
}

export default function AdminWorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const fetchWorkers = useCallback(() => {
    fetch(`/api/admin/workers/list?status=${filterStatus}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWorkers(data);
      });
  }, [filterStatus, search]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const handleModerate = async (workerId: string, action: "approve" | "reject") => {
    try {
      const res = await fetch("/api/admin/workers/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, action }),
      });
      if (res.ok) fetchWorkers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (workerId: string) => {
    if (!confirm("Διαγραφή προφίλ τεχνικού;")) return;
    try {
      await fetch("/api/admin/workers/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId }),
      });
      fetchWorkers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4 mb-8">
          <Link href="/admin" className="px-6 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-xl font-bold hover:bg-indigo-50 transition">Αγγελίες</Link>
          <Link href="/admin/workers" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold">Τεχνικοί</Link>
          <Link href="/" className="ml-auto px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition">Πίσω στο Site</Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Διαχείριση Τεχνικών</h1>
          <div className="flex gap-4">
            <input 
              placeholder="Αναζήτηση..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-xl"
            />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-xl"
            >
              <option value="all">Όλοι</option>
              <option value="pending">Εκκρεμεί</option>
              <option value="active">Ενεργός</option>
              <option value="rejected">Απορρίφθηκε</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {workers.map(worker => (
            <div key={worker._id} className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{worker.firstName} {worker.lastName}</h3>
                <p className="text-sm text-slate-500">{worker.specialty} • {worker.location}</p>
                <p className="text-xs text-indigo-600 font-bold uppercase mt-1">{worker.status}</p>
              </div>
              <div className="flex gap-2">
                {worker.status === "pending" && (
                  <button onClick={() => handleModerate(worker._id, "approve")} className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold">Έγκριση</button>
                )}
                <button onClick={() => handleDelete(worker._id)} className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-sm font-bold">Διαγραφή</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
