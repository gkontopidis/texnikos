"use client";

import { useState } from "react";
import Link from "next/link";

export default function WorkerRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/workers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        alert(data.message || "Κάτι πήγε στραβά.");
      }
    } catch (err) {
      alert("Σφάλμα σύνδεσης.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[32px] p-12 text-center shadow-sm border border-slate-200">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Ευχαριστούμε!</h1>
          <p className="text-slate-600 mb-8">
            Το προφίλ σας καταχωρήθηκε και βρίσκεται υπό έλεγχο. Θα εμφανιστεί στη λίστα εντός 72 ωρών.
          </p>
          <Link href="/" className="block w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition">
            Επιστροφή στην Αρχική
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Καταχώρηση Τεχνικού</h1>
          <p className="text-slate-600 font-medium">Φτιάξτε το επαγγελματικό σας προφίλ και βρείτε την επόμενη δουλειά σας.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Όνομα *</label>
              <input 
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Επώνυμο *</label>
              <input 
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Ειδικότητα *</label>
              <input 
                required
                placeholder="π.χ. Ηλεκτρολόγος"
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Περιοχή *</label>
              <input 
                required
                placeholder="π.χ. Περιστέρι, Αθήνα"
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Έτη Εμπειρίας</label>
            <input 
              type="number"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={formData.experienceYears}
              onChange={(e) => setFormData({...formData, experienceYears: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Λίγα λόγια για εσάς</label>
            <textarea 
              rows={4}
              placeholder="Περιγράψτε την εμπειρία σας και τι εργασίες αναλαμβάνετε..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Επικοινωνίας *</label>
              <input 
                required
                type="email"
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.contactEmail}
                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Τηλέφωνο Επικοινωνίας *</label>
              <input 
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.contactPhone}
                onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
              />
            </div>
          </div>

          {/* Honeypot */}
          <input type="text" className="hidden" tabIndex={-1} onChange={(e) => setFormData({...formData, honeypot: e.target.value})} />

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            {loading ? "Επεξεργασία..." : "Καταχώρηση Προφίλ"}
          </button>
        </form>
      </div>
    </div>
  );
}
