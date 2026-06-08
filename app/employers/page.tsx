import Link from "next/link";

export default function EmployersPackages() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">TexnikesDouleies.gr</Link>
          <Link href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">← Επιστροφή στην Αρχική</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm text-indigo-700 font-bold mb-6">
          💼 Για Επιχειρήσεις & Επαγγελματίες
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-6 text-slate-900">Βρείτε το κατάλληλο τεχνικό προσωπικό</h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-16 leading-relaxed">
          Προσελκύστε έμπειρους τεχνίτες μέσα από την εξειδικευμένη πλατφόρμα μας. Επιλέξτε το πακέτο που ταιριάζει στις ανάγκες σας.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="rounded-[40px] border border-slate-200 bg-white p-10 shadow-sm transition hover:shadow-md">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Απλή</div>
            <div className="text-5xl font-black mb-6">€0</div>
            <p className="text-slate-500 mb-8 text-sm">Ιδανικό για μικρές εργασίες χωρίς βιασύνη.</p>
            <ul className="space-y-4 mb-10 text-slate-700 font-medium">
              <li className="flex items-center gap-2">✅ Δημοσίευση για 30 ημέρες</li>
              <li className="flex items-center gap-2">✅ Έγκριση εντός 72 ωρών</li>
              <li className="flex items-center gap-2 text-slate-300">❌ Προτεραιότητα στη λίστα</li>
            </ul>
            <Link href="/?showPostJob=true&plan=free" className="block w-full py-4 text-center rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition">Επιλογή</Link>
          </div>

          {/* Featured Plan */}
          <div className="rounded-[40px] border border-slate-200 bg-slate-50 p-10 shadow-sm opacity-80 cursor-not-allowed">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Προβεβλημένη</div>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-[10px] font-black uppercase text-slate-600">Σύντομα κοντά σας</span>
          </div>
          <div className="text-5xl font-black mb-6 text-slate-400">€49</div>
          <p className="text-slate-500 mb-8 text-sm">Άμεση έγκριση, κορυφαία εμφάνιση & σήμανση.</p>
          <ul className="space-y-4 mb-10 text-slate-400 font-medium">
            <li className="flex items-center gap-2">✅ Άμεση δημοσίευση</li>
            <li className="flex items-center gap-2">✅ Κορυφαία εμφάνιση</li>
            <li className="flex items-center gap-2">✅ Ειδική σήμανση 🚨</li>
          </ul>
          <div className="block w-full py-4 text-center rounded-2xl bg-slate-200 text-slate-500 font-bold cursor-not-allowed">Μη Διαθέσιμο</div>
          </div>
        </div>

        <div className="mt-20 bg-indigo-900 rounded-[48px] p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Χρειάζεστε βοήθεια;</h2>
          <p className="opacity-80 mb-8">Η ομάδα μας είναι εδώ για να σας βοηθήσει να βρείτε το σωστό προσωπικό.</p>
          <a href="mailto:info.texnikesdouleies@gmail.com" className="inline-block bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black hover:bg-slate-100 transition">Επικοινωνία με την Ομάδα</a>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <Link href="/how-it-works" className="hover:text-indigo-600 transition">Πώς λειτουργεί</Link>
          <Link href="/faq" className="hover:text-indigo-600 transition">FAQ</Link>
          <Link href="/terms" className="hover:text-indigo-600 transition">Όροι Χρήσης</Link>
        </div>
        <div>© 2026 TexnikesDouleies.gr · Όλα τα δικαιώματα προστατεύονται.</div>
      </footer>
    </div>
  );
}
