"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageContainer from "@/components/PageContainer";
import PostJobFlow from "@/components/job/PostJobFlow";
import PostWorkerFlow from "@/components/job/PostWorkerFlow";
import { specialtyOptions, locationOptions } from "@/lib/constants";

export default function GdprPage() {
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header setShowPostJobModal={setShowPostJobModal} setShowPostWorkerModal={setShowPostWorkerModal} />

      <PageContainer title="Πολιτική Απορρήτου (GDPR)">
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
      </PageContainer>
      
      <Footer />

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
    </div>
  );
}
