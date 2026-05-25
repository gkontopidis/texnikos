import { useEffect, useMemo, useState } from "react";

export default function TechnicalJobsGreeceMVP() {
  const [keyword, setKeyword] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [email, setEmail] = useState("");
  const [jobs, setJobs] = useState([]);

useEffect(() => {
  fetch("/api/jobs")
    .then((res) => res.json())
    .then((data) => {
      setJobs(data);
    });
}, []);
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesKeyword =
        keyword.length === 0 ||
        job.title.toLowerCase().includes(keyword.toLowerCase());

      const matchesLocation =
        locationFilter.length === 0 ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesKeyword && matchesLocation;
    });
  }, [jobs, keyword, locationFilter]);

  const handleAlertSignup = () => {
    if (!email) return;

    alert(`Εγγραφή επιτυχής για alerts: ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">TexnikesDouleies.gr</h1>
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#jobs" className="hover:text-gray-600">Jobs</a>
            <a href="#alerts" className="hover:text-gray-600">Alerts</a>
            <a href="#employers" className="hover:text-gray-600">Employers</a>
          </nav>

          <button className="bg-black text-white px-4 py-2 rounded-2xl text-sm font-medium hover:opacity-90">
            Δημοσίευσε Αγγελία
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm mb-6 shadow-sm">
              ⚡ Άμεσες προσλήψεις σε τεχνικά επαγγέλματα
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Βρες τεχνική δουλειά γρήγορα.
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Αγγελίες για ηλεκτρολόγους, ψυκτικούς, υδραυλικούς,
              τεχνικούς και εργοτάξια με ξεκάθαρο μισθό και άμεση επικοινωνία.
            </p>

            {/* Search */}
            <div className="bg-white rounded-3xl shadow-lg p-4 border space-y-4">
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  placeholder="Ειδικότητα"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="border rounded-2xl px-4 py-3 outline-none"
                />

                <input
                  placeholder="Περιοχή"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="border rounded-2xl px-4 py-3 outline-none"
                />

                <button className="bg-black text-white rounded-2xl px-4 py-3 font-medium hover:opacity-90">
                  Αναζήτηση
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  "Με μισθό",
                  "Άμεση πρόσληψη",
                  "Πλήρης απασχόληση",
                  "Αθήνα",
                  "Θεσσαλονίκη",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="border rounded-full px-3 py-1 hover:bg-gray-100"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm border">
              <div className="text-4xl font-bold mb-2">320+</div>
              <div className="text-gray-600">Ενεργές αγγελίες</div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border">
              <div className="text-4xl font-bold mb-2">1500€+</div>
              <div className="text-gray-600">Μέσος μισθός</div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border col-span-2">
              <div className="text-xl font-semibold mb-3">
                🔔 Salary Alerts
              </div>
              <p className="text-gray-600 mb-4">
                Πάρε ειδοποίηση όταν εμφανιστεί νέα δουλειά στην ειδικότητά σου.
              </p>

              <div className="flex gap-2">
                <input
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border rounded-2xl px-4 py-3 outline-none"
                />

                <button
                  onClick={handleAlertSignup}
                  className="bg-black text-white rounded-2xl px-5 py-3 hover:opacity-90"
                >
                  Εγγραφή
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold mb-2">Νέες Αγγελίες</h3>
            <p className="text-gray-600">
              Καθημερινά νέες τεχνικές δουλειές σε όλη την Ελλάδα.
            </p>
          </div>

          <button className="border rounded-2xl px-4 py-2 hover:bg-white">
            Όλες οι αγγελίες
          </button>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-2xl font-semibold">{job.title}</h4>

                    {job.urgent && (
                      <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                        Άμεση πρόσληψη
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-gray-600 mb-3">
                    <span>📍 {job.location}</span>
                    <span>🏢 {job.company}</span>
                    <span>💰 {job.salary}</span>
                  </div>

                  <p className="text-gray-600 max-w-2xl">
                    Ζητείται έμπειρος τεχνικός για μόνιμη εργασία με πλήρη ασφάλιση και ανταγωνιστικές αποδοχές.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="border rounded-2xl px-5 py-3 hover:bg-gray-100">
                    Αποθήκευση
                  </button>

                  <button className="bg-black text-white rounded-2xl px-5 py-3 hover:opacity-90">
                    Δες στοιχεία
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Employers */}
      <section
        id="employers"
        className="bg-black text-white py-20"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">
            Ψάχνεις τεχνικό προσωπικό;
          </h3>

          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Δημοσίευσε αγγελία και φτάσε γρήγορα σε εργαζόμενους που ψάχνουν άμεσα δουλειά.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
              <div className="text-3xl font-bold mb-2">€0</div>
              <div className="font-medium mb-2">Basic</div>
              <p className="text-sm text-gray-300">
                Απλή δημοσίευση αγγελίας.
              </p>
            </div>

            <div className="bg-white text-black rounded-3xl p-6 shadow-xl scale-105">
              <div className="text-3xl font-bold mb-2">€49</div>
              <div className="font-medium mb-2">Featured</div>
              <p className="text-sm text-gray-700">
                Πρώτη θέση + email alerts.
              </p>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
              <div className="text-3xl font-bold mb-2">€99</div>
              <div className="font-medium mb-2">Urgent Hiring</div>
              <p className="text-sm text-gray-300">
                Priority listing + homepage placement.
              </p>
            </div>
          </div>

          <button className="bg-white text-black rounded-2xl px-8 py-4 font-semibold hover:opacity-90">
            Δημοσίευσε Αγγελία
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div>© 2026 TexnikesDouleies.gr</div>

          <div className="flex gap-6">
            <a href="#">Όροι Χρήσης</a>
            <a href="#">GDPR</a>
            <a href="#">Επικοινωνία</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
