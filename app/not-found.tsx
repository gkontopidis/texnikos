import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-indigo-50 p-6 text-6xl">🔍</div>
      <h1 className="mb-2 text-4xl font-black text-slate-900 sm:text-5xl">Η σελίδα δεν βρέθηκε</h1>
      <p className="mb-8 max-w-md text-lg text-slate-600">
        Λυπούμαστε, αλλά η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί.
      </p>
      <Link
        href="/"
        className="rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-indigo-300"
      >
        Επιστροφή στην Αρχική
      </Link>
    </div>
  );
}
