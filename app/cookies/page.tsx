import Link from "next/link";

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="font-bold tracking-tight">TexnikesDouleies.gr</Link>
          <Link href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">← Επιστροφή στην Αρχική</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
          <h1 className="text-3xl font-black mb-6">Πολιτική Cookies</h1>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>Το TexnikesDouleies.gr χρησιμοποιεί cookies για να βελτιώσει την εμπειρία περιήγησής σας.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-6">Τι είναι τα Cookies;</h2>
            <p>Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας κατά την επίσκεψή σας στον ιστότοπό μας.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-6">Τα Cookies που χρησιμοποιούμε</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies Λειτουργικότητας:</strong> Απαραίτητα για την αποθήκευση των ρυθμίσεών σας (π.χ. αποθηκευμένες αγγελίες).</li>
              <li><strong>Cookies Ανάλυσης (Analytics):</strong> Χρησιμοποιούνται για να κατανοήσουμε πώς χρησιμοποιείται το site μας, ώστε να το βελτιώνουμε.</li>
            </ul>
            <p className="mt-6">Δεν χρησιμοποιούμε cookies για διαφημιστικό profiling ή παρακολούθηση σε άλλους ιστότοπους.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
