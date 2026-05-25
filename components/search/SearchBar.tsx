"use client";
import type { FormEvent } from "react";

interface SearchBarProps {
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
  searchLocation: string;
  setSearchLocation: (val: string) => void;
  searchInfo: string;
  setSearchInfo: (val: string) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
  handleClearFilters: () => void;
  handleQuickFilter: (filter: string) => void;
  specialtyOptions: string[];
}

export default function SearchBar({
  searchKeyword,
  setSearchKeyword,
  searchLocation,
  setSearchLocation,
  searchInfo,
  setSearchInfo,
  handleSearch,
  handleClearFilters,
  handleQuickFilter,
  specialtyOptions,
}: SearchBarProps) {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1fr),minmax(0,1fr)]">
          <label className="relative block">
            <select
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 pr-10 text-slate-700 outline-none appearance-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            >
              <option value="">Ειδικότητα</option>
              {specialtyOptions.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            {searchKeyword && (
              <button
                type="button"
                onClick={() => setSearchKeyword("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
              >
                ×
              </button>
            )}
          </label>

          <div>
            <div className="relative">
              <input
                placeholder="Περιοχή"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 pr-10 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
              {searchLocation && (
                <button
                  type="button"
                  onClick={() => setSearchLocation("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
              {["Αθήνα", "Θεσσαλονίκη", "Κοζάνη", "Λαμία", "Τρίπολη"].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleQuickFilter(tag)}
                  className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 transition hover:bg-slate-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                placeholder="Πληροφορίες"
                value={searchInfo}
                onChange={(e) => setSearchInfo(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 pr-10 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
              {searchInfo && (
                <button
                  type="button"
                  onClick={() => setSearchInfo("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
              {["Με μισθό", "Άμεση πρόσληψη", "Πλήρης απασχόληση", "Μερική απασχόληση"].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleQuickFilter(tag)}
                  className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 transition hover:bg-slate-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Αναζήτηση
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Καθαρισμός
          </button>
        </div>
      </form>
    </div>
  );
}
