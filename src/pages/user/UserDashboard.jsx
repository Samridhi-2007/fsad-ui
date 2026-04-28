import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { hasApplied } from "../../services/applicationServices";
import { mergeInternshipsWithRecruiterOpenings } from "../../services/recruiterOpeningsService";
import { getRoleApiPrefix } from "../../utils/role";

function UserDashboard() {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboardData() {
      setLoading(true);
      setError("");

      const [internshipsRes] = await Promise.allSettled([
        http.get(`${getRoleApiPrefix(user?.role)}/internships`),
      ]);

      if (!mounted) return;

      if (internshipsRes.status === "fulfilled") {
        const apiInternships = Array.isArray(internshipsRes.value?.data) ? internshipsRes.value.data : [];
        setInternships(mergeInternshipsWithRecruiterOpenings(apiInternships));
      } else {
        setInternships(mergeInternshipsWithRecruiterOpenings([]));
      }

      const failures = [internshipsRes].filter((r) => r.status === "rejected");
      if (failures.length > 0) {
        setError("Some dashboard data could not be loaded. Check backend endpoints.");
      }

      setLoading(false);
    }

    loadDashboardData();
    return () => {
      mounted = false;
    };
  }, [user?.role]);

  const internshipsPreview = internships.slice(0, 8);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-teal-600 rounded-full animate-spin mx-auto my-20" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-6 md:p-8 shadow-sm">
        <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-cyan-700">
            User dashboard overview
          </p>
          <h1 className="mt-2 text-2xl md:text-4xl font-extrabold text-slate-900">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="mt-3 max-w-3xl text-sm md:text-base text-slate-600">
            This dashboard shows a live overview of internships from your backend.
          </p>

        </div>
      </header>

      {error && (
        <div className="p-4 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
          <p>{error}</p>
          <small className="block mt-1 opacity-80">Backend: {API_DISPLAY_URL}</small>
        </div>
      )}

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Internships</h2>
            <p className="text-sm text-slate-600">All available internships overview.</p>
          </div>
          <Link to="/user/internships" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
            View all internships
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {internshipsPreview.length === 0 && (
            <p className="text-sm text-slate-500 col-span-full">No internships found.</p>
          )}
          {internshipsPreview.map((item) => {
            const applied = hasApplied(user?.email, item?.id);
            return (
              <article key={item.id || `${item.title}-${item.companyName}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <p className="inline-flex rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                  {item.location || "Remote"}
                </p>
                <h3 className="mt-3 font-bold text-slate-900 leading-tight">{item.title || "Internship"}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.companyName || "Company"}</p>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                  {item.description || item.duration || "No extra details"}
                </p>
                <Link
                  to={`/user/internships/${item.id}/apply`}
                  state={{ internship: item }}
                  onClick={(event) => {
                    if (applied) event.preventDefault();
                  }}
                  className={`mt-4 inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    applied
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "bg-cyan-600 text-white hover:bg-cyan-700"
                  }`}
                >
                  {applied ? "Applied" : "Apply"}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}

export default UserDashboard;
