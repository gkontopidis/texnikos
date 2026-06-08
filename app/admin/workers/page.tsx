"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import PostJobFlow from "@/components/job/PostJobFlow";
import PostWorkerFlow from "@/components/job/PostWorkerFlow";
import { specialtyOptions, locationOptions } from "@/lib/constants";

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
  const [view, setView] = useState<"workers" | "leads">("workers");
  const [leadStats, setLeadStats] = useState<any[]>([]);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);

  const fetchWorkers = useCallback(() => {
    fetch(`/api/admin/workers/list?status=${filterStatus}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWorkers(data);
      });
  }, [filterStatus, search]);

  const fetchLeads = useCallback(() => {
    fetch("/api/admin/leads/list")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLeadStats(data.stats);
      });
  }, []);

  useEffect(() => {
    fetchWorkers();
    fetchLeads();
  }, [fetchWorkers, fetchLeads]);
// ...

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header setShowPostJobModal={setShowPostJobModal} setShowPostWorkerModal={setShowPostWorkerModal} />

      <div className="max-w-6xl mx-auto p-8">
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

        <div className="flex gap-4 mb-8">
           <button 
             onClick={() => setView("workers")} 
             className={`px-6 py-2 rounded-xl font-bold ${view === "workers" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border"}`}
           >
             Τεχνικοί
           </button>
           <button 
             onClick={() => setView("leads")} 
             className={`px-6 py-2 rounded-xl font-bold ${view === "leads" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border"}`}
           >
             Ξεκλειδώματα (Leads)
           </button>
        </div>

        {view === "workers" ? (
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
        ) : (
          <div className="space-y-4">
            {leadStats.map(stat => (
              <div key={stat._id} className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">{stat.workerDetails.firstName} {stat.workerDetails.lastName}</h3>
                  <span className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold">{stat.count} Ξεκλειδώματα</span>
                </div>
                <div className="space-y-2">
                  {stat.leads.map((lead: any, idx: number) => (
                    <div key={idx} className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border">
                      {lead.employerName} - {lead.employerEmail} - {lead.employerPhone} ({new Date(lead.createdAt).toLocaleDateString()})
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showPostJobModal && (
        <PostJobFlow 
          onClose={() => setShowPostJobModal(false)} 
          onJobCreated={() => {}} 
          showToast={() => {}} 
          specialtyOptions={specialtyOptions} 
          locationOptions={locationOptions} 
        />
      )}
      {showPostWorkerModal && (
        <PostWorkerFlow 
          onClose={() => setShowPostWorkerModal(false)} 
          onWorkerCreated={() => {}} 
          showToast={() => {}} 
          specialtyOptions={specialtyOptions} 
          locationOptions={locationOptions} 
        />
      )}
    </div>
  );
}
