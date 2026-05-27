import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">TexnikesDouleies.gr</Link>
          <Link href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">← Επιστροφή στην Αρχική</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight mb-6 text-slate-900">Πώς λειτουργεί</h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            Η πλατφόρμα μας έχει σχεδιαστεί για να είναι απλή, γρήγορη και αποτελεσματική, 
            <strong> χωρίς την ανάγκη δημιουργίας λογαριασμού</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Employers Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm text-indigo-700 font-bold">
              💼 Για Εργοδότες & Επιχειρήσεις
            </div>
            <div className="bg-white rounded-[40px] border border-slate-200 p-10 shadow-sm space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-200">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Δημοσίευση Αγγελίας</h3>
                  <p className="text-slate-600">Συμπληρώστε τα στοιχεία της θέσης εργασίας σε λιγότερο από 2 λεπτά. Δεν απαιτείται εγγραφή ή κωδικοί.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-200">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Έλεγχος & Έγκριση</h3>
                  <p className="text-slate-600">Η ομάδα μας ελέγχει την αγγελία σας για να διασφαλίσει την ποιότητα και την αξιοπιστία της πλατφόρμας.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-200">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Διαχείριση μέσω Email</h3>
                  <p className="text-slate-600">Θα λάβετε ένα μοναδικό σύνδεσμο στο email σας για να επεξεργαστείτε, να ανανεώσετε ή να διαγράψετε την αγγελία σας.</p>
                </div>
              </div>

              <Link href="/?showPostJob=true" className="block w-full py-4 text-center rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition">Δημοσίευση Αγγελίας</Link>
            </div>
          </div>

          {/* Candidates Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 font-bold">
              🔧 Για Τεχνικούς & Υποψηφίους
            </div>
            <div className="bg-white rounded-[40px] border border-slate-200 p-10 shadow-sm space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-100">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Αναζήτηση χωρίς εγγραφή</h3>
                  <p className="text-slate-600">Βρείτε δουλειές στην περιοχή και την ειδικότητά σας χωρίς να φτιάξετε προφίλ ή να ανεβάσετε βιογραφικό.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-100">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Άμεση Επικοινωνία</h3>
                  <p className="text-slate-600">Δείτε τα στοιχεία επικοινωνίας του εργοδότη (τηλέφωνο ή email) και επικοινωνήστε απευθείας μαζί του.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-100">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Ενημερώσεις Email</h3>
                  <p className="text-slate-600">Γραφτείτε στις ειδοποιήσεις για να λαμβάνετε email μόλις δημοσιευτεί μια νέα αγγελία στην ειδικότητά σας.</p>
                </div>
              </div>

              <Link href="/" className="block w-full py-4 text-center rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition">Δείτε τις Αγγελίες</Link>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-slate-900 rounded-[48px] p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Έχετε απορίες;</h2>
          <p className="opacity-80 mb-8 max-w-xl mx-auto">Δείτε τις συχνές ερωτήσεις ή επικοινωνήστε μαζί μας για οποιαδήποτε βοήθεια χρειαστείτε.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/faq" className="inline-block bg-white text-slate-900 px-10 py-4 rounded-2xl font-black hover:bg-slate-100 transition">Συχνές Ερωτήσεις (FAQ)</Link>
            <a href="mailto:info.texnikesdouleies@gmail.com" className="inline-block border border-white/20 px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition">Επικοινωνία</a>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        © 2026 TexnikesDouleies.gr · Όλα τα δικαιώματα προστατεύονται.
      </footer>
    </div>
  );
}
