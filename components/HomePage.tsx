"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import PostJobFlow from "./job/PostJobFlow";
import PostWorkerFlow from "./job/PostWorkerFlow";

export const specialtyOptions = [
  "Ηλεκτρολόγος εγκαταστάσεων", "Βοηθός Ηλεκτρολόγου", "Υδραυλικός", "Ψυκτικός / Κλιματισμός", "Χτίστης / Μπετατζής", 
  "Σοβατζής / Επιχριστής", "Τεχνίτης σιδήρου / Κολλητής", "Χειριστής κλαρκ / Περονοφόρου", 
  "Χειριστής γερανού / Μηχανημάτων", "Κατασκευαστής ξυλουργικών / Ξυλουργός", 
  "Συντηρητής οικοδομών / Τεχνίτης κτιρίων", "Ελαιοχρωματιστής", "Γυψοσανιδάς / Ψευδοροφές", 
  "Αλουμινάς / Τεχνίτης Κουφωμάτων", "Τεχνίτης Πλακιδίων / Μαρμάρων", "Μονωτής / Στεγανωτής", 
  "Τεχνικός Καυστήρων / Φυσικού Αερίου", "Τεχνικός Ανελκυστήρων", "Τεχνικός Ασφαλείας / Συναγερμών", 
  "Τεχνικός Δικτύων", "Τεχνικός Λευκών Συσκευών", "Μηχανικός Αυτοκινήτων / Οχημάτων", "Φανοποιός", "Βαφέας", "Τεντοποιός", "Κηπουρός / Σχεδιαστής Τοπίου", "Εργάτης", "Οδηγός",
];

export const locationOptions = [
  "Ολόκληρη η Ελλάδα", "Αθήνα", "Θεσσαλονίκη", "Πάτρα", "Ηράκλειο", "Λάρισα", 
  "Βόλος", "Ιωάννινα", "Πειραιάς", "Ρόδος", "Χανιά",
];

function HomeContent() {
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info"; visible: boolean }[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type, visible: true }]);
    setTimeout(() => setToasts((current) => current.map((t) => t.id === id ? { ...t, visible: false } : t)), 3000);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3500);
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

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">TexnikesDouleies.gr</Link>
          
          <div className="flex items-center gap-4">
            <Link href="/how-it-works" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Πώς λειτουργεί</Link>
            <Link href="/workers" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Για Τεχνικούς</Link>
            <Link href="/employers" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Για Εργοδότες</Link>
            <div className="hidden lg:flex items-center gap-3 ml-2">
               <button onClick={() => setShowPostJobModal(true)} className="rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition">Καταχώρηση Αγγελίας</button>
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
            <button onClick={() => { setShowPostJobModal(true); setIsMenuOpen(false); }} className="text-indigo-600 text-left font-bold">Καταχώρηση Αγγελίας</button>
            <button onClick={() => { setShowPostWorkerModal(true); setIsMenuOpen(false); }} className="text-slate-900 text-left font-bold">Καταχώρηση Τεχνικού</button>
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 pt-20 pb-24 md:pt-32 md:pb-40">
           <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                Η νούμερο 1 πλατφόρμα για <span className="text-indigo-600">τεχνικά επαγγέλματα</span> στην Ελλάδα
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

        {/* Info Section */}
        <section className="bg-slate-50 py-24">
           <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                 <h2 className="text-4xl font-black mb-4">Γιατί να μας επιλέξετε</h2>
                 <p className="text-lg text-slate-600">Η πιο απλή και αποτελεσματική πλατφόρμα στην Ελλάδα.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12">
                 <div className="text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="text-xl font-bold mb-2">Ταχύτητα</h3>
                    <p className="text-slate-600">Καταχώρηση αγγελίας ή προφίλ σε λιγότερο από 2 λεπτά. Χωρίς περίπλοκες φόρμες.</p>
                 </div>
                 <div className="text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-xl font-bold mb-2">Αξιοπιστία</h3>
                    <p className="text-slate-600">Πραγματοποιούμε έλεγχο σε κάθε καταχώρηση για να διασφαλίσουμε την ποιότητα της πλατφόρμας.</p>
                 </div>
                 <div className="text-center">
                    <div className="text-4xl mb-4">💸</div>
                    <h3 className="text-xl font-bold mb-2">Δωρεάν</h3>
                    <p className="text-slate-600">Η βασική χρήση της πλατφόρμας είναι και θα παραμείνει δωρεάν για όλους.</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-slate-500 text-center md:text-left">
          <div className="space-y-4">
             <div className="text-xl font-bold text-slate-900 tracking-tight">TexnikesDouleies.gr</div>
             <p>© 2026 · Όλα τα δικαιώματα προστατεύονται.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center font-bold uppercase tracking-widest text-[10px]">
            <Link href="/jobs" className="hover:text-indigo-600 transition">Δουλειές</Link>
            <Link href="/workers" className="hover:text-indigo-600 transition">Τεχνικοί</Link>
            <Link href="/how-it-works" className="hover:text-indigo-600 transition">Πώς λειτουργεί</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition">Όροι Χρήσης</Link>
            <Link href="/gdpr" className="hover:text-indigo-600 transition">Privacy</Link>
            <Link href="/faq" className="hover:text-indigo-600 transition">FAQ</Link>
          </div>
        </div>
      </footer>

      {showPostJobModal && <PostJobFlow onClose={() => setShowPostJobModal(false)} onJobCreated={() => showToast("Η αγγελία σας καταχωρήθηκε!")} showToast={showToast} specialtyOptions={specialtyOptions} locationOptions={locationOptions} />}
      {showPostWorkerModal && <PostWorkerFlow onClose={() => setShowPostWorkerModal(false)} onWorkerCreated={() => showToast("Το προφίλ σας καταχωρήθηκε!")} showToast={showToast} specialtyOptions={specialtyOptions} locationOptions={locationOptions} />}
    </div>
  );
}

export default function HomePage() {
  return <Suspense><HomeContent /></Suspense>;
}
