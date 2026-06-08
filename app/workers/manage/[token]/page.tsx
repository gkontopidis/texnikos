"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { specialtyOptions, locationOptions } from "@/lib/constants";

export default function WorkerManagePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();
  const [worker, setWorker] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [message, setMessage] = useState<{ text: string, type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetch(`/api/workers/manage/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setWorker(data.worker);
          setEditData(data.worker);
        } else {
          router.push("/not-found");
        }
      })
      .finally(() => setLoading(false));
  }, [token, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/workers/manage/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (data.success) {
        setWorker(data.worker);
        setIsEditing(false);
        setMessage({ text: "Το προφίλ ενημερώθηκε επιτυχώς!", type: "success" });
      } else {
        setMessage({ text: data.message || "Σφάλμα κατά την ενημέρωση", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Σφάλμα σύνδεσης", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Είσαι σίγουρος ότι θέλεις να διαγράψεις το προφίλ σου; Αυτή η ενέργεια δεν αναιρείται.")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/workers/manage/${token}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      alert("Σφάλμα κατά τη διαγραφή");
      setLoading(false);
    }
  };

  if (loading && !worker) return <div className="p-12 text-center font-bold">Φόρτωση...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-xl font-bold">TexnikesDouleies.gr</Link>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition"
            >
              {isEditing ? "Ακύρωση" : "Επεξεργασία Προφίλ"}
            </button>
            <button 
              onClick={handleDelete}
              className="px-6 py-2 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition"
            >
              Διαγραφή
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-2xl text-center font-bold ${
            message.type === "success" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Όνομα</label>
                  <input 
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50"
                    value={editData.firstName}
                    onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Επώνυμο</label>
                  <input 
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50"
                    value={editData.lastName}
                    onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Ειδικότητα</label>
                  <select 
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 font-bold"
                    value={editData.specialty}
                    onChange={(e) => setEditData({...editData, specialty: e.target.value})}
                  >
                    {specialtyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Περιοχή</label>
                  <input 
                    list="location-options-edit"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 font-bold"
                    value={editData.location}
                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                  />
                  <datalist id="location-options-edit">
                    {locationOptions.filter(l => l !== "Ολόκληρη η Ελλάδα").map(opt => <option key={opt} value={opt} />)}
                  </datalist>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Status Διαθεσιμότητας</label>
                <select 
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 font-bold"
                  value={editData.status}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                >
                  <option value="active">Ενεργός & Διαθέσιμος</option>
                  <option value="hidden">Μη Διαθέσιμος (Προσωρινή Απόκρυψη)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Βιογραφικό / Περιγραφή</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 resize-none"
                  value={editData.bio}
                  onChange={(e) => setEditData({...editData, bio: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition"
              >
                Αποθήκευση Αλλαγών
              </button>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl">👷</div>
                <div>
                  <h1 className="text-3xl font-black text-slate-900">{worker.firstName} {worker.lastName}</h1>
                  <div className="flex gap-2 mt-1">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase">{worker.specialty}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      worker.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {worker.status === 'active' ? 'Διαθέσιμος' : 'Μη Διαθέσιμος'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Στοιχεία Επικοινωνίας</h3>
                  <div className="space-y-3 font-medium">
                    <p>📞 {worker.contactPhone}</p>
                    <p>📧 {worker.contactEmail}</p>
                    <p>📍 {worker.location}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Εμπειρία</h3>
                  <p className="text-xl font-bold text-slate-900">{worker.experienceYears} Έτη</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Βιογραφικό</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {worker.bio || "Δεν έχει προστεθεί περιγραφή."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
