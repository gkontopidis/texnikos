"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { specialtyOptions, locationOptions } from "@/components/HomePage";

import JobModal from "@/components/job/JobModal";
import PostWorkerFlow from "@/components/job/PostWorkerFlow";

interface Worker {
  _id: string;
  firstName: string;
  lastNameInitial: string;
  specialty: string;
  location: string;
  experienceYears: number;
  bio: string;
  skills: string[];
  createdAt: string;
}

export default function WorkersListPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ specialty: "", location: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Unlock Modal State
  const [unlockingWorkerId, setUnlockingWorkerId] = useState<string | null>(null);
  const [employerData, setEmployerData] = useState({ name: "", email: "", phone: "" });
  const [unlockedContacts, setUnlockedContacts] = useState<Record<string, { email: string; phone: string; lastName: string }>>({});
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info"; visible: boolean }[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type, visible: true }]);
    setTimeout(() => setToasts((current) => current.map((t) => t.id === id ? { ...t, visible: false } : t)), 3000);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3500);
  };

  const fetchWorkers = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.specialty) params.append("specialty", filters.specialty);
    if (filters.location) params.append("location", filters.location);
    
    fetch(`/api/workers/list?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setWorkers(data.workers);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unlockingWorkerId) return;
    setIsUnlocking(true);

    try {
      const res = await fetch("/api/workers/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workerId: unlockingWorkerId,
          employerName: employerData.name,
          employerEmail: employerData.email,
          employerPhone: employerData.phone,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setUnlockedContacts(prev => ({
          ...prev,
          [unlockingWorkerId]: data.contact
        }));
        setUnlockingWorkerId(null);
      } else {
        alert(data.message || "Κάτι πήγε στραβά.");
      }
    } catch (err) {
      alert("Σφάλμα σύνδεσης.");
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Unlock Modal */}
      {unlockingWorkerId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Ξεκλείδωμα Επικοινωνίας</h3>
            <p className="text-slate-500 mb-6">Συμπληρώστε τα στοιχεία σας για να δείτε τα στοιχεία του τεχνικού. Είναι δωρεάν!</p>
            
            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              <input 
                required 
                placeholder="Ονοματεπώνυμο ή Εταιρεία" 
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={employerData.name}
                onChange={e => setEmployerData({...employerData, name: e.target.value})}
              />
              <input 
                required 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={employerData.email}
                onChange={e => setEmployerData({...employerData, email: e.target.value})}
              />
              <input 
                required 
                placeholder="Τηλέφωνο" 
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={employerData.phone}
                onChange={e => setEmployerData({...employerData, phone: e.target.value})}
              />
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  disabled={isUnlocking}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {isUnlocking ? "Επεξεργασία..." : "Εμφάνιση Στοιχείων"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setUnlockingWorkerId(null)}
                  className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition"
                >
                  Άκυρο
                </button>
              </div>

              <p className="text-[10px] text-slate-400 mt-4 leading-relaxed text-center">
                Με την υποβολή, συμφωνείτε με την <Link href="/gdpr" className="underline" target="_blank">Πολιτική Απορρήτου</Link>. Τα στοιχεία σας θα κοινοποιηθούν στον τεχνικό για την έναρξη της επικοινωνίας.
              </p>
            </form>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">TexnikesDouleies.gr</Link>
          
          <div className="flex items-center gap-4">
            <Link href="/how-it-works" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Πώς λειτουργεί</Link>
            <Link href="/workers" className="hidden md:block text-sm font-semibold text-indigo-600">Για Τεχνικούς</Link>
            <Link href="/employers" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Για Εργοδότες</Link>
            <div className="hidden lg:flex items-center gap-3 ml-2">
               <Link href="/jobs?showPostJob=true" className="rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition">Καταχώρηση Αγγελίας</Link>
               <button onClick={() => setShowPostWorkerModal(true)} className="rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition">Καταχώρηση Τεχνικού</button>
            </div>
            <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
          </div>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4 text-sm font-semibold text-slate-600">
            <Link href="/how-it-works" onClick={() => setIsMenuOpen(false)}>Πώς λειτουργεί</Link>
            <Link href="/workers" onClick={() => setIsMenuOpen(false)}>Για Τεχνικούς</Link>
            <Link href="/employers" onClick={() => setIsMenuOpen(false)}>Για Εργοδότες</Link>
            <Link href="/jobs?showPostJob=true" className="text-indigo-600 font-bold">Καταχώρηση Αγγελίας</Link>
            <button onClick={() => { setShowPostWorkerModal(true); setIsMenuOpen(false); }} className="text-slate-900 text-left font-bold">Καταχώρηση Τεχνικού</button>
          </nav>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Εύρεση Τεχνικών</h1>
          <p className="text-lg text-slate-600">Βρείτε έμπειρους επαγγελματίες για κάθε εργασία.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 bg-white p-4 rounded-[32px] border border-slate-200 shadow-sm">
          <select 
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={filters.specialty}
            onChange={(e) => setFilters({...filters, specialty: e.target.value})}
          >
            <option value="">Όλες οι ειδικότητες</option>
            {specialtyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <input 
            placeholder="Περιοχή..." 
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium animate-pulse">Αναζήτηση τεχνικών...</div>
        ) : workers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Δεν βρέθηκαν τεχνικοί</h3>
            <p className="text-slate-500">Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {workers.map(worker => {
              const unlocked = unlockedContacts[worker._id];
              return (
                <div key={worker._id} className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900">
                          {worker.firstName} {unlocked ? unlocked.lastName : worker.lastNameInitial}
                        </h3>
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {worker.specialty}
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">
                        <span>📍 {worker.location}</span>
                        <span>•</span>
                        <span>⏳ {worker.experienceYears} Έτη Εμπειρίας</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {worker.bio || "Δεν υπάρχει διαθέσιμο βιογραφικό."}
                      </p>
                      
                      {unlocked && (
                        <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2 animate-in fade-in slide-in-from-left-4 duration-500">
                          <p className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                            <span>📞</span> {unlocked.phone}
                          </p>
                          <p className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                            <span>📧</span> {unlocked.email}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {!unlocked && (
                      <div className="shrink-0 flex flex-col justify-center">
                        <button 
                          onClick={() => setUnlockingWorkerId(worker._id)}
                          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-100"
                        >
                          🔒 Ξεκλείδωμα Επικοινωνίας
                        </button>
                        <p className="text-[10px] text-center text-slate-400 mt-2 font-bold uppercase tracking-widest">
                          Δωρεάν για περιορισμένο χρόνο
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      
      <footer className="border-t bg-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>© 2026 TexnikesDouleies.gr</div>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-slate-900 transition">Όροι Χρήσης</Link>
            <Link href="/gdpr" className="hover:text-slate-900 transition">Προσωπικά Δεδομένα</Link>
          </div>
        </div>
      </footer>

      {/* Modals & Notifications */}
      <div className="fixed bottom-4 right-4 z-[110] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={`max-w-sm rounded-3xl border px-4 py-3 shadow-lg text-sm font-medium text-white transition-all duration-300 ${toast.type === "success" ? "bg-emerald-500" : toast.type === "error" ? "bg-rose-500" : "bg-slate-700"} ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
            {toast.message}
          </div>
        ))}
      </div>

      {showPostWorkerModal && (
        <PostWorkerFlow 
          onClose={() => setShowPostWorkerModal(false)} 
          onWorkerCreated={() => {
            showToast("Το προφίλ σας καταχωρήθηκε και εκκρεμεί έγκριση.");
            fetchWorkers();
          }} 
          showToast={showToast} 
          specialtyOptions={specialtyOptions} 
          locationOptions={locationOptions} 
        />
      )}
    </div>
  );
}
