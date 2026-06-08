import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white py-12 mt-auto">
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
          <a href="mailto:info.texnikesdouleies@gmail.com" className="hover:text-indigo-600 transition">Επικοινωνία</a>
        </div>
      </div>
    </footer>
  );
}
