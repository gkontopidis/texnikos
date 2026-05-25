export default function GdprPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-6">
          <a href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">← Επιστροφή στην Αρχική</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[40px] border border-slate-200 p-8 md:p-12 shadow-sm">
          <h1 className="text-4xl font-black tracking-tight mb-8 text-slate-900">Πολιτική Απορρήτου (GDPR)</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Εισαγωγή</h2>
              <p>
                Στο TexnikesDouleies.gr, η προστασία των προσωπικών σας δεδομένων είναι πρωταρχική μας προτεραιότητα. Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τις πληροφορίες σας σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Δεδομένα που Συλλέγουμε</h2>
              <p>Συλλέγουμε πληροφορίες που είναι απαραίτητες για τη λειτουργία της πλατφόρμας:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Για Εργοδότες:</strong> Όνομα εταιρείας, email, τηλέφωνο και στοιχεία αγγελίας.</li>
                <li><strong>Για Υποψήφιους:</strong> Στοιχεία που υποβάλλονται μέσω της φόρμας αίτησης (όνομα, email, τηλέφωνο).</li>
                <li><strong>Τεχνικά Δεδομένα:</strong> Διεύθυνση IP, τύπος προγράμματος περιήγησης και δεδομένα χρήσης μέσω cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Σκοπός Επεξεργασίας</h2>
              <p>Χρησιμοποιούμε τα δεδομένα σας αποκλειστικά για:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Τη διευκόλυνση της επικοινωνίας μεταξύ εργοδοτών και υποψηφίων.</li>
                <li>Την αποστολή ενημερώσεων για νέες θέσεις εργασίας (Alerts), εφόσον έχετε εγγραφεί.</li>
                <li>Τη βελτίωση των υπηρεσιών μας και την ασφάλεια της πλατφόρμας.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Τα Δικαιώματά σας</h2>
              <p>Έχετε το δικαίωμα πρόσβασης, διόρθωσης, διαγραφής ή περιορισμού της επεξεργασίας των δεδομένων σας. Μπορείτε να ζητήσετε τη διαγραφή της αγγελίας ή της εγγραφής σας στα alerts ανά πάσα στιγμή.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Επικοινωνία</h2>
              <p>Για οποιαδήποτε ερώτηση σχετικά με τα προσωπικά σας δεδομένα, μπορείτε να επικοινωνήσετε μαζί μας στο privacy@texnikesdouleies.gr.</p>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        © 2026 TexnikesDouleies.gr · Όλα τα δικαιώματα προστατεύονται.
      </footer>
    </div>
  );
}
