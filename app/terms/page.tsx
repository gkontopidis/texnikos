"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostJobFlow from "@/components/job/PostJobFlow";
import PostWorkerFlow from "@/components/job/PostWorkerFlow";
import { specialtyOptions, locationOptions } from "@/lib/constants";

export default function TermsPage() {
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header setShowPostJobModal={setShowPostJobModal} setShowPostWorkerModal={setShowPostWorkerModal} />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
          <h1 className="text-3xl font-black mb-6">Όροι Χρήσης</h1>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900">1. Τι είναι το TexnikesDouleies.gr</h2>
              <p>Η πλατφόρμα λειτουργεί ως online marketplace δημοσίευσης αγγελιών εργασίας. Στόχος μας είναι η διασύνδεση εργοδοτών και επαγγελματιών. Δεν είμαστε εταιρεία στελέχωσης (recruiter agency) ούτε συμβαλλόμενο μέρος στις συμφωνίες σας.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">2. Αποποίηση Ευθύνης</h2>
              <p>Το TexnikesDouleies.gr δεν εγγυάται:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Την πρόσληψη ή την επιτυχία εύρεσης εργασίας.</li>
                <li>Την ποιότητα ή την αξιοπιστία των εργοδοτών ή των εργαζομένων.</li>
                <li>Την εγκυρότητα των πληροφοριών που δημοσιεύονται από τρίτους.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">3. Ευθύνη Χρηστών</h2>
              <p>Κάθε χρήστης που δημοσιεύει αγγελία είναι αποκλειστικά υπεύθυνος για:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Την ακρίβεια των πληροφοριών.</li>
                <li>Τη νομιμότητα του περιεχομένου της αγγελίας.</li>
                <li>Τη συμμόρφωση με την ισχύουσα εργατική νομοθεσία.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">4. Πολιτική Moderation & Απαγορευμένο Περιεχόμενο</h2>
              <p>Διατηρούμε το δικαίωμα αφαίρεσης οποιασδήποτε αγγελίας χωρίς προειδοποίηση, εάν:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Κρίνεται παραπλανητική, abusive ή scam.</li>
                <li>Προωθεί παράνομη ή "μαύρη" εργασία.</li>
                <li>Περιέχει διακριτικές διατυπώσεις.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">5. Περιορισμός Ευθύνης (Limitation of Liability)</h2>
              <p>Το TexnikesDouleies.gr δεν φέρει καμία ευθύνη για διαφορές, οικονομικές συναλλαγές, συμφωνίες ή εργασιακές σχέσεις που προκύπτουν μεταξύ των χρηστών. Κάθε συμφωνία αποτελεί αποκλειστική ευθύνη των μερών.</p>
            </section>
          </div>
        </div>
      </main>

      {showPostJobModal && (
        <PostJobFlow 
          onClose={() => setShowPostJobModal(false)} 
          onJobCreated={() => {}} 
          showToast={() => {}} 
          specialtyOptions={specialtyOptions} 
          locationOptions={locationOptions} 
        />
      )}
      {showPostWorkerModal && (
        <PostWorkerFlow 
          onClose={() => setShowPostWorkerModal(false)} 
          onWorkerCreated={() => {}} 
          showToast={() => {}} 
          specialtyOptions={specialtyOptions} 
          locationOptions={locationOptions} 
        />
      )}
      <Footer />
    </div>
  );
}
