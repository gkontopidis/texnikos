import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">← Επιστροφή στην Αρχική</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[40px] border border-slate-200 p-8 md:p-12 shadow-sm">
          <h1 className="text-4xl font-black tracking-tight mb-8 text-slate-900">Όροι Χρήσης</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Αποδοχή Όρων & Explicit Consent</h2>
              <p>Με τη χρήση της πλατφόρμας, αποδέχεστε τους όρους. Επιπλέον, για την υποβολή αιτήσεων ή τη δημιουργία alerts, παρέχετε τη ρητή σας συγκατάθεση για την προώθηση των δεδομένων σας στον ενδιαφερόμενο εργοδότη.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Moderation & Αναφορές Κατάχρησης</h2>
              <p>Η πλατφόρμα διατηρεί το δικαίωμα ελέγχου και αφαίρεσης αγγελιών που κρίνονται παράνομες ή παραπλανητικές.</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Αναφορά:</strong> Εντοπίσατε προβληματική αγγελία; Στείλτε μας στο abuse@texnikesdouleies.gr.</li>
                <li><strong>Moderation:</strong> Κάθε καταγγελία ερευνάται εντός 48 ωρών.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Υποχρεώσεις Χρηστών</h2>
              <p>Οι χρήστες δεσμεύονται για την παροχή αληθών στοιχείων. Η υποποίηση ταυτότητας τρίτων απαγορεύεται αυστηρά και επιφέρει αποκλεισμό.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Περιορισμός Ευθύνης</h2>
              <p>Το TexnikesDouleies.gr λειτουργεί ως δίαυλος επικοινωνίας. Δεν φέρουμε ευθύνη για τη σύναψη ή την έκβαση των εργασιακών σχέσεων μεταξύ των χρηστών.</p>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        © 2026 TexnikesDouleies.gr · Όροι Χρήσης
      </footer>
    </div>
  );
}
