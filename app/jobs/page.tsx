"use client";
import { useEffect, useMemo, useState, Suspense, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { filterJobs } from "@/lib/filters";
import { Job } from "@/types/job";
import JobCard from "@/components/job/JobCard";
import JobModal from "@/components/job/JobModal";
import PostJobFlow from "@/components/job/PostJobFlow";
import PostWorkerFlow from "@/components/job/PostWorkerFlow";
import AlertBox from "@/components/alerts/AlertBox";
import JobFilters from "@/components/search/JobFilters";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { specialtyOptions, locationOptions } from "@/lib/constants";

function JobsContent() {
  const searchParams = useSearchParams();
  const showPostJob = searchParams ? searchParams.get("showPostJob") === "true" : false;
  const plan = searchParams ? searchParams.get("plan") as "free" | "featured" | "urgent" | null : null;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPostJobModal, setShowPostJobModal] = useState(showPostJob);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);
  
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    keyword: "", location: "", info: "", specialty: "",
    hasSalary: false, urgentOnly: false, fullTimeOnly: false, partTimeOnly: false, fixedDurationOnly: false
  });

  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info"; visible: boolean }[]>([]);

  const fetchJobs = useCallback(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs) {
          setJobs(data.jobs);
        } else {
          setJobs(Array.isArray(data) ? data : []);
        }
      })
      .catch(err => {
        console.error("Jobs Fetch Error:", err);
      });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSavedJobs(parsed);
      } catch (e) { console.error(e); }
    }
    fetchJobs();
  }, [fetchJobs]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type, visible: true }]);
    setTimeout(() => setToasts((current) => current.map((t) => t.id === id ? { ...t, visible: false } : t)), 3000);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3500);
  };

  const filteredJobs = useMemo(() => {
    let result = filterJobs(jobs, filters);
    if (showSavedOnly) {
      result = result.filter(job => savedJobs.includes(job._id));
    }
    return result;
  }, [jobs, filters, showSavedOnly, savedJobs]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={`max-w-sm rounded-3xl border px-4 py-3 shadow-lg text-sm font-medium text-white transition-all duration-300 ${toast.type === "success" ? "bg-emerald-500" : toast.type === "error" ? "bg-rose-500" : "bg-slate-700"} ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
            {toast.message}
          </div>
        ))}
      </div>

      <Header setShowPostJobModal={setShowPostJobModal} setShowPostWorkerModal={setShowPostWorkerModal} />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Βρείτε την επόμενη εργασία σας</h1>
          <p className="text-lg text-slate-600">Ανακαλύψτε εκατοντάδες τεχνικές αγγελίες και επιλέξτε αυτή που σας ταιριάζει.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AlertBox specialtyOptions={specialtyOptions} locationOptions={locationOptions} showToast={showToast} />
          <div className="mt-8">
            <JobFilters filters={filters} setFilters={setFilters} showSavedOnly={showSavedOnly} setShowSavedOnly={setShowSavedOnly} />
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Αποτελέσματα</h3>
                <p className="font-medium text-slate-600">{filteredJobs.length} αγγελίες</p>
              </div>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} isSaved={savedJobs.includes(job._id)} onSave={(id) => {
                    const updated = savedJobs.includes(id) 
                      ? savedJobs.filter((jobId) => jobId !== id)
                      : [...savedJobs, id];
                    setSavedJobs(updated);
                    localStorage.setItem("savedJobs", JSON.stringify(updated));
                  }} onViewDetails={setSelectedJob} />
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 shadow-sm">
                  <div className="text-6xl mb-4">🔍</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Δεν βρέθηκαν αγγελίες</h4>
                  <button onClick={() => setFilters({ keyword: "", location: "", info: "", specialty: "", hasSalary: false, urgentOnly: false, fullTimeOnly: false, partTimeOnly: false, fixedDurationOnly: false })} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold">Καθαρισμός φίλτρων</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} showToast={showToast} />}
      {showPostJobModal && <PostJobFlow onClose={() => setShowPostJobModal(false)} onJobCreated={fetchJobs} showToast={showToast} specialtyOptions={specialtyOptions} locationOptions={locationOptions} initialPlan={plan} />}
      {showPostWorkerModal && <PostWorkerFlow onClose={() => setShowPostWorkerModal(false)} onWorkerCreated={() => showToast("Το προφίλ σας καταχωρήθηκε!")} showToast={showToast} specialtyOptions={specialtyOptions} locationOptions={locationOptions} />}
      
      <Footer />
    </div>
  );
}

export default function JobsPage() {
  return <Suspense><JobsContent /></Suspense>;
}
