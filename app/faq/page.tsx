"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageContainer from "@/components/PageContainer";
import PostJobFlow from "@/components/job/PostJobFlow";
import PostWorkerFlow from "@/components/job/PostWorkerFlow";
import { specialtyOptions, locationOptions } from "@/lib/constants";

const faqs = [
  {
    category: "Τι είναι το TexnikesDouleies.gr;",
    questions: [
      { q: "Τι είναι το TexnikesDouleies.gr;", a: "Το TexnikesDouleies.gr είναι μια ελληνική πλατφόρμα αγγελιών εργασίας και συνεργασίας για τεχνικά επαγγέλματα. Στόχος μας είναι να φέρνουμε πιο κοντά τεχνικούς, επαγγελματίες, εργοδότες, συνεργεία και επιχειρήσεις." }
    ]
  },
  {
    category: "Για Εργοδότες / Επιχειρήσεις",
    questions: [
      { q: "Πώς μπορώ να δημοσιεύσω μια αγγελία;", a: "Η διαδικασία είναι απλή: Συμπληρώστε τη φόρμα, η ομάδα μας ελέγχει την αγγελία για διασφάλιση ποιότητας, και μόλις εγκριθεί, δημοσιεύεται. Λαμβάνετε email με ειδικό σύνδεσμο διαχείρισης για επεξεργασία ή διαγραφή." },
      { q: "Πώς βρίσκω τεχνικούς για μια δουλειά;", a: "Εκτός από τη δημοσίευση αγγελίας, μπορείτε να περιηγηθείτε στη λίστα των Τεχνικών. Μπορείτε να δείτε τα προφίλ τους και να ξεκλειδώσετε τα στοιχεία επικοινωνίας τους δωρεάν." },
      { q: "Πότε εμφανίζεται η αγγελία μου στο site;", a: "Οι αγγελίες δεν δημοσιεύονται αυτόματα. Πραγματοποιούμε βασικό έλεγχο για την αποφυγή ψευδών αγγελιών και τη διατήρηση της ποιότητας της πλατφόρμας." }
    ]
  },
  {
    category: "Για Τεχνικούς (Καταχώρηση Προφίλ)",
    questions: [
      { q: "Πώς μπορώ να εμφανίζομαι στη λίστα των τεχνικών;", a: "Μπορείτε να δημιουργήσετε το προφίλ σας πατώντας 'Καταχώρηση Τεχνικού'. Συμπληρώστε την ειδικότητά σας, την εμπειρία σας και τα στοιχεία επικοινωνίας σας. Μετά από έγκριση, το προφίλ σας θα είναι ορατό στους εργοδότες." },
      { q: "Ποιοι βλέπουν τα στοιχεία επικοινωνίας μου;", a: "Το τηλέφωνο και το email σας είναι προστατευμένα. Μόνο ενδιαφερόμενοι εργοδότες που συμπληρώνουν τα στοιχεία τους μπορούν να τα δουν. Αυτό αποτρέπει το spam και τις ενοχλητικές κλήσεις." },
      { q: "Πώς διαχειρίζομαι το προφίλ μου;", a: "Μετά την εγγραφή, λαμβάνετε ένα email με έναν προσωπικό σύνδεσμο. Από εκεί μπορείτε να αλλάξετε τη διαθεσιμότητά σας (π.χ. να κρύψετε το προφίλ σας αν δεν είστε διαθέσιμοι) ή να επεξεργαστείτε τα στοιχεία σας." },
      { q: "Είναι δωρεάν η καταχώρηση;", a: "Ναι, η δημιουργία και η εμφάνιση του προφίλ σας στη λίστα των τεχνικών είναι εντελώς δωρεάν." }
    ]
  },
  {
    category: "Για Τεχνικούς (Αναζήτηση Εργασίας)",
    questions: [
      { q: "Πώς μπορώ να ενημερώνομαι για νέες δουλειές;", a: "Μπορείτε να ενεργοποιήσετε ειδοποιήσεις email επιλέγοντας την ειδικότητα και την περιοχή σας. Όταν δημοσιευτεί νέα αγγελία, θα λαμβάνετε ενημέρωση αυτόματα." },
      { q: "Πρέπει να δημιουργήσω λογαριασμό;", a: "Όχι, μπορείτε να περιηγηθείτε, να βρείτε δουλειές και να λαμβάνετε ειδοποιήσεις χωρίς να απαιτείται η δημιουργία κλασικού λογαριασμού με κωδικούς." }
    ]
  },
  {
    category: "Ασφάλεια & Ποιότητα",
    questions: [
      { q: "Ελέγχονται οι αγγελίες και τα προφίλ;", a: "Ναι, πραγματοποιούμε βασικό έλεγχο σε κάθε αγγελία και κάθε προφίλ τεχνικού πριν δημοσιευτεί. Στόχος μας είναι η διατήρηση ενός υψηλού επιπέδου υπηρεσιών." }
    ]
  }
];

export default function FAQPage() {
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header setShowPostJobModal={setShowPostJobModal} setShowPostWorkerModal={setShowPostWorkerModal} />

      <PageContainer title="Συχνές Ερωτήσεις (FAQ)">
        <div className="space-y-12">
          {faqs.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">{section.category}</h2>
              <div className="space-y-6">
                {section.questions.map((item, qIdx) => (
                  <div key={qIdx}>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.q}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
