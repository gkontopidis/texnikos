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
                <li><strong>Στοιχεία επικοινωνίας:</strong> Email, τηλέφωνο.</li>
                <li><strong>Δεδομένα εργασίας:</strong> Στοιχεία αγγελιών και αιτήσεων.</li>
                <li><strong>Τεχνικά δεδομένα:</strong> IP address, User Agent (για λόγους ασφαλείας και πρόληψης απάτης).</li>
                <li><strong>Cookies:</strong> Αποθηκευμένες ρυθμίσεις χρήστη.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">3. Νομική Βάση</h2>
              <p>Η επεξεργασία βασίζεται:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Στη συγκατάθεσή σας (consent).</li>
                <li>Στην εκτέλεση της σύμβασης (contract fulfillment).</li>
                <li>Στο έννομο συμφέρον της πλατφόρμας (ασφάλεια και αποτροπή spam).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">4. Retention Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Αιτήσεις εργασίας:</strong> 12 μήνες.</li>
                <li><strong>Ανενεργές αγγελίες:</strong> 24 μήνες.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">5. Δικαιώματα Χρηστών</h2>
              <p>Μπορείτε ανά πάσα στιγμή να ζητήσετε πρόσβαση, διόρθωση, διαγραφή ή εξαγωγή των δεδομένων σας στέλνοντας email στο privacy@texnikesdouleies.gr.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
