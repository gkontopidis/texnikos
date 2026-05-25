"use client";
import { useState, type FormEvent } from "react";

interface PostJobModalProps {
  onClose: () => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  specialtyOptions: string[];
  locationOptions: string[];
}

export default function PostJobModal({ onClose, showToast, specialtyOptions, locationOptions }: PostJobModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    urgent: false,
    fullTime: true,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.company || !formData.location || !formData.contactEmail) {
      showToast("Παρακαλώ συμπλήρωσε όλα τα υποχρεωτικά πεδία (Τίτλος, Εταιρεία, Περιοχή, Email).", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast("Η αγγελία σας δημοσιεύτηκε με επιτυχία!", "success");
        onClose();
        // Optionally refresh page or jobs list
        window.location.reload();
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
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <h3 className="text-2xl font-bold text-slate-900">Δημοσίευση Νέας Αγγελίας</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 transition">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Τίτλος Θέσης *</label>
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
              <label className="text-sm font-semibold text-slate-700">Επωνυμία Επιχείρησης *</label>
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
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
              >
                <option value="">Επίλεξε περιοχή</option>
                {locationOptions.filter(l => l !== "Ολόκληρη η Ελλάδα").map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Μισθός (προαιρετικό)</label>
              <input
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="π.χ. 1200€ - 1500€"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Περιγραφή Θέσης</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Περιγράψτε την θέση εργασίας, τα καθήκοντα και τις απαιτήσεις..."
              className="w-full min-h-[120px] rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none resize-none focus:ring-2 focus:ring-slate-100 transition"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Επικοινωνίας *</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="π.χ. hr@company.gr"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Τηλέφωνο Επικοινωνίας</label>
              <input
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="π.χ. 2101234567"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.urgent}
                onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-100"
              />
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Άμεση Πρόσληψη</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.fullTime}
                onChange={(e) => setFormData({ ...formData, fullTime: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-100"
              />
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Πλήρης Απασχόληση</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Ακύρωση
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
            >
              {loading ? "Γίνεται δημοσίευση..." : "Δημοσίευση Αγγελίας"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
