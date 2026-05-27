"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import JobCard from "@/components/job/JobCard";
import JobModal from "@/components/job/JobModal";
import { Job } from "@/types/job";
import { Company } from "@/types/company";

export default function CompanyProfile({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [data, setData] = useState<{ company: Company; jobs: Job[] } | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetch(`/api/companies/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!data || !data.company) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Η επιχείρηση δεν βρέθηκε</h1>
        <Link href="/" className="text-indigo-600 font-bold hover:underline">← Επιστροφή στην Αρχική</Link>
      </div>
    );
  }

  const { company, jobs } = data;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 py-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">TexnikesDouleies.gr</Link>
          <Link href="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">← Επιστροφή</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[40px] border border-slate-200 p-8 md:p-12 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-3xl" />
              ) : (
                "🏢"
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-slate-900">{company.name}</h1>
                {company.verified && (
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2 py-1 rounded-full flex items-center gap-1">
                    ✅ ΕΠΑΛΗΘΕΥΜΕΝΗ
                  </span>
                )}
              </div>
              <p className="text-slate-500 font-medium mb-4 flex items-center gap-2">
                📍 {company.location}
                {company.website && (
                  <>
                    <span className="text-slate-300">•</span>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Ιστοσελίδα</a>
                  </>
                )}
              </p>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{company.description || "Δεν υπάρχει διαθέσιμη περιγραφή για αυτή την επιχείρηση."}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Ενεργές Αγγελίες ({jobs.length})</h2>
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard 
                  key={job._id} 
                  job={job} 
                  isSaved={false} 
                  onSave={() => {}} 
                  onViewDetails={setSelectedJob} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-medium">Δεν υπάρχουν ενεργές αγγελίες αυτή τη στιγμή.</p>
            </div>
          )}
        </div>
      </main>

      {selectedJob && (
        <JobModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
          showToast={(msg) => alert(msg)} 
        />
      )}

      <footer className="py-12 text-center text-slate-400 text-sm">
        © 2026 TexnikesDouleies.gr · Όλα τα δικαιώματα προστατεύονται.
      </footer>
    </div>
  );
}
