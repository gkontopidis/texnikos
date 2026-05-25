"use client";
import { useEffect, useMemo, useState } from "react";
import { filterJobs } from "@/lib/filters";
import { Job } from "@/types/job";
import JobCard from "./job/JobCard";
import JobModal from "./job/JobModal";
import PostJobFlow from "./job/PostJobFlow";
import AlertBox from "./alerts/AlertBox";
import SidebarFilters from "./search/SidebarFilters";

export const specialtyOptions = [
  "Ηλεκτρολόγος εγκαταστάσεων", "Υδραυλικός", "Ψυκτικός / κλιματισμός", "Χτίστης / μπετατζής", 
  "Σοβατζής / επιχριστής", "Τεχνίτης σιδήρου / κολλητής", "Χειριστής κλαρκ / περονοφόρου", 
  "Χειριστής γερανού / μηχανημάτων", "Κατασκευαστής ξυλουργικών / ξυλουργός", 
  "Συντηρητής οικοδομών / τεχνίτης κτιρίων", "Ελαιοχρωματιστής", "Γυψοσανιδάς / Ψευδοροφές", 
  "Αλουμινάς / Τεχνίτης Κουφωμάτων", "Τεχνίτης Πλακιδίων / Μαρμάρων", "Μονωτής / Στεγανωτής", 
  "Τεχνικός Καυστήρων / Φυσικού Αερίου", "Τεχνικός Ανελκυστήρων", "Τεχνικός Ασφαλείας / Συναγερμών", 
  "Τεχνικός Λευκών Συσκευών", "Μηχανικός Αυτοκινήτων / Οχημάτων", "Κηπουρός / Σχεδιαστής Τοπίου",
];

export const locationOptions = [
  "Ολόκληρη η Ελλάδα", "Αθήνα", "Θεσσαλονίκη", "Πάτρα", "Ηράκλειο", "Λάρισα", 
  "Βόλος", "Ιωάννινα", "Πειραιάς", "Ρόδος", "Χανιά",
];

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  
  const [filters, setFilters] = useState({
    keyword: "", location: "", info: "", 
    hasSalary: false, urgentOnly: false, fullTimeOnly: false, partTimeOnly: false
  });

  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info"; visible: boolean }[]>([]);

  const fetchJobs = () => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");
    if (saved) try { setSavedJobs(JSON.parse(saved)); } catch (e) { console.error(e); }
    fetchJobs();
  }, []);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type, visible: true }]);
    setTimeout(() => setToasts((current) => current.map((t) => t.id === id ? { ...t, visible: false } : t)), 3000);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3500);
  };

  const activeJobCount = jobs.filter(j => j.status === 'active').length;
  const closedJobCount = jobs.filter(j => j.status === 'closed').length;

  const filteredJobs = useMemo(() => {
    return filterJobs(jobs, filters);
  }, [jobs, filters]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={`max-w-sm rounded-3xl border px-4 py-3 shadow-lg text-sm font-medium text-white transition-all duration-300 ${toast.type === "success" ? "bg-emerald-500" : toast.type === "error" ? "bg-rose-500" : "bg-slate-700"} ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
            {toast.message}
          </div>
        ))}
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">TexnikesDouleies.gr</h1>
          <button onClick={() => setShowPostJobModal(true)} className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">Δημοσίευση Αγγελίας</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Βρες την επόμενη τεχνική δουλειά σου</h2>
          <p className="text-lg text-slate-600">Η νούμερο 1 πλατφόρμα για τεχνίτες στην Ελλάδα. Εξειδίκευση, αξιοπιστία, άμεση επικοινωνία.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
             <AlertBox specialtyOptions={specialtyOptions} locationOptions={locationOptions} showToast={showToast} />
          </div>
          <div className="md:col-span-1 grid grid-rows-2 gap-6">
            <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center">
                <div className="text-5xl font-black text-indigo-600">{activeJobCount}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Ενεργές Αγγελίες</div>
            </div>
            <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center">
                <div className="text-5xl font-black text-emerald-600">{closedJobCount}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Βρήκαν Δουλειά</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px,1fr] gap-8">
          <aside className="space-y-6">
            <SidebarFilters filters={filters} setFilters={setFilters} />
            <AlertBox specialtyOptions={specialtyOptions} locationOptions={locationOptions} showToast={showToast} />
          </aside>
          
          <div className="space-y-4">
            <div className="bg-white rounded-[32px] border border-slate-200 p-6 flex justify-between items-center shadow-sm">
                <span className="font-bold text-slate-700">{filteredJobs.length} αποτελέσματα</span>
            </div>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isSaved={savedJobs.includes(job._id)}
                  onSave={(id) => {
                    if (savedJobs.includes(id)) {
                      setSavedJobs((current) => current.filter((jobId) => jobId !== id));
                    } else {
                      setSavedJobs((current) => [...current, id]);
                    }
                  }}
                  onViewDetails={setSelectedJob}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 shadow-sm">
                <div className="text-6xl mb-4">🔍</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Δεν βρέθηκαν αγγελίες</h4>
                <button onClick={() => setFilters({ keyword: "", location: "", info: "", hasSalary: false, urgentOnly: false, fullTimeOnly: false, partTimeOnly: false })} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold">Καθαρισμός φίλτρων</button>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} showToast={showToast} />}
      {showPostJobModal && <PostJobFlow onClose={() => setShowPostJobModal(false)} onJobCreated={fetchJobs} showToast={showToast} specialtyOptions={specialtyOptions} locationOptions={locationOptions} />}
      <footer className="border-t bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>© 2026 TexnikesDouleies.gr</div>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-indigo-600 transition">Όροι Χρήσης</a>
            <a href="/gdpr" className="hover:text-indigo-600 transition">GDPR</a>
            <a href="mailto:support@texnikesdouleies.gr" className="hover:text-indigo-600 transition">Επικοινωνία</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
