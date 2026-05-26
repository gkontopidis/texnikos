"use client";
import { useState, type FormEvent } from "react";

interface PostJobFlowProps {
  onClose: () => void;
  onJobCreated: () => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  specialtyOptions: string[];
  locationOptions: string[];
  initialPlan?: "free" | "featured" | "urgent" | null;
}

type Step = "plan" | "form" | "payment" | "success";

export default function PostJobFlow({ onClose, onJobCreated, showToast, specialtyOptions, locationOptions, initialPlan }: PostJobFlowProps) {
  const [step, setStep] = useState<Step>(initialPlan ? "form" : "plan");
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "featured" | "urgent">(initialPlan || "free");
  const [formData, setFormData] = useState({
    title: "", company: "", location: "", salary: "",
    duration: { type: "permanent", amount: 0, unit: "months" }, 
    description: "", contactEmail: "", contactPhone: "",
    fullTime: true, urgent: false, honeypot: ""
  });

  const handlePlanSelect = (plan: "free" | "featured" | "urgent") => {
    setSelectedPlan(plan);
    setStep("form");
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.location || !formData.contactEmail) {
      showToast("Παρακαλώ συμπλήρωσε όλα τα υποχρεωτικά πεδία (Ειδικότητα, Επιχείρηση, Περιοχή, Email).", "error");
      return;
    }
    
    if (selectedPlan === "free") {
      submitJob();
    } else {
      setStep("payment");
    }
  };

  const submitJob = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          plan: selectedPlan,
          urgent: selectedPlan === "urgent" || formData.urgent,
          featured: selectedPlan === "featured" || selectedPlan === "urgent",
          isPaid: selectedPlan !== "free",
        }),
      });

      if (response.ok) {
        setStep("success");
        onJobCreated();
      } else {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        console.error("Job Creation Failed:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        showToast(errorData.message || "Υπήρξε κάποιο πρόβλημα κατά τη δημοσίευση.", "error");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
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
              {step === "plan" && "1. Επιλογή Πακέτου"}
              {step === "form" && "2. Στοιχεία Αγγελίας"}
              {step === "payment" && "3. Πληρωμή"}
              {step === "success" && "🎉 Έτοιμο!"}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 transition">✕</button>
        </div>

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
                <div className="text-sm text-emerald-700/70">Άμεση έγκριση & εμφάνιση πάνω από τις δωρεάν.</div>
              </div>
              <div className="text-xl font-bold">€49</div>
            </button>
            <button onClick={() => handlePlanSelect("urgent")} className="w-full flex items-center justify-between rounded-[24px] border-2 border-amber-100 bg-amber-50/30 p-5 text-left transition hover:border-amber-200 hover:bg-amber-50/50">
              <div>
                <div className="font-bold text-amber-900">Επείγουσα Αγγελία ⚡</div>
                <div className="text-sm text-amber-700/70">Εμφάνιση πάνω από τις προβεβλημένες με σήμανση.</div>
              </div>
              <div className="text-xl font-bold text-amber-900">€99</div>
            </button>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Ειδικότητα *</label>
                <select value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition">
                  <option value="">Επίλεξε ειδικότητα</option>
                  {specialtyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Επιχείρηση *</label>
                <input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="π.χ. Τεχνική ΑΕ" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Περιοχή *</label>
                <input list="location-options" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Επίλεξε ή πληκτρολόγησε περιοχή" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
                <datalist id="location-options">{locationOptions.filter(l => l !== "Ολόκληρη η Ελλάδα").map(opt => <option key={opt} value={opt} />)}</datalist>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Μισθός</label>
                <input value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} placeholder="π.χ. 1200€ - 1500€" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Τύπος Απασχόλησης *</label>
                <select value={formData.fullTime ? "full" : "part"} onChange={(e) => setFormData({ ...formData, fullTime: e.target.value === "full" })} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition">
                  <option value="full">Πλήρης Απασχόληση</option>
                  <option value="part">Μερική Απασχόληση</option>
                </select>
              </div>
              <div className="flex items-center pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.urgent || false} onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-red-600 focus:ring-red-500" />
                  <span className="text-sm font-bold text-red-700">🚨 Άμεση Πρόσληψη</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">Διάρκεια Έργου *</label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setFormData({ ...formData, duration: { type: "permanent", amount: 0, unit: "months" } })} className={`flex-1 rounded-2xl border-2 px-4 py-3 font-bold transition ${formData.duration.type === "permanent" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white"}`}>Μόνιμη</button>
                <button type="button" onClick={() => setFormData({ ...formData, duration: { type: "fixed", amount: 1, unit: "months" } })} className={`flex-1 rounded-2xl border-2 px-4 py-3 font-bold transition ${formData.duration.type === "fixed" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white"}`}>Συγκεκριμένη</button>
              </div>
              {formData.duration.type === "fixed" && (
                <div className="flex gap-3 pt-2">
                  <input type="number" min="1" max="72" value={formData.duration.amount} onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, amount: parseInt(e.target.value) } })} className="w-24 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100" />
                  <select value={formData.duration.unit} onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, unit: e.target.value } })} className="flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100">
                    <option value="days">Ημέρες</option><option value="months">Μήνες</option><option value="years">Έτη</option>
                  </select>
                </div>
              )}
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

            {/* Honeypot field for anti-spam */}
            <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" onChange={(e) => setFormData({...formData, honeypot: e.target.value})} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Επικοινωνίας *</label>
                <input type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} placeholder="hr@company.gr" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Τηλέφωνο</label>
                <input value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} placeholder="2101234567" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition" />
              </div>
            </div>

            <button type="submit" className="w-full rounded-2xl bg-slate-900 py-4 font-bold text-white hover:bg-slate-800 transition">
              {selectedPlan === "free" ? "Δημοσίευση" : "Συνέχεια στην πληρωμή"}
            </button>
            <p className="text-center text-xs text-slate-400">
              Σημείωση: Επιτρέπεται μία δημοσίευση ανά 15 λεπτά.
            </p>
          </form>
        )}

        {step === "payment" && (
          <div className="p-6 space-y-6 text-center">
            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Σύνολο</div>
              <div className="text-4xl font-black text-slate-900">{selectedPlan === "featured" ? "€49" : "€99"}</div>
            </div>
            <p className="text-slate-600">Η online πληρωμή θα ολοκληρωθεί στο επόμενο βήμα.</p>
            <button onClick={submitJob} disabled={loading} className="w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white hover:bg-emerald-700 transition disabled:opacity-50">
              {loading ? "Επεξεργασία..." : "Πληρωμή & Δημοσίευση"}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="p-12 text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl">✅</div>
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Ευχαριστούμε!</h4>
              <p className="text-slate-600">
                {selectedPlan === "free" ? "Η αγγελία σας βρίσκεται υπό έλεγχο και θα δημοσιευτεί σε περίπου 72 ώρες." : "Η αγγελία σας εγκρίθηκε αυτόματα και είναι πλέον live!"}
              </p>
            </div>
            <button onClick={onClose} className="w-full rounded-2xl bg-slate-900 py-4 font-bold text-white hover:bg-slate-800 transition">Επιστροφή</button>
          </div>
        )}
      </div>
    </div>
  );
}
