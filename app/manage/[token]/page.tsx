"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManageJobPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  
  // Toast system
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info"; visible: boolean }[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type, visible: true }]);
    setTimeout(() => {
      setToasts((current) => current.map((t) => t.id === id ? { ...t, visible: false } : t));
    }, 3000);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 3500);
  };

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/manage/${resolvedParams.token}`, { method: "GET" });
      const data = await res.json();
      if (data.success) {
        setJob(data.job);
        setEditData(data.job);
      }
    };
    fetchJob();
  }, [resolvedParams.token]);

  const handleAction = async (action: string, data?: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/manage/${resolvedParams.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, data }),
      });
      
      const responseData = await res.json();
      
      if (responseData.success) {
        setJob(responseData.job);
        if (action === "update") setIsEditing(false);
        showToast(
          action === "update" ? "Η αγγελία ενημερώθηκε επιτυχώς!" : 
          action === "refresh" ? "Το Boost ενεργοποιήθηκε επιτυχώς!" :
          "Η αγγελία έκλεισε επιτυχώς.", 
          "success"
        );
      } else {
        showToast(responseData.message || "Κάτι πήγε στραβά", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Αποτυχία σύνδεσης με τον διακομιστή", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <div className="p-8 text-center text-slate-600 font-medium">Φόρτωση...</div>;

  const isClosed = job.status === "closed";
  const isFree = job.plan === "free";
  
  const lastRefresh = new Date(job.createdAt);
  const now = new Date();
  const hoursSinceRefresh = (now.getTime() - lastRefresh.getTime()) / (1000 * 60 * 60);
  const canRefresh = !isFree && hoursSinceRefresh >= 24;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Toast UI */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`max-w-sm rounded-2xl border px-5 py-3 shadow-lg text-sm font-bold text-white transition-all duration-300 ${
              toast.type === "success" ? "bg-emerald-500 border-emerald-400" : 
              toast.type === "error" ? "bg-rose-500 border-rose-400" : "bg-slate-700 border-slate-600"
            } ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Διαχείριση Αγγελίας</h1>
          <div className="flex gap-2">
            <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-indigo-100 text-indigo-700 capitalize">
              Πλάνο: {job.plan === "free" ? "Δωρεάν" : 
                     job.plan === "urgent" ? "Επείγουσα" : "Προβεβλημένη"}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
              isClosed ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}>
              {isClosed ? "Κλειστή" : "Ενεργή"}
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-6">
          {isEditing ? (
            <div className="space-y-5 text-slate-900">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Τίτλος Αγγελίας</label>
                <input 
                  type="text" 
                  value={editData.title} 
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 bg-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Εταιρεία</label>
                  <input 
                    type="text" 
                    value={editData.company} 
                    onChange={(e) => setEditData({...editData, company: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Τοποθεσία</label>
                  <input 
                    type="text" 
                    value={editData.location} 
                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Τύπος Απασχόλησης</label>
                <select 
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                  value={editData.fullTime ? "full" : "part"} 
                  onChange={(e) => setEditData({...editData, fullTime: e.target.value === "full"})}
                >
                  <option value="full">Πλήρης Απασχόληση</option>
                  <option value="part">Μερική Απασχόληση</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Τύπος Διάρκειας</label>
                <select 
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                  value={editData.duration?.type || "permanent"} 
                  onChange={(e) => setEditData({...editData, duration: { ...editData.duration, type: e.target.value }})}
                >
                  <option value="permanent">Μόνιμη</option>
                  <option value="fixed">Συγκεκριμένη</option>
                </select>
              </div>

              {editData.duration?.type === "fixed" && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Διάρκεια (Αριθμός)</label>
                    <input 
                      type="number"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                      value={editData.duration?.amount || 1} 
                      onChange={(e) => setEditData({...editData, duration: { ...editData.duration, amount: parseInt(e.target.value) || 0 }})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Μονάδα Χρόνου</label>
                    <select 
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                      value={editData.duration?.unit || "months"} 
                      onChange={(e) => setEditData({...editData, duration: { ...editData.duration, unit: e.target.value }})}
                    >
                      <option value="days">Ημέρες</option>
                      <option value="months">Μήνες</option>
                      <option value="years">Έτη</option>
                    </select>
                  </div>
                </>
              )}
              <div className="flex items-center gap-3 bg-red-50 p-4 rounded-2xl border border-red-100">
                <input 
                  type="checkbox" 
                  id="urgent-toggle"
                  checked={editData.urgent} 
                  onChange={(e) => setEditData({...editData, urgent: e.target.checked})}
                  className="w-5 h-5 accent-red-600 cursor-pointer"
                />
                <label htmlFor="urgent-toggle" className="text-sm font-bold text-red-700 cursor-pointer select-none">
                  🚨 Άμεση Πρόσληψη (Εμφάνιση ειδικού σήματος)
                </label>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Περιγραφή</label>
                <textarea 
                  rows={6}
                  value={editData.description} 
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 bg-white leading-relaxed"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => handleAction("update", editData)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-sm"
                >
                  Αποθήκευση Αλλαγών
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-100 text-slate-700 px-8 py-3 rounded-2xl font-bold hover:bg-slate-200 transition"
                >
                  Ακύρωση
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-6 text-slate-800">{job.title}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <div className="text-sm text-slate-600">Προβολές</div>
                  <div className="text-2xl font-bold text-slate-900">{job.views || 0}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <div className="text-sm text-slate-600">Υποψήφιοι</div>
                  <div className="text-2xl font-bold text-slate-900">{job.applicantCount || 0}</div>
                </div>
              </div>

              {!isClosed ? (
                <div className="flex flex-wrap gap-3">
                  <button 
                    disabled={loading}
                    onClick={() => setIsEditing(true)}
                    className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition"
                  >
                    Επεξεργασία
                  </button>
                  
                  <div className="relative group">
                    <button 
                      disabled={loading || !canRefresh}
                      onClick={() => handleAction("refresh")}
                      className={`px-5 py-3 rounded-2xl font-semibold transition border ${
                        canRefresh 
                          ? "bg-white text-slate-900 border-slate-400 hover:bg-slate-100" 
                          : "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                      }`}
                    >
                      Boost (για 24 ώρες)
                    </button>
                    {!canRefresh && !isClosed && (
                      <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-slate-800 text-white text-xs p-2 rounded-lg text-center">
                        {isFree 
                          ? "Δεν διατίθεται σε δωρεάν αγγελίες" 
                          : `Διαθέσιμο για νέο Boost κάθε 24 ώρες (Απομένουν ${Math.ceil(24 - hoursSinceRefresh)} ώρες)`}
                      </div>
                    )}
                  </div>

                  <button 
                    disabled={loading}
                    onClick={() => handleAction("close")}
                    className="bg-red-50 text-red-600 border border-red-100 px-5 py-3 rounded-2xl font-semibold hover:bg-red-100 transition"
                  >
                    Κλείσιμο αγγελίας
                  </button>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-800 text-center font-medium">
                  Η αγγελία έχει κλείσει και δεν εμφανίζεται πλέον στις αναζητήσεις.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
