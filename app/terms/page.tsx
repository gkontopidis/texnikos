export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-6">
          <a href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">← Επιστροφή στην Αρχική</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[40px] border border-slate-200 p-8 md:p-12 shadow-sm">
          <h1 className="text-4xl font-black tracking-tight mb-8 text-slate-900">Όροι Χρήσης</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Αποδοχή Όρων</h2>
              <p>
                Με την πρόσβαση και τη χρήση του TexnikesDouleies.gr, συμφωνείτε ότι δεσμεύεστε από τους παρόντες Όρους Χρήσης. Εάν δεν συμφωνείτε με οποιοδήποτε μέρος των όρων, παρακαλούμε να μη χρησιμοποιείτε την πλατφόρμα.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Υπηρεσίες Πλατφόρμας</h2>
              <p>
                Το TexnikesDouleies.gr αποτελεί έναν διαδικτυακό τόπο προβολής αγγελιών εργασίας για τεχνικά επαγγέλματα. Δεν συμμετέχουμε στις συμβάσεις εργασίας και δεν εγγυόμαστε την ακρίβεια των στοιχείων που υποβάλλονται από τρίτους.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Υποχρεώσεις Χρηστών</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Οι αγγελίες πρέπει να είναι αληθείς και να αφορούν πραγματικές θέσεις εργασίας.</li>
                <li>Απαγορεύεται η δημοσίευση προσβλητικού, παράνομου ή παραπλανητικού περιεχομένου.</li>
                <li>Οι εργοδότες είναι υπεύθυνοι για τη διαχείριση των αιτήσεων που λαμβάνουν.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Πληρωμές & Πακέτα</h2>
              <p>
                Η πλατφόρμα προσφέρει δωρεάν και επί πληρωμή πακέτα προβολής. Οι τιμές ενδέχεται να αλλάξουν με προηγούμενη ενημέρωση. Επιστροφές χρημάτων δεν πραγματοποιούνται μετά τη δημοσίευση της αγγελίας.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Περιορισμός Ευθύνης</h2>
              <p>
                Το TexnikesDouleies.gr δεν ευθύνεται για οποιαδήποτε ζημία προκύψει από τη χρήση της πλατφόρμας ή από την αδυναμία πρόσβασης σε αυτήν. Η χρήση γίνεται με αποκλειστική ευθύνη του χρήστη.
              </p>
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
