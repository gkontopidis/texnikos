"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";

interface PostWorkerFlowProps {
  onClose: () => void;
  onWorkerCreated: () => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  specialtyOptions: string[];
  locationOptions: string[];
}

type Step = "intro" | "form" | "success";

export default function PostWorkerFlow({ onClose, onWorkerCreated, showToast, specialtyOptions, locationOptions }: PostWorkerFlowProps) {
  const [step, setStep] = useState<Step>("intro");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    location: "",
    experienceYears: "",
    bio: "",
    contactEmail: "",
    contactPhone: "",
    honeypot: ""
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.specialty || !formData.location || !formData.contactEmail || !formData.contactPhone) {
      showToast("Παρακαλώ συμπλήρωσε όλα τα υποχρεωτικά πεδία.", "error");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch("/api/workers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep("success");
        onWorkerCreated();
      } else {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        showToast(errorData.message || "Υπήρξε κάποιο πρόβλημα κατά την καταχώρηση.", "error");
      }
    } catch (error) {
      showToast("Σφάλμα σύνδεσης. Προσπάθησε ξανά.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-[32px] border border-slate-200 bg-white shadow-2xl overflow-hidden">
        
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              {step === "intro" && "Γίνετε ορατοί σε εργοδότες"}
              {step === "form" && "Στοιχεία Τεχνικού"}
              {step === "success" && "🎉 Έτοιμο!"}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 transition">✕</button>
        </div>

        {step === "intro" && (
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl text-xl">🚀</div>
                <div>
                  <h4 className="font-bold text-slate-900">Αποκτήστε πρόσβαση σε νέες δουλειές</h4>
                  <p className="text-sm text-slate-500">Οι εργοδότες θα μπορούν να βρουν το προφίλ σας και να επικοινωνήσουν μαζί σας.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl text-xl">🔒</div>
                <div>
                  <h4 className="font-bold text-slate-900">Ασφάλεια & Προστασία</h4>
                  <p className="text-sm text-slate-500">Το επώνυμο και τα στοιχεία επικοινωνίας σας είναι κρυφά από scammers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl text-xl">🛠️</div>
                <div>
                  <h4 className="font-bold text-slate-900">Πλήρης Έλεγχος</h4>
                  <p className="text-sm text-slate-500">Διαχειριστείτε το προφίλ σας εύκολα μέσω ενός προσωπικού συνδέσμου.</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setStep("form")} 
              className="w-full rounded-2xl bg-slate-900 py-4 font-bold text-white hover:bg-slate-800 transition shadow-lg shadow-slate-100"
            >
              Ξεκινήστε την Καταχώρηση
            </button>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Όνομα *</label>
                <input required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Επώνυμο *</label>
                <input required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Ειδικότητα *</label>
                <select required value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition">
                  <option value="">Επίλεξε ειδικότητα</option>
                  {specialtyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Περιοχή *</label>
                <input required list="location-options" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="π.χ. Αθήνα" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
                <datalist id="location-options">{locationOptions.filter(l => l !== "Ολόκληρη η Ελλάδα").map(opt => <option key={opt} value={opt} />)}</datalist>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Έτη Εμπειρίας</label>
              <input type="number" value={formData.experienceYears} onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Λίγα λόγια για εσάς</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Περιγράψτε την εμπειρία σας..."
                className="w-full min-h-[100px] rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none resize-none focus:ring-2 focus:ring-slate-100 transition"
              />
            </div>

            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" onChange={(e) => setFormData({...formData, honeypot: e.target.value})} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email *</label>
                <input required type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Τηλέφωνο *</label>
                <input required value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <input 
                required 
                type="checkbox" 
                id="gdpr-consent" 
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
              />
              <label htmlFor="gdpr-consent" className="text-xs text-slate-600 leading-relaxed">
                Συμφωνώ με τους <Link href="/terms" className="text-indigo-600 underline" target="_blank">Όρους Χρήσης</Link> και την <Link href="/gdpr" className="text-indigo-600 underline" target="_blank">Πολιτική Απορρήτου</Link>. Κατανοώ ότι το όνομά μου και η ειδικότητά μου θα είναι δημόσια ορατά, ενώ τα στοιχεία επικοινωνίας μου θα είναι προσβάσιμα μόνο σε εγγεγραμμένους εργοδότες.
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white hover:bg-indigo-700 transition disabled:opacity-50">
              {loading ? "Επεξεργασία..." : "Καταχώρηση Προφίλ"}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="p-12 text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl">✅</div>
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Συγχαρητήρια!</h4>
              <p className="text-slate-600">
                Το προφίλ σας καταχωρήθηκε. Θα λάβετε ένα email με τον προσωπικό σας σύνδεσμο διαχείρισης.
              </p>
            </div>
            <button onClick={onClose} className="w-full rounded-2xl bg-slate-900 py-4 font-bold text-white hover:bg-slate-800 transition">Επιστροφή</button>
          </div>
        )}
      </div>
    </div>
  );
}
