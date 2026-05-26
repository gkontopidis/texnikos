"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Toast system
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info"; visible: boolean }[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type, visible: true }]);
    setTimeout(() => {
      setToasts((current) => current.map((t) => t.id === id ? { ...t, visible: false } : t));
    }, 3000);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const fetchJobs = useCallback(() => {
    fetch(`/api/admin/jobs/list?status=${filterStatus}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      });
  }, [filterStatus, search]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleModerate = async (jobId: string, action: "approve" | "reject") => {
    try {
      const res = await fetch("/api/admin/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, action }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(action === "approve" ? "Η αγγελία εγκρίθηκε!" : "Η αγγελία απορρίφθηκε.", action === "approve" ? "success" : "info");
        fetchJobs();
      } else {
        showToast("Αποτυχία ενέργειας", "error");
      }
    } catch (error) {
      showToast("Σφάλμα σύνδεσης", "error");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: editingJob._id, ...editingJob }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Η αγγελία ενημερώθηκε επιτυχώς!", "success");
        setEditingJob(null);
        fetchJobs();
      } else {
        showToast(data.message || "Σφάλμα κατά την ενημέρωση", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Αποτυχία σύνδεσης με τον διακομιστή", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-8 text-slate-900 font-sans">
      {/* Toast UI */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`max-w-sm rounded-2xl border px-5 py-3 shadow-xl text-sm font-bold text-white transition-all duration-300 ${
              toast.type === "success" ? "bg-emerald-500 border-emerald-400" : 
              toast.type === "error" ? "bg-rose-500 border-rose-400" : "bg-slate-700 border-slate-600"
            } ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-indigo-950">Πίνακας Ελέγχου Διαχειριστή</h1>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex gap-2 flex-grow md:flex-grow-0">
              <input 
                type="text" 
                placeholder="Αναζήτηση..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold">🔍</button>
            </form>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-xl border border-indigo-200 bg-white font-semibold"
            >
              <option value="all">Όλες</option>
              <option value="pending-verification">Προς Επιβεβαίωση</option>
              <option value="scheduled">Προγραμματισμένες</option>
              <option value="active">Ενεργές</option>
              <option value="closed">Κλειστές</option>
              <option value="rejected">Απορριφθείσες</option>
              <option value="expired">Ληγμένες</option>
            </select>
          </div>
        </div>
        
        {editingJob ? (
          <div className="bg-white rounded-3xl border border-indigo-100 p-8 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Επεξεργασία Αγγελίας</h2>
              <button onClick={() => setEditingJob(null)} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
            </div>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-bold mb-2">Τίτλος</label>
                <input 
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition"
                  value={editingJob.title} 
                  onChange={(e) => setEditingJob({...editingJob, title: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Εταιρεία</label>
                <input 
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition"
                  value={editingJob.company} 
                  onChange={(e) => setEditingJob({...editingJob, company: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Τοποθεσία</label>
                <input 
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition"
                  value={editingJob.location} 
                  onChange={(e) => setEditingJob({...editingJob, location: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Τύπος Απασχόλησης</label>
                <select 
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition font-bold"
                  value={editingJob.fullTime ? "full" : "part"} 
                  onChange={(e) => setEditingJob({...editingJob, fullTime: e.target.value === "full"})}
                >
                  <option value="full">Πλήρης</option>
                  <option value="part">Μερική</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Τύπος Διάρκειας</label>
                <select 
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition font-bold"
                  value={editingJob.duration?.type || "permanent"} 
                  onChange={(e) => setEditingJob({
                    ...editingJob, 
                    duration: { ...editingJob.duration, type: e.target.value }
                  })}
                >
                  <option value="permanent">Μόνιμη</option>
                  <option value="fixed">Συγκεκριμένη</option>
                </select>
              </div>

              {editingJob.duration?.type === "fixed" && (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-2">Διάρκεια (Αριθμός)</label>
                    <input 
                      type="number"
                      className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition"
                      value={editingJob.duration?.amount || 1} 
                      onChange={(e) => setEditingJob({
                        ...editingJob, 
                        duration: { ...editingJob.duration, amount: parseInt(e.target.value) || 0 }
                      })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Μονάδα Χρόνου</label>
                    <select 
                      className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition"
                      value={editingJob.duration?.unit || "months"} 
                      onChange={(e) => setEditingJob({
                        ...editingJob, 
                        duration: { ...editingJob.duration, unit: e.target.value }
                      })}
                    >
                      <option value="days">Ημέρες</option>
                      <option value="months">Μήνες</option>
                      <option value="years">Έτη</option>
                    </select>
                  </div>
                </>
              )}
              <div className="flex items-center gap-3 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <input 
                  type="checkbox" 
                  id="urgent-toggle"
                  checked={editingJob.urgent || false} 
                  onChange={(e) => setEditingJob({...editingJob, urgent: e.target.checked})}
                  className="w-5 h-5 accent-indigo-600 cursor-pointer"
                />
                <label htmlFor="urgent-toggle" className="text-sm font-bold text-indigo-900 cursor-pointer select-none">
                  🚨 Άμεση Πρόσληψη
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Status</label>
                <select 
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition font-bold"
                  value={editingJob.status} 
                  onChange={(e) => setEditingJob({...editingJob, status: e.target.value})}
                >
                  <option value="pending-verification">Προς Επιβεβαίωση</option>
                  <option value="scheduled">Προγραμματισμένη</option>
                  <option value="active">Ενεργή</option>
                  <option value="rejected">Απορρίφθηκε</option>
                  <option value="closed">Κλειστή</option>
                  <option value="expired">Έληξε</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Πλάνο</label>
                <select 
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition font-bold"
                  value={editingJob.plan} 
                  onChange={(e) => setEditingJob({...editingJob, plan: e.target.value})}
                >
                  <option value="free">Δωρεάν</option>
                  <option value="urgent">Επείγουσα</option>
                  <option value="featured">Προβεβλημένη</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email Εργοδότη</label>
                <input 
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition"
                  value={editingJob.contactEmail} 
                  onChange={(e) => setEditingJob({...editingJob, contactEmail: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Τηλέφωνο</label>
                <input 
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition"
                  value={editingJob.contactPhone} 
                  onChange={(e) => setEditingJob({...editingJob, contactPhone: e.target.value})} 
                />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-bold mb-2">Περιγραφή</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:bg-white transition"
                  value={editingJob.description} 
                  onChange={(e) => setEditingJob({...editingJob, description: e.target.value})} 
                />
              </div>
              <div className="col-span-full flex gap-4 pt-4 border-t">
                <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition">
                  {loading ? "Αποθήκευση..." : "Αποθήκευση Αλλαγών"}
                </button>
                <button type="button" onClick={() => setEditingJob(null)} className="bg-slate-200 text-slate-700 px-10 py-3 rounded-2xl font-bold hover:bg-slate-300 transition">
                  Ακύρωση
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-indigo-100 shadow-sm">
                <p className="text-indigo-800 text-lg">Δεν βρέθηκαν αγγελίες.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job._id} className="bg-white rounded-3xl border border-indigo-100 p-6 shadow-sm hover:shadow-md transition group">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-xl font-bold text-indigo-950">{job.title}</h2>
                        <div className="flex gap-1.5">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                            job.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            job.status === 'pending-verification' ? 'bg-orange-100 text-orange-700' :
                            job.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {job.status === 'active' ? 'Ενεργή' : 
                             job.status === 'pending-verification' ? 'Προς Επιβεβαίωση' :
                             job.status === 'scheduled' ? 'Προγραμματισμένη' :
                             job.status === 'rejected' ? 'Απορρίφθηκε' :
                             job.status === 'closed' ? 'Κλειστή' : 'Έληξε'}
                          </span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase bg-indigo-100 text-indigo-700">
                            {job.plan === 'free' ? 'Δωρεάν' : 
                             job.plan === 'urgent' ? 'Επείγουσα' : 'Προβεβλημένη'}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-500 font-medium">{job.company} • {job.location}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {(job.status === 'pending-verification' || job.status === 'scheduled') && (
                        <button 
                          onClick={() => handleModerate(job._id, "approve")}
                          className="bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-emerald-600 transition"
                        >
                          Έγκριση
                        </button>
                      )}
                      <button 
                        onClick={() => setEditingJob(job)}
                        className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-5 py-2 rounded-xl font-bold text-sm hover:bg-indigo-100 transition"
                      >
                        Επεξεργασία
                      </button>
                      {job.status !== 'rejected' && job.status !== 'closed' && (
                        <button 
                          onClick={() => handleModerate(job._id, "reject")}
                          className="bg-white text-slate-400 border border-slate-200 px-5 py-2 rounded-xl font-bold text-sm hover:text-rose-600 hover:border-rose-200 transition"
                        >
                          Απόρριψη
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
