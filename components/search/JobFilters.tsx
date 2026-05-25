import { specialtyOptions } from "../HomePage";

interface JobFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
}

export default function JobFilters({ filters, setFilters }: JobFiltersProps) {
  const toggle = (key: string, value: boolean) => {
    setFilters({ ...filters, [key]: value });
  };

  const setSpecialty = (value: string) => {
    setFilters({ ...filters, specialty: value });
  };

  const Chip = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
        active 
          ? "bg-slate-900 text-white border-slate-900" 
          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-4 mb-8">
      <select 
        value={filters.specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        className="w-full md:w-auto px-4 py-3 rounded-2xl text-sm font-bold border border-slate-200 bg-white text-slate-600 outline-none focus:border-indigo-500 transition"
      >
        <option value="">Όλες οι ειδικότητες</option>
        {specialtyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>

      <div className="flex flex-wrap gap-2 items-center">
        <Chip label="Επείγουσες ⚡" active={filters.urgentOnly} onClick={() => toggle("urgentOnly", !filters.urgentOnly)} />
        <Chip label="Πλήρης" active={filters.fullTimeOnly} onClick={() => { toggle("fullTimeOnly", !filters.fullTimeOnly); if(!filters.fullTimeOnly) setFilters({...filters, fullTimeOnly: true, partTimeOnly: false}) }} />
        <Chip label="Μερική" active={filters.partTimeOnly} onClick={() => { toggle("partTimeOnly", !filters.partTimeOnly); if(!filters.partTimeOnly) setFilters({...filters, partTimeOnly: true, fullTimeOnly: false}) }} />
        <Chip label="Συγκεκριμένης Διάρκειας" active={filters.fixedDurationOnly} onClick={() => toggle("fixedDurationOnly", !filters.fixedDurationOnly)} />
        <Chip label="Με Μισθό" active={filters.hasSalary} onClick={() => toggle("hasSalary", !filters.hasSalary)} />
        
        <button 
          onClick={() => setFilters({ keyword: "", location: "", info: "", specialty: "", hasSalary: false, urgentOnly: false, fullTimeOnly: false, partTimeOnly: false, fixedDurationOnly: false })}
          className="text-sm font-bold text-slate-400 hover:text-slate-900 transition underline ml-2"
        >
          Καθαρισμός
        </button>
      </div>
    </div>
  );
}
