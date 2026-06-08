import Link from "next/link";

export default function GdprPage() {
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
          <h1 className="text-3xl font-black mb-6">Πολιτική Απορρήτου (GDPR)</h1>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900">1. Υπεύθυνος Επεξεργασίας</h2>
              <p>Υπεύθυνος επεξεργασίας των προσωπικών δεδομένων που συλλέγονται είναι το TexnikesDouleies.gr. Επικοινωνία: privacy@texnikesdouleies.gr</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">2. Δεδομένα που συλλέγουμε</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Στοιχεία επικοινωνίας:</strong> Email, τηλέφωνο (Εργοδότες, Τεχνικοί, Υποψήφιοι).</li>
                <li><strong>Προφίλ Τεχνικών:</strong> Ονοματεπώνυμο, ειδικότητα, τοποθεσία, εμπειρία, βιογραφικό.</li>
                <li><strong>Δεδομένα αγγελιών:</strong> Περιεχόμενο αγγελιών και στοιχεία επιχείρησης.</li>
                <li><strong>Leads (Ενδιαφέρον):</strong> Στοιχεία εργοδοτών που εκδηλώνουν ενδιαφέρον για επικοινωνία με τεχνικούς.</li>
                <li><strong>Τεχνικά δεδομένα:</strong> IP address, User Agent (για λόγους ασφαλείας και πρόληψης απάτης).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">3. Σκοπός και Νομική Βάση</h2>
              <p>Η επεξεργασία βασίζεται:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Στη συγκατάθεσή σας:</strong> Για τη δημιουργία προφίλ τεχνικού ή την εγγραφή σε ειδοποιήσεις.</li>
                <li><strong>Στην εκτέλεση της σύμβασης:</strong> Για τη δημοσίευση αγγελιών και τη διασύνδεση εργοδοτών με τεχνικούς.</li>
                <li><strong>Στο έννομο συμφέρον:</strong> Για την ασφάλεια της πλατφόρμας και την αποτροπή κακόβουλης χρήσης (spam/scams).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">4. Κοινοποίηση Δεδομένων</h2>
              <p>Τα δεδομένα σας κοινοποιούνται μόνο στο πλαίσιο της λειτουργίας της υπηρεσίας:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Τα στοιχεία των τεχνικών κοινοποιούνται σε εργοδότες που εκδηλώνουν ενδιαφέρον.</li>
                <li>Τα στοιχεία των εργοδοτών (Leads) κοινοποιούνται στους αντίστοιχους τεχνικούς.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">5. Πολιτική Διατήρησης (Retention)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Προφίλ Τεχνικών:</strong> Μέχρι ο χρήστης να ζητήσει τη διαγραφή τους.</li>
                <li><strong>Αιτήσεις εργασίας:</strong> 12 μήνες.</li>
                <li><strong>Ανενεργές αγγελίες:</strong> 24 μήνες.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">6. Δικαιώματα Χρηστών</h2>
              <p>Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής (δικαίωμα στη λήθη), περιορισμού της επεξεργασίας και φορητότητας των δεδομένων σας. Για την άσκηση των δικαιωμάτων σας, επικοινωνήστε στο privacy@texnikesdouleies.gr.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
