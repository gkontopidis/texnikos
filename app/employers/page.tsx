"use client";
import { useState } from "react";
import Link from "next/link";
import PostJobFlow from "@/components/job/PostJobFlow";
import { specialtyOptions, locationOptions } from "@/components/HomePage";

export default function EmployersPage() {
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info"; visible: boolean }[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type, visible: true }]);
    setTimeout(() => setToasts((current) => current.map((t) => t.id === id ? { ...t, visible: false } : t)), 3000);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={`max-w-sm rounded-3xl border px-4 py-3 shadow-lg text-sm font-medium text-white transition-all duration-300 ${toast.type === "success" ? "bg-emerald-500" : toast.type === "error" ? "bg-rose-500" : "bg-slate-700"} ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
            {toast.message}
          </div>
        ))}
      </div>

      <header className="bg-white border-b border-slate-200 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">TexnikesDouleies.gr</Link>
          <Link href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">← Επιστροφή στην Αρχική</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm text-indigo-700 font-bold mb-6 uppercase tracking-wider">
            💼 Για Επιχειρήσεις & Εργοδότες
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-6 text-slate-900 leading-tight">
            Βρείτε το κατάλληλο <span className="text-indigo-600">τεχνικό προσωπικό</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            Η νούμερο 1 πλατφόρμα στην Ελλάδα για την εύρεση εξειδικευμένων τεχνιτών. Δημοσιεύστε την αγγελία σας σήμερα.
          </p>
          
          <button 
            onClick={() => setShowPostJobModal(true)}
            className="px-12 py-6 bg-indigo-600 text-white rounded-[32px] font-black text-xl hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100 scale-110"
          >
            Καταχώρηση Αγγελίας
          </button>
        </div>

        {/* Informational Content (similar to landing) */}
        <div className="grid md:grid-cols-3 gap-12 mt-32 border-t pt-20">
           <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="text-4xl mb-6">⚡</div>
              <h3 className="text-xl font-bold mb-3">Ταχύτητα</h3>
              <p className="text-slate-600 leading-relaxed">Η αγγελία σας δημοσιεύεται άμεσα. Οι υποψήφιοι μπορούν να επικοινωνήσουν μαζί σας χωρίς καθυστέρηση.</p>
           </div>
           <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-xl font-bold mb-3">Στόχευση</h3>
              <p className="text-slate-600 leading-relaxed">Προσεγγίστε μόνο το κοινό που σας ενδιαφέρει: εξειδικευμένους τεχνικούς από όλη την Ελλάδα.</p>
           </div>
           <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="text-4xl mb-6">🆓</div>
              <h3 className="text-xl font-bold mb-3">Δωρεάν Επιλογές</h3>
              <p className="text-slate-600 leading-relaxed">Προσφέρουμε δωρεάν καταχώρηση για όλες τις βασικές ανάγκες πρόσληψης.</p>
           </div>
        </div>

        {/* Packages Section (Moved down) */}
        <div className="mt-40 text-center">
          <h2 className="text-3xl font-black mb-12">Επιλογές Προβολής</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="rounded-[40px] border border-slate-200 bg-white p-10 shadow-sm transition hover:shadow-md relative overflow-hidden">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Απλή Καταχώρηση</div>
              <div className="text-5xl font-black mb-6">€0</div>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">Ιδανικό για μικρές εργασίες ή επιχειρήσεις χωρίς άμεση βιασύνη.</p>
              <ul className="space-y-4 mb-10 text-slate-700 font-medium">
                <li className="flex items-center gap-2">✅ Δημοσίευση για 30 ημέρες</li>
                <li className="flex items-center gap-2">✅ Έγκριση εντός 72 ωρών</li>
                <li className="flex items-center gap-2 text-slate-300">❌ Προτεραιότητα στη λίστα</li>
              </ul>
              <button onClick={() => setShowPostJobModal(true)} className="block w-full py-4 text-center rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition">Επιλογή</button>
            </div>

            {/* Featured Plan */}
            <div className="rounded-[40px] border border-indigo-200 bg-indigo-50/30 p-10 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Προβεβλημένη</div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-black uppercase text-indigo-600">Σύντομα</span>
              </div>
              <div className="text-5xl font-black mb-6 text-indigo-900">€49</div>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">Άμεση έγκριση, κορυφαία εμφάνιση & ειδική σήμανση για μέγιστο αποτέλεσμα.</p>
              <ul className="space-y-4 mb-10 text-indigo-900/60 font-medium">
                <li className="flex items-center gap-2">✅ Άμεση δημοσίευση</li>
                <li className="flex items-center gap-2">✅ Κορυφαία εμφάνιση (Sticky)</li>
                <li className="flex items-center gap-2">✅ Ειδική σήμανση 🚨</li>
              </ul>
              <div className="block w-full py-4 text-center rounded-2xl bg-indigo-100 text-indigo-400 font-bold cursor-not-allowed">Μη Διαθέσιμο</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm border-t mt-20">
        <div className="flex gap-8 justify-center mb-4 font-bold uppercase tracking-widest text-[10px]">
          <Link href="/how-it-works" className="hover:text-indigo-600 transition">Πώς λειτουργεί</Link>
          <Link href="/faq" className="hover:text-indigo-600 transition">FAQ</Link>
          <Link href="/terms" className="hover:text-indigo-600 transition">Όροι Χρήσης</Link>
        </div>
        <div>© 2026 TexnikesDouleies.gr · Όλα τα δικαιώματα προστατεύονται.</div>
      </footer>

      {showPostJobModal && <PostJobFlow onClose={() => setShowPostJobModal(false)} onJobCreated={() => showToast("Η αγγελία σας καταχωρήθηκε!")} showToast={showToast} specialtyOptions={specialtyOptions} locationOptions={locationOptions} />}
    </div>
  );
}
