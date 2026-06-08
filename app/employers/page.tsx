"use client";
import { useState, Suspense } from "react";
import PageContainer from "@/components/PageContainer";
import PostJobFlow from "@/components/job/PostJobFlow";
import PostWorkerFlow from "@/components/job/PostWorkerFlow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { specialtyOptions, locationOptions } from "@/lib/constants";
import WorkersListPage from "@/app/workers/page";

function EmployersContent() {
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showPostWorkerModal, setShowPostWorkerModal] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info"; visible: boolean }[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type, visible: true }]);
    setTimeout(() => setToasts((current) => current.map((t) => t.id === id ? { ...t, visible: false } : t)), 3000);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3500);
  };

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

      <PageContainer 
        title="Βρείτε εξειδικευμένους τεχνικούς" 
        subtitle="Περιηγηθείτε στον κατάλογο των διαθέσιμων επαγγελματιών της πλατφόρμας μας."
      >
           <WorkersListPage isEmbedded={true} />
      </PageContainer>

      {showPostJobModal && (
        <PostJobFlow 
          onClose={() => setShowPostJobModal(false)} 
          onJobCreated={() => showToast("Η αγγελία σας καταχωρήθηκε!")} 
          showToast={showToast} 
          specialtyOptions={specialtyOptions} 
          locationOptions={locationOptions} 
        />
      )}
      {showPostWorkerModal && (
        <PostWorkerFlow 
          onClose={() => setShowPostWorkerModal(false)} 
          onWorkerCreated={() => showToast("Το προφίλ σας καταχωρήθηκε!")} 
          showToast={showToast} 
          specialtyOptions={specialtyOptions} 
          locationOptions={locationOptions} 
        />
      )}
      <Footer />
    </div>
  );
}

export default function EmployersPage() {
  return <Suspense><EmployersContent /></Suspense>;
}
