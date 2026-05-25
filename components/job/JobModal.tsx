"use client";
import { useState, type FormEvent } from "react";

import { Job } from "@/types/job";

interface JobModalProps {
  job: Job;
  onClose: () => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function JobModal({ job, onClose, showToast }: JobModalProps) {
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantMessage, setApplicantMessage] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);

  const formatRelativeDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Δημοσιεύτηκε σήμερα";
    if (diffDays === 1) return "Δημοσιεύτηκε εχθές";
    return `Δημοσιεύτηκε πριν από ${diffDays} ημέρες`;
  };

  const getResponseRateColor = (rate?: number) => {
    if (rate === undefined) return "text-slate-400";
    if (rate >= 90) return "text-emerald-600";
    if (rate >= 60) return "text-amber-600";
    return "text-slate-500";
  };

  const trackContact = (type: "phone" | "whatsapp" | "email") => {
    fetch("/api/track-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: job._id, type }),
    }).catch(err => console.error("Tracking failed", err));
  };

  const getResponseRateLabel = (rate?: number) => {
    if (rate === undefined || rate === 0) return "Ενεργός εργοδότης";
    if (rate >= 90) return "Συνήθως απαντά πολύ γρήγορα";
    if (rate >= 60) return "Συνήθως απαντά γρήγορα";
    return "Ενεργός εργοδότης";
  };

  const handleApplySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!applicantName.trim() || !applicantEmail.trim() || !applicantPhone.trim()) {
      showToast("Συμπλήρωσε όνομα, email και τηλέφωνο για να στείλεις αίτηση.", "error");
      return;
    }

    const response = await fetch("/api/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId: job._id,
        jobTitle: job.title,
        employerEmail: job.contactEmail,
        employerPhone: job.contactPhone,
        applicantName: applicantName.trim(),
        applicantEmail: applicantEmail.trim(),
        applicantPhone: applicantPhone.trim(),
        applicantMessage: applicantMessage.trim(),
      }),
    });

    if (!response.ok) {
      showToast("Υπήρξε σφάλμα κατά την αποστολή της αίτησης. Προσπάθησε ξανά.", "error");
      return;
    }

    // Track application as a contact event too
    trackContact("email");

    showToast("Η αίτηση στάλθηκε επιτυχώς στον εργοδότη.", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 overflow-y-auto">
      <div className="w-full max-w-3xl my-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold">{job.title}</h3>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span>{job.company} · {job.location}</span>
              <span>•</span>
              <span className="font-medium text-slate-400">{formatRelativeDate(job.createdAt)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 transition hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          {/* Trust Block */}
          <div className="grid gap-3 sm:grid-cols-3">
            {job.salaryVerified && (
              <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3 text-xs font-semibold text-slate-700 border border-slate-100">
                <span className="text-emerald-600 text-lg">✓</span>
                <span>Επιβεβαιωμένος μισθός</span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3 text-xs font-semibold text-slate-700 border border-slate-100">
              <span className="text-amber-500 text-lg">⚡</span>
              <span className={getResponseRateColor(job.responseRate)}>
                {getResponseRateLabel(job.responseRate)}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500 mb-2 flex items-center justify-between">
                <span>Μισθός</span>
              </div>
              <div className="font-medium text-slate-900 text-lg">{job.salary ?? "Κατόπιν συμφωνίας"}</div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500 mb-2">Διάρκεια</div>
              <div className="font-medium text-slate-900 text-lg">
                {job.duration?.type === "permanent" 
                  ? "Μόνιμη συνεργασία" 
                  : `${job.duration?.amount} ${job.duration?.unit === 'days' ? 'ημέρες' : job.duration?.unit === 'months' ? 'μήνες' : 'έτη'}`}
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500 mb-2">Καθεστώς</div>
              <div className="font-medium text-slate-900 text-lg">
                {job.urgent ? "Άμεση πρόσληψη" : "Κανονική ανακοίνωση"}
                {job.fullTime ? " · Πλήρης" : ""}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-500 mb-2">Περιγραφή</div>
            <p className="text-slate-700 leading-relaxed">
              {job.description ?? "Λεπτομέρειες δεν έχουν δοθεί. Επικοινώνησε απευθείας με τον εργοδότη."}
            </p>
          </div>

          {/* Contact Actions - HUGE */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900">Επικοινώνησε απευθείας:</h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {job.contactPhone && (
                <a
                  href={`tel:${job.contactPhone}`}
                  onClick={() => trackContact("phone")}
                  className="flex flex-col items-center justify-center gap-1 rounded-3xl bg-emerald-600 px-5 py-4 text-center text-white transition hover:bg-emerald-700 shadow-md"
                >
                  <span className="font-bold">📞 Κάλεσε τώρα</span>
                  <span className="text-xs opacity-90">{job.contactPhone}</span>
                </a>
              )}

              {job.contactPhone && (
                <a
                  href={`https://wa.me/${job.contactPhone.replace(/[^0-9]/g, '').startsWith('30') ? '' : '30'}${job.contactPhone.replace(/[^0-9]/g, '')}`}
                  onClick={() => trackContact("whatsapp")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 rounded-3xl bg-green-500 px-5 py-4 text-center text-white transition hover:bg-green-600 shadow-md"
                >
                  <span className="font-bold">💬 WhatsApp</span>
                  <span className="text-xs opacity-90">Άμεσο μήνυμα</span>
                </a>
              )}

              {job.contactEmail && (
                <a
                  href={`mailto:${job.contactEmail}`}
                  onClick={() => trackContact("email")}
                  className="flex flex-col items-center justify-center gap-1 rounded-3xl bg-slate-900 px-5 py-4 text-center text-white transition hover:bg-slate-800 shadow-md"
                >
                  <span className="font-bold">✉ Email</span>
                  <span className="text-xs opacity-90 text-slate-300 truncate w-full px-2">
                    {job.contactEmail}
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Collapsible Apply Form */}
          <div className="pt-4 border-t border-slate-100">
            {!showApplyForm ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={onClose}
                    className="rounded-2xl border-2 border-slate-200 px-8 py-3 font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Ακύρωση
                  </button>
                  <button
                    onClick={() => setShowApplyForm(true)}
                    className="rounded-2xl bg-slate-900 px-8 py-3 font-bold text-white transition hover:bg-slate-800"
                  >
                    Στείλε αίτηση
                  </button>
                </div>
                
                <button
                    onClick={() => {
                        const reason = prompt("Γιατί αναφέρετε αυτή την αγγελία;");
                        if (reason) {
                            fetch("/api/jobs/report", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ jobId: job._id, reason })
                            }).then(() => showToast("Ευχαριστούμε, η αναφορά σας εστάλη.", "info"));
                        }
                    }}
                    className="text-xs text-rose-500 hover:underline text-center"
                >
                    Αναφορά ακατάλληλου περιεχομένου
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900">Φόρμα Αίτησης:</h4>
                  <button 
                    type="button" 
                    onClick={() => setShowApplyForm(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Ακύρωση
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Όνομα υποψηφίου"
                    className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                  <input
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    type="email"
                    placeholder="Email υποψηφίου"
                    className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <input
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="Τηλέφωνο υποψηφίου"
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />

                <textarea
                  value={applicantMessage}
                  onChange={(e) => setApplicantMessage(e.target.value)}
                  placeholder="Σύντομο μήνυμα προς τον εργοδότη (προαιρετικό)"
                  className="w-full min-h-[120px] rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none resize-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      required
                      className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="consent" className="text-sm text-slate-600">
                      Συμφωνώ με τους <Link href="/terms" className="text-indigo-600 font-bold hover:underline">Όρους Χρήσης</Link> και την <Link href="/gdpr" className="text-indigo-600 font-bold hover:underline">Πολιτική Απορρήτου</Link>. Συγκατατίθεμαι στην προώθηση των στοιχείων μου στον εργοδότη.
                    </label>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                    <div className="text-xs text-slate-500">
                      Ο εργοδότης θα λάβει τα στοιχεία σου άμεσα.
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-3xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        Ακύρωση
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto rounded-3xl bg-slate-900 px-8 py-3 font-bold text-white transition hover:bg-slate-800"
                      >
                        Υποβολή Αίτησης
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

