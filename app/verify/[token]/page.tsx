"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const { token } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("Επαλήθευση...");

  useEffect(() => {
    if (!token) return;
    fetch(`/api/verify/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus("Η αγγελία σας επιβεβαιώθηκε επιτυχώς! Ανακατεύθυνση...");
          setTimeout(() => router.push("/"), 2000);
        } else {
          setStatus("Σφάλμα κατά την επιβεβαίωση: " + (data.message || "Άγνωστο σφάλμα"));
        }
      });
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold">{status}</h1>
    </div>
  );
}
