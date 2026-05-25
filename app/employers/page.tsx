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

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Basic Plan */}
          <div className="rounded-[40px] border border-slate-200 bg-white p-10 shadow-sm transition hover:shadow-md">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Απλή</div>
            <div className="text-5xl font-black mb-6">€0</div>
            <p className="text-slate-500 mb-8 text-sm">Ιδανικό για μικρές εργασίες χωρίς βιασύνη.</p>
            <ul className="space-y-4 mb-10 text-slate-700 font-medium">
              <li className="flex items-center gap-2">✅ Δημοσίευση για 30 ημέρες</li>
              <li className="flex items-center gap-2">✅ Έγκριση σε 72 ώρες</li>
              <li className="flex items-center gap-2 text-slate-300">❌ Προτεραιότητα στη λίστα</li>
              <li className="flex items-center gap-2 text-slate-300">❌ Email Alerts</li>
            </ul>
            <Link href="/" className="block w-full py-4 text-center rounded-2xl bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition">Επιλογή</Link>
          </div>

          {/* Featured Plan */}
          <div className="rounded-[40px] border-2 border-emerald-500 bg-white p-10 shadow-xl relative scale-105 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Δημοφιλές</div>
            <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Προβεβλημένη</div>
            <div className="text-5xl font-black mb-6">€49</div>
            <p className="text-slate-500 mb-8 text-sm">Για επιχειρήσεις που θέλουν άμεσα αποτελέσματα.</p>
            <ul className="space-y-4 mb-10 text-slate-700 font-medium">
              <li className="flex items-center gap-2">✅ Άμεση δημοσίευση</li>
              <li className="flex items-center gap-2">✅ Πάνω από τις δωρεάν</li>
              <li className="flex items-center gap-2">✅ Ειδική σήμανση ⭐</li>
              <li className="flex items-center gap-2 text-slate-300">❌ Email Alerts</li>
            </ul>
            <Link href="/" className="block w-full py-4 text-center rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">Επιλογή</Link>
          </div>

          {/* Urgent Plan */}
          <div className="rounded-[40px] border border-slate-200 bg-white p-10 shadow-sm transition hover:shadow-md">
            <div className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">Επείγουσα</div>
            <div className="text-5xl font-black mb-6">€99</div>
            <p className="text-slate-500 mb-8 text-sm">Όταν η θέση πρέπει να καλυφθεί "χθες".</p>
            <ul className="space-y-4 mb-10 text-slate-700 font-medium">
              <li className="flex items-center gap-2">✅ Όλα της Προβεβλημένης</li>
              <li className="flex items-center gap-2">✅ Email Alerts σε 1000+</li>
              <li className="flex items-center gap-2">✅ 🚨 Σήμανση ΕΠΕΙΓΟΝ</li>
              <li className="flex items-center gap-2">✅ Facebook Ad Boost</li>
            </ul>
            <Link href="/" className="block w-full py-4 text-center rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition">Επιλογή</Link>
          </div>
        </div>

        <div className="mt-20 bg-indigo-900 rounded-[48px] p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Χρειάζεστε βοήθεια;</h2>
          <p className="opacity-80 mb-8">Η ομάδα μας είναι εδώ για να σας βοηθήσει να βρείτε το σωστό προσωπικό.</p>
          <a href="mailto:support@texnikesdouleies.gr" className="inline-block bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black hover:bg-slate-100 transition">Επικοινωνία με την Ομάδα</a>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        © 2026 TexnikesDouleies.gr · Όλα τα δικαιώματα προστατεύονται.
      </footer>
    </div>
  );
}
