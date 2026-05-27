"use client";
import { useState } from "react";

interface AlertBoxProps {
  specialtyOptions: string[];
  locationOptions: string[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function AlertBox({ specialtyOptions, locationOptions, showToast }: AlertBoxProps) {
  const [selectedAlertJob, setSelectedAlertJob] = useState("");
  const [selectedAlertLocation, setSelectedAlertLocation] = useState("");
  const [email, setEmail] = useState("");

  const handleAlertSignup = async () => {
    if (!selectedAlertJob || !selectedAlertLocation || !email) {
      showToast("Παρακαλώ συμπληρώστε όλα τα πεδία.", "error");
      return;
    }

    try {
      const response = await fetch("/api/alerts/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          specialty: selectedAlertJob, 
          location: selectedAlertLocation 
        }),
      });

      if (response.ok) {
        showToast("Η εγγραφή σας ολοκληρώθηκε επιτυχώς!", "success");
        setEmail("");
        setSelectedAlertJob("");
        setSelectedAlertLocation("");
      } else {
        showToast("Κάτι πήγε στραβά. Προσπαθήστε ξανά.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Σφάλμα σύνδεσης. Προσπαθήστε ξανά.", "error");
    }
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="text-xl font-semibold mb-3 text-slate-900">🔔 Alerts Εργασίας</div>
      <p className="text-slate-600 mb-4">
        Επίλεξε την ειδικότητα που θέλεις και λάβε ενημέρωση με email με κάθε νέα αγγελία για την αντίστοιχη ειδικότητα
      </p>

      <div className="space-y-3">
        <select
          value={selectedAlertJob}
          onChange={(e) => setSelectedAlertJob(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        >
          <option value="">Επίλεξε ειδικότητα για alerts</option>
          {specialtyOptions.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>

        <select
          value={selectedAlertLocation}
          onChange={(e) => setSelectedAlertLocation(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        >
          <option value="">Επίλεξε περιοχή για alerts</option>
          {locationOptions.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

          <button
            type="button"
            onClick={handleAlertSignup}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Εγγραφή
          </button>
        </div>
      </div>
    </div>
  );
}
