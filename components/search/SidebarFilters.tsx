import { specialtyOptions, locationOptions } from "../HomePage";

interface SidebarFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
}

export default function SidebarFilters({ filters, setFilters }: SidebarFiltersProps) {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 p-6 space-y-8">
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Φίλτρα Αναζήτησης</h3>
      
      {/* Search, Specialty & Location */}
      <div className="space-y-4">
        <input 
            placeholder="Τίτλος ή εταιρεία..."
            value={filters.keyword}
            onChange={(e) => setFilters({...filters, keyword: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100"
        />
        <select
            value={filters.info}
            onChange={(e) => setFilters({...filters, info: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100"
        >
            <option value="">Όλες οι ειδικότητες</option>
            {specialtyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <input
            list="location-options"
            placeholder="Περιοχή (π.χ. Αθήνα)..."
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100"
        />
        <datalist id="location-options">
          {locationOptions.map(opt => <option key={opt} value={opt} />)}
        </datalist>
      </div>

      <div className="space-y-4">
        <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">Κριτήρια</span>
        
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={filters.hasSalary}
            onChange={(e) => setFilters({...filters, hasSalary: e.target.checked})}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600">Με εμφανή μισθό</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={filters.urgentOnly}
            onChange={(e) => setFilters({...filters, urgentOnly: e.target.checked})}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600">Άμεση πρόσληψη</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={filters.fullTimeOnly}
            onChange={(e) => setFilters({...filters, fullTimeOnly: e.target.checked, partTimeOnly: false})}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600">Πλήρης απασχόληση</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={filters.partTimeOnly}
            onChange={(e) => setFilters({...filters, partTimeOnly: e.target.checked, fullTimeOnly: false})}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600">Μερική απασχόληση</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={filters.fixedDurationOnly}
            onChange={(e) => setFilters({...filters, fixedDurationOnly: e.target.checked})}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600">Συγκεκριμένης διάρκειας</span>
        </label>
      </div>

      <button 
        onClick={() => setFilters({ keyword: "", location: "", info: "", hasSalary: false, urgentOnly: false, fullTimeOnly: false, partTimeOnly: false, fixedDurationOnly: false })}
        className="w-full text-sm font-bold text-slate-400 hover:text-indigo-600 transition border-t border-slate-100 pt-4"
      >
        Καθαρισμός όλων
      </button>
    </div>
  );
}
