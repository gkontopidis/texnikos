import Link from "next/link";

export default function GdprPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">← Επιστροφή στην Αρχική</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[40px] border border-slate-200 p-8 md:p-12 shadow-sm">
          <h1 className="text-4xl font-black tracking-tight mb-8 text-slate-900">Πολιτική Απορρήτου (GDPR)</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Υπεύθυνος Επεξεργασίας</h2>
              <p>Υπεύθυνος για την επεξεργασία των προσωπικών σας δεδομένων στο TexnikesDouleies.gr είναι η ομάδα μας. Για οποιοδήποτε ζήτημα που αφορά τα δεδομένα σας, μπορείτε να επικοινωνήσετε στο privacy@texnikesdouleies.gr.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Δεδομένα που Συλλέγουμε & Σκοπός</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Εργοδότες:</strong> Email, τηλέφωνο και στοιχεία επιχείρησης για την επικοινωνία με υποψηφίους.</li>
                <li><strong>Υποψήφιοι:</strong> Ονοματεπώνυμο, τηλέφωνο και email που υποβάλλονται κατά την αίτηση εργασίας.</li>
                <li><strong>Τεχνικά Δεδομένα:</strong> IP και δεδομένα περιήγησης για λόγους ασφαλείας.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Διατήρηση Δεδομένων (Retention Policy)</h2>
              <p>Τα δεδομένα διατηρούνται για το απολύτως απαραίτητο χρονικό διάστημα:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Αγγελίες & Αιτήσεις:</strong> Έως 6 μήνες μετά την κλείσιμο της αγγελίας.</li>
                <li><strong>Εγγραφές Alerts:</strong> Μέχρι ο χρήστης να ζητήσει διαγραφή μέσω του σχετικού συνδέσμου στο email.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Cookies & Tracking</h2>
              <p>Χρησιμοποιούμε cookies αποκλειστικά για τη λειτουργικότητα της σελίδας (π.χ. αποθηκευμένες αγγελίες στη συσκευή σας). Δεν προβαίνουμε σε διαφημιστικό profiling τρίτων.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Τα Δικαιώματά σας & Διαγραφή</h2>
              <p>Έχετε το δικαίωμα ανάκλησης της συγκατάθεσης, πρόσβασης, διόρθωσης ή οριστικής διαγραφής των δεδομένων σας. Για να ασκήσετε τα δικαιώματά σας, στείλτε ένα αίτημα στο privacy@texnikesdouleies.gr με θέμα "Αίτημα Διαγραφής Δεδομένων". Θα ανταποκριθούμε εντός 30 ημερών.</p>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        © 2026 TexnikesDouleies.gr · Πολιτική Απορρήτου
      </footer>
    </div>
  );
}
