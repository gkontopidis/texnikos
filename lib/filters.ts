function normalizeGreek(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .toLowerCase()
    .trim();
}

export function filterJobs(
  jobs: any[], 
  filters: { 
    keyword: string; 
    location: string; 
    info: string;
    specialty: string;
    hasSalary: boolean;
    urgentOnly: boolean;
    fullTimeOnly: boolean;
    partTimeOnly: boolean;
    fixedDurationOnly: boolean;
  }
) {
  const normalizedKeyword = normalizeGreek(filters.keyword);
  const normalizedLocation = normalizeGreek(filters.location);
  const normalizedInfo = normalizeGreek(filters.info);
  const normalizedSpecialty = normalizeGreek(filters.specialty);

  return jobs.filter((job) => {
    // 1. Keyword search
    const matchesKeyword =
      normalizedKeyword.length === 0 ||
      normalizeGreek(job.title || "").includes(normalizedKeyword) ||
      normalizeGreek(job.company || "").includes(normalizedKeyword) ||
      normalizeGreek(job.description || "").includes(normalizedKeyword);

    // 2. Location filter
    const matchesLocation =
      normalizedLocation.length === 0 ||
      normalizedLocation === normalizeGreek("Ολόκληρη η Ελλάδα") ||
      normalizeGreek(job.location || "").includes(normalizedLocation);

    // 3. Specialty/Category filter
    const matchesSpecialty = 
        normalizedSpecialty.length === 0 ||
        normalizeGreek(job.title || "").includes(normalizedSpecialty) ||
        (job.category && normalizeGreek(job.category).includes(normalizedSpecialty));

    // 4. Advanced Filters
    const matchesSalary = !filters.hasSalary || !!job.salary;
    const matchesUrgent = !filters.urgentOnly || !!job.urgent;
    const matchesFullTime = !filters.fullTimeOnly || job.fullTime === true;
    const matchesPartTime = !filters.partTimeOnly || job.fullTime === false;
    
    const normalizedDuration = normalizeGreek(job.duration?.type || "");
    const isPermanent = normalizedDuration.includes("μονιμη") || normalizedDuration.includes("αοριστου") || job.duration?.type === "permanent";
    const matchesFixedDuration = !filters.fixedDurationOnly || (!!job.duration && !isPermanent);

    return matchesKeyword && matchesLocation && matchesSpecialty && matchesSalary && matchesUrgent && matchesFullTime && matchesPartTime && matchesFixedDuration;
  });
}
