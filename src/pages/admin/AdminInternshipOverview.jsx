import { useEffect, useMemo, useState } from "react";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";

function parseDate(item) {
  const candidates = [item?.endDate, item?.deadline, item?.lastDate, item?.expiresAt];
  const value = candidates.find(Boolean);
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getInternshipStatus(item) {
  const explicit = (item?.status || "").toString().toLowerCase();
  if (explicit.includes("expired") || explicit.includes("closed")) return "Expired";
  if (explicit.includes("ongoing") || explicit.includes("active")) return "Ongoing";
  if (explicit.includes("upcoming")) return "Upcoming";

  const date = parseDate(item);
  if (!date) return "Ongoing";
  return date < new Date() ? "Expired" : "Ongoing";
}

function AdminInternshipOverview() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    http
      .get("/internships")
      .then((res) => {
        setInternships(Array.isArray(res.data) ? res.data : []);
        setError("");
      })
      .catch((err) => {
        setInternships([]);
        setError(err.response?.data?.message || err.message || "Failed to load internships");
      })
      .finally(() => setLoading(false));
  }, []);

  const categorized = useMemo(() => {
    const result = { all: internships, ongoing: [], expired: [], upcoming: [] };
    internships.forEach((item) => {
      const status = getInternshipStatus(item);
      if (status === "Expired") result.expired.push(item);
      else if (status === "Upcoming") result.upcoming.push(item);
      else result.ongoing.push(item);
    });
    return result;
  }, [internships]);

  if (loading) return <div className="text-slate-600">Loading internships...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Internship Overview</h1>
        <p className="mt-1 text-slate-600">
          Track all internships including ongoing and expired listings.
        </p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
          <small className="block mt-1 opacity-80">Backend: {API_DISPLAY_URL}</small>
        </div>
      )}

      {!error && (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-2xl font-bold text-slate-900">{categorized.all.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
              <p className="text-sm text-slate-600">Ongoing</p>
              <p className="text-2xl font-bold text-emerald-700">{categorized.ongoing.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
              <p className="text-sm text-slate-600">Expired</p>
              <p className="text-2xl font-bold text-rose-700">{categorized.expired.length}</p>
            </div>
          </div>

          <section className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">All Internships</h2>
            <div className="space-y-3">
              {categorized.all.length === 0 && (
                <p className="text-slate-500 text-sm">No internships found.</p>
              )}
              {categorized.all.map((item) => {
                const status = getInternshipStatus(item);
                return (
                  <article key={item.id} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.companyName || item.title || "Internship"}
                        </p>
                        <p className="text-sm text-slate-600">
                          {item.title || item.description || "No details available"}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          status === "Expired"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default AdminInternshipOverview;
