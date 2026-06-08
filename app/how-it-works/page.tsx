"use client";
import { useState } from "react";
import Link from "next/link";
import PostJobFlow from "@/components/job/PostJobFlow";
import PostWorkerFlow from "@/components/job/PostWorkerFlow";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { specialtyOptions, locationOptions } from "@/lib/constants";

export default function HowItWorks() {
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header setShowPostJobModal={setShowPostJobModal} setShowPostWorkerModal={setShowPostWorkerModal} />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight mb-6 text-slate-900">Πώς λειτουργεί</h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            Η πλατφόρμα μας έχει σχεδιαστεί για να είναι απλή, γρήγορη και αποτελεσματική, 
            <strong> χωρίς την ανάγκη δημιουργίας κωδικών</strong>.
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
                  <p className="text-slate-600">Συμπληρώστε τα στοιχεία της θέσης εργασίας. Δεν απαιτείται εγγραφή ή κωδικοί.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-200">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Εύρεση Τεχνικών</h3>
                  <p className="text-slate-600">Περιηγηθείτε στη λίστα των τεχνικών και επικοινωνήστε απευθείας με τους επαγγελματίες που σας ταιριάζουν.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-200">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Έλεγχος & Διαχείριση</h3>
                  <p className="text-slate-600">Κάθε αγγελία ελέγχεται από εμάς. Διαχειρίζεστε τα πάντα μέσω ενός μοναδικού συνδέσμου στο email σας.</p>
                </div>
              </div>

              <button onClick={() => setShowPostJobModal(true)} className="block w-full py-4 text-center rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition">Δημοσίευση Αγγελίας</button>
            </div>
          </div>

          {/* Technicians Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 font-bold">
              🔧 Για Τεχνικούς & Επαγγελματίες
            </div>
            <div className="bg-white rounded-[40px] border border-slate-200 p-10 shadow-sm space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-100">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Δημιουργία Προφίλ</h3>
                  <p className="text-slate-600">Δημιουργήστε το επαγγελματικό σας προφίλ δωρεάν για να σας βρίσκουν οι εργοδότες απευθείας.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-100">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Αναζήτηση & Ειδοποιήσεις</h3>
                  <p className="text-slate-600">Βρείτε αγγελίες στην περιοχή σας ή γραφτείτε στις ειδοποιήσεις για να λαμβάνετε νέες δουλειές στο email σας.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-100">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Πλήρης Έλεγχος</h3>
                  <p className="text-slate-600">Ενημερώστε τη διαθεσιμότητά σας ή επεξεργαστείτε το προφίλ σας οποιαδήποτε στιγμή μέσω του προσωπικού σας link.</p>
                </div>
              </div>

              <Link href="/workers" className="block w-full py-4 text-center rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition">Δείτε τη Λίστα Τεχνικών</Link>
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

      <Footer />
    </div>
  );
}
