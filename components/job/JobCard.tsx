"use client";

import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onSave: (id: string) => void;
  onViewDetails: (job: Job) => void;
}

export default function JobCard({ job, isSaved, onSave, onViewDetails }: JobCardProps) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h4 className="text-2xl font-semibold text-slate-900 truncate">{job.title}</h4>
            <div className="flex flex-wrap gap-2">
              {job.urgent && (
                <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-900">
                  Άμεση πρόσληψη
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row flex-nowrap items-center gap-x-3 text-slate-500 mb-4 text-[10px] sm:text-xs overflow-hidden min-w-0">
            <span className="whitespace-nowrap shrink-0">📍 {job.location}</span>
            <span className="whitespace-nowrap shrink-0 truncate max-w-[80px]">🏢 {job.company}</span>
            <span className="flex items-center gap-1 whitespace-nowrap shrink-0 overflow-hidden text-ellipsis">
              💰 {job.salary ?? "Κατόπιν συμφωνίας"}
            </span>
          </div>

          <p className="text-slate-600 max-w-2xl line-clamp-2">
            {job.description || "Ζητείται έμπειρος τεχνικός για μόνιμη εργασία με πλήρη ασφάλιση και ανταγωνιστικές αποδοχές."}
            <button 
              onClick={() => onViewDetails(job)}
              className="ml-2 text-indigo-600 font-bold hover:underline"
            >
              Περισσότερα...
            </button>
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onSave(job._id)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 whitespace-nowrap"
          >
            {isSaved ? "Αποθηκεύτηκε" : "Αποθήκευση"}
          </button>

          <button
            type="button"
            onClick={() => onViewDetails(job)}
            className="rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-slate-800 whitespace-nowrap"
          >
            Δες στοιχεία
          </button>
        </div>
      </div>
    </div>
  );
}
