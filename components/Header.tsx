"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import { specialtyOptions, locationOptions } from "@/lib/constants";

export default function Header({ 
  setShowPostJobModal, 
  setShowPostWorkerModal 
}: { 
  setShowPostJobModal: (show: boolean) => void, 
  setShowPostWorkerModal: (show: boolean) => void 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">TexnikesDouleies.gr</Link>
        
        <div className="flex items-center gap-4">
          <Link href="/how-it-works" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Πώς λειτουργεί</Link>
          <Link href="/jobs" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Εύρεση Εργασίας</Link>
          <Link href="/employers" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Εύρεση Τεχνικών</Link>
          <div className="hidden lg:flex items-center gap-3 ml-2">
             <button onClick={() => setShowPostJobModal(true)} className="rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition">Καταχώρηση Αγγελίας</button>
             <button onClick={() => setShowPostWorkerModal(true)} className="rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition">Καταχώρηση Τεχνικού</button>
          </div>
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        </div>
      </div>
      
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4 text-sm font-semibold text-slate-600">
          <Link href="/how-it-works" onClick={() => setIsMenuOpen(false)}>Πώς λειτουργεί</Link>
          <Link href="/jobs" onClick={() => setIsMenuOpen(false)}>Εύρεση Εργασίας</Link>
          <Link href="/employers" onClick={() => setIsMenuOpen(false)}>Εύρεση Τεχνικών</Link>
          <button onClick={() => { setShowPostJobModal(true); setIsMenuOpen(false); }} className="text-indigo-600 text-left font-bold">Καταχώρηση Αγγελίας</button>
          <button onClick={() => { setShowPostWorkerModal(true); setIsMenuOpen(false); }} className="text-slate-900 text-left font-bold">Καταχώρηση Τεχνικού</button>
        </nav>
      )}

    </header>
  );
}
