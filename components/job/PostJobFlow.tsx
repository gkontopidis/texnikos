"use client";
import { useState, type FormEvent } from "react";

interface PostJobFlowProps {
  onClose: () => void;
  onJobCreated: () => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  specialtyOptions: string[];
  locationOptions: string[];
}

type Step = "form" | "plan" | "payment" | "success";

export default function PostJobFlow({ onClose, onJobCreated, showToast, specialtyOptions, locationOptions }: PostJobFlowProps) {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    fullTime: true,
  });
  const [selectedPlan, setSelectedPlan] = useState<"free" | "featured" | "urgent">("free");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.location || !formData.contactEmail) {
      showToast("Παρακαλώ συμπλήρωσε όλα τα υποχρεωτικά πεδία.", "error");
      return;
    }
    setStep("plan");
  };

  const handlePlanSelect = (plan: "free" | "featured" | "urgent") => {
    setSelectedPlan(plan);
    if (plan === "free") {
      submitJob(plan);
    } else {
      setStep("payment");
    }
  };

  const submitJob = async (plan: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          plan,
          urgent: plan === "urgent",
          featured: plan === "featured" || plan === "urgent",
          isPaid: plan !== "free",
          status: "pending"
        }),
      });

      if (response.ok) {
        setStep("success");
        onJobCreated();
      } else {
        showToast("Υπήρξε κάποιο πρόβλημα κατά τη δημοσίευση.", "error");
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
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              {step === "form" && "1. Στοιχεία Αγγελίας"}
              {step === "plan" && "2. Επιλογή Πακέτου"}
              {step === "payment" && "3. Ολοκλήρωση Πληρωμής"}
              {step === "success" && "🎉 Η αγγελία υποβλήθηκε!"}
            </h3>
            <p className="text-sm text-slate-500">
              {step !== "success" && `Βήμα ${step === "form" ? "1" : step === "plan" ? "2" : "3"} από 3`}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 transition">✕</button>
        </div>

        {/* Step 1: Form */}
        {step === "form" && (
          <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Ειδικότητα *</label>
                <select
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
                >
                  <option value="">Επίλεξε ειδικότητα</option>
                  {specialtyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Επιχείρηση *</label>
                <input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="π.χ. Τεχνική ΑΕ"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Περιοχή *</label>
                <input
                  list="location-options"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Επίλεξε ή πληκτρολόγησε περιοχή"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
                />
                <datalist id="location-options">
                  {locationOptions.filter(l => l !== "Ολόκληρη η Ελλάδα").map(opt => <option key={opt} value={opt} />)}
                </datalist>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Μισθός</label>
                <input
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="π.χ. 1200€ - 1500€"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Περιγραφή</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Περιγράψτε την θέση..."
                className="w-full min-h-[100px] rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none resize-none focus:ring-2 focus:ring-slate-100 transition"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Επικοινωνίας *</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="hr@company.gr"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Τηλέφωνο</label>
                <input
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="2101234567"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
                />
              </div>
            </div>

            <button type="submit" className="w-full rounded-2xl bg-slate-900 py-4 font-bold text-white hover:bg-slate-800 transition">
              Συνέχεια στην Επιλογή Πακέτου
            </button>
          </form>
        )}

        {/* Step 2: Plans */}
        {step === "plan" && (
          <div className="p-6 space-y-4">
            <button onClick={() => handlePlanSelect("free")} className="w-full flex items-center justify-between rounded-[24px] border-2 border-slate-100 p-5 text-left transition hover:border-slate-300 hover:bg-slate-50">
              <div>
                <div className="font-bold text-slate-900">Δωρεάν Αγγελία</div>
                <div className="text-sm text-slate-500">Δημοσίευση μετά από 72 ώρες moderation.</div>
              </div>
              <div className="text-xl font-bold">€0</div>
            </button>

            <button onClick={() => handlePlanSelect("featured")} className="w-full flex items-center justify-between rounded-[24px] border-2 border-emerald-100 bg-emerald-50/30 p-5 text-left transition hover:border-emerald-200 hover:bg-emerald-50/50">
              <div>
                <div className="font-bold text-emerald-900">Προβεβλημένη Αγγελία ⭐</div>
                <div className="text-sm text-emerald-700/70">Άμεση έγκριση & πρώτη θέση για 30 ημέρες.</div>
              </div>
              <div className="text-xl font-bold">€49</div>
            </button>

            <button onClick={() => handlePlanSelect("urgent")} className="w-full flex items-center justify-between rounded-[24px] border-2 border-amber-100 bg-amber-50/30 p-5 text-left transition hover:border-amber-200 hover:bg-amber-50/50">
              <div>
                <div className="font-bold text-amber-900">Επείγουσα Αγγελία ⚡</div>
                <div className="text-sm text-amber-700/70">Προτεραιότητα, Email Alerts & Homepage placement.</div>
              </div>
              <div className="text-xl font-bold text-amber-900">€99</div>
            </button>

            <button onClick={() => setStep("form")} className="w-full pt-2 text-sm text-slate-500 hover:underline text-center">
              ← Πίσω στα στοιχεία
            </button>
          </div>
        )}

        {/* Step 3: Payment (Simplified Simulation) */}
        {step === "payment" && (
          <div className="p-6 space-y-6 text-center">
            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Σύνολο</div>
              <div className="text-4xl font-black text-slate-900">
                {selectedPlan === "featured" ? "€49" : "€99"}
              </div>
            </div>
            
            <p className="text-slate-600">Η online πληρωμή θα ολοκληρωθεί στο επόμενο βήμα.</p>
            
            <button 
              onClick={() => submitJob(selectedPlan)} 
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? "Επεξεργασία..." : "Πληρωμή & Δημοσίευση"}
            </button>
            
            <button onClick={() => setStep("plan")} className="text-sm text-slate-500 hover:underline">
              Αλλαγή πακέτου
            </button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="p-12 text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl">✅</div>
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Ευχαριστούμε!</h4>
              <p className="text-slate-600">
                {selectedPlan === "free" 
                  ? "Η αγγελία σας βρίσκεται υπό έλεγχο και θα δημοσιευτεί σε περίπου 72 ώρες."
                  : "Η αγγελία σας εγκρίθηκε αυτόματα και είναι πλέον live!"}
              </p>
            </div>
            <button onClick={() => { onClose(); }} className="w-full rounded-2xl bg-slate-900 py-4 font-bold text-white hover:bg-slate-800 transition">
              Επιστροφή στην Αρχική
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
