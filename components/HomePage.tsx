"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import PostJobFlow from "./job/PostJobFlow";
import PostWorkerFlow from "./job/PostWorkerFlow";
import Header from "./Header";
import Footer from "./Footer";
import { specialtyOptions, locationOptions } from "@/lib/constants";

function HomeContent() {
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);
  const [stats, setStats] = useState({ active: 0, closed: 0, technicians: 0 });
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info"; visible: boolean }[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(err => console.error("Stats Fetch Error:", err));
  }, []);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type, visible: true }]);
    setTimeout(() => setToasts((current) => current.map((t) => t.id === id ? { ...t, visible: false } : t)), 3000);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3500);
  };

  const handleWorkerCreated = () => {
    fetch("/api/jobs").then(res => res.json()).then(data => data.stats && setStats(data.stats));
    showToast("Το προφίλ σας καταχωρήθηκε!");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={`max-w-sm rounded-3xl border px-4 py-3 shadow-lg text-sm font-medium text-white transition-all duration-300 ${toast.type === "success" ? "bg-emerald-500" : toast.type === "error" ? "bg-rose-500" : "bg-slate-700"} ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
            {toast.message}
          </div>
        ))}
      </div>

      <Header setShowPostJobModal={setShowPostJobModal} setShowPostWorkerModal={setShowPostWorkerModal} />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 pt-20 pb-24 md:pt-32 md:pb-40">
           <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                Πλατφόρμα αποκλειστικά για <span className="text-indigo-600">τεχνικά επαγγέλματα</span> στην Ελλάδα
              </h1>
              <p className="max-w-3xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
                Συνδέουμε εργοδότες και τεχνίτες με αξιοπιστία, ταχύτητα και χωρίς περίπλοκες διαδικασίες εγγραφής.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link href="/jobs" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-100">
                    Αναζήτηση Εργασίας
                 </Link>
                 <Link href="/workers" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-[24px] font-black text-lg hover:bg-slate-50 transition">
                    Εύρεση Τεχνικού
                 </Link>
              </div>
           </div>
           
           {/* Decorative elements */}
           <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 -translate-x-1/2"></div>
           <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12 border-y border-slate-100">
           <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex items-center gap-8 justify-center">
                  <div className="text-5xl font-black text-indigo-600">{stats.active}</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-tight">Ενεργές<br/>Αγγελίες</div>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex items-center gap-8 justify-center">
                  <div className="text-5xl font-black text-emerald-600">{stats.closed}</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-tight">Βρήκαν<br/>Δουλειά</div>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex items-center gap-8 justify-center">
                  <div className="text-5xl font-black text-amber-500">{stats.technicians}</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-tight">Εγγεγραμμένοι<br/>Τεχνικοί</div>
              </div>
           </div>
        </section>

        {/* Dual Path Section */}
        <section className="max-w-6xl mx-auto px-6 py-24">
           <div className="grid md:grid-cols-2 gap-8">
              {/* Employer Path */}
              <div className="bg-white rounded-[48px] border border-slate-200 p-10 md:p-14 shadow-sm hover:shadow-md transition">
                 <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-[24px] flex items-center justify-center text-3xl mb-8">💼</div>
                 <h2 className="text-3xl font-black mb-4">Για Εργοδότες</h2>
                 <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                    Χρειάζεστε τεχνικό προσωπικό; Δημοσιεύστε την αγγελία σας ή περιηγηθείτε στον κατάλογο των επαγγελματιών μας.
                 </p>
                 <div className="flex flex-col gap-4">
                    <button onClick={() => setShowPostJobModal(true)} className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black hover:bg-indigo-700 transition">
                       Καταχώρηση Αγγελίας
                    </button>
                    <Link href="/workers" className="w-full py-5 border border-slate-200 text-slate-900 text-center rounded-[24px] font-black hover:bg-slate-50 transition">
                       Βρείτε Τεχνικούς
                    </Link>
                 </div>
              </div>

              {/* Technician Path */}
              <div className="bg-slate-900 rounded-[48px] p-10 md:p-14 text-white shadow-xl">
                 <div className="w-16 h-16 bg-slate-800 text-amber-400 rounded-[24px] flex items-center justify-center text-3xl mb-8">🔧</div>
                 <h2 className="text-3xl font-black mb-4">Για Τεχνικούς</h2>
                 <p className="text-lg opacity-80 mb-10 leading-relaxed">
                    Αναζητάτε την επόμενη δουλειά σας; Δημιουργήστε το προφίλ σας για να σας βρίσκουν εργοδότες ή δείτε όλες τις ενεργές αγγελίες.
                 </p>
                 <div className="flex flex-col gap-4">
                    <button onClick={() => setShowPostWorkerModal(true)} className="w-full py-5 bg-amber-400 text-slate-950 rounded-[24px] font-black hover:bg-amber-300 transition">
                       Καταχώρηση Τεχνικού
                    </button>
                    <Link href="/jobs" className="w-full py-5 border border-white/20 text-white text-center rounded-[24px] font-black hover:bg-white/5 transition">
                       Βρείτε Δουλειά
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />

      {showPostJobModal && (
        <PostJobFlow 
          onClose={() => setShowPostJobModal(false)} 
          onJobCreated={() => { 
            fetch("/api/jobs").then(res => res.json()).then(data => data.stats && setStats(data.stats)); 
            showToast("Η αγγελία σας καταχωρήθηκε!"); 
          }} 
          showToast={showToast} 
          specialtyOptions={specialtyOptions} 
          locationOptions={locationOptions} 
        />
      )}
      {showPostWorkerModal && (
        <PostWorkerFlow 
          onClose={() => setShowPostWorkerModal(false)} 
          onWorkerCreated={handleWorkerCreated} 
          showToast={showToast} 
          specialtyOptions={specialtyOptions} 
          locationOptions={locationOptions} 
        />
      )}
    </div>
  );
}

export default function HomePage() {
  return <Suspense><HomeContent /></Suspense>;
}
