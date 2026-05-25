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
    hasSalary: boolean;
    urgentOnly: boolean;
    fullTimeOnly: boolean;
    partTimeOnly: boolean;
  }
) {
  const normalizedKeyword = normalizeGreek(filters.keyword);
  const normalizedLocation = normalizeGreek(filters.location);
  const normalizedInfo = normalizeGreek(filters.info);

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

    // 3. Category/Info filter
    const matchesInfo =
      normalizedInfo.length === 0 ||
      normalizeGreek(job.title || "").includes(normalizedInfo) ||
      (job.category && normalizeGreek(job.category).includes(normalizedInfo));

    // 4. Advanced Filters
    const matchesSalary = !filters.hasSalary || !!job.salary;
    const matchesUrgent = !filters.urgentOnly || !!job.urgent;
    const matchesFullTime = !filters.fullTimeOnly || job.fullTime === true;
    const matchesPartTime = !filters.partTimeOnly || job.fullTime === false;

    return matchesKeyword && matchesLocation && matchesInfo && matchesSalary && matchesUrgent && matchesFullTime && matchesPartTime;
  });
}
