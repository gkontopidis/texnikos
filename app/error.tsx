"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-rose-50 p-6 text-6xl">⚠️</div>
      <h1 className="mb-2 text-4xl font-black text-slate-900 sm:text-5xl">Κάτι πήγε στραβά</h1>
      <p className="mb-8 max-w-md text-lg text-slate-600">
        Παρουσιάστηκε ένα απρόσμενο σφάλμα. Παρακαλούμε δοκιμάστε ξανά ή επιστρέψτε στην αρχική σελίδα.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => reset()}
          className="rounded-2xl bg-slate-900 px-8 py-4 text-lg font-bold text-white transition hover:bg-slate-800"
        >
          Δοκιμάστε Ξανά
        </button>
        <Link
          href="/"
          className="rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-900 transition hover:bg-slate-50"
        >
          Επιστροφή στην Αρχική
        </Link>
      </div>
    </div>
  );
}
