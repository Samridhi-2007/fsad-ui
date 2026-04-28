import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { hasApplied } from "../../services/applicationServices";
import { mergeInternshipsWithRecruiterOpenings } from "../../services/recruiterOpeningsService";
import { getRoleApiPrefix } from "../../utils/role";

function UserInternships() {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    http
      .get(`${getRoleApiPrefix(user?.role)}/internships`)
      .then((res) => {
        const apiInternships = Array.isArray(res.data) ? res.data : [];
        setInternships(mergeInternshipsWithRecruiterOpenings(apiInternships));
        setError("");
      })
      .catch((err) => {
        setInternships(mergeInternshipsWithRecruiterOpenings([]));
        setError(err.response?.data?.message || err.message || "Failed to load internships");
      })
      .finally(() => setLoading(false));
  }, [user?.role]);

  if (loading) return <div className="text-slate-600">Loading internships...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Available Internships</h1>
        <p className="mt-1 text-slate-600">Apply to internships and track your status in profile.</p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
          <small className="block mt-1 opacity-80">Backend: {API_DISPLAY_URL}</small>
        </div>
      )}

      {!error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {internships.length === 0 && (
            <p className="text-slate-500 text-sm col-span-full">No internships available now.</p>
          )}
          {internships.map((item) => {
            const applied = hasApplied(user?.email, item?.id);
            return (
              <article key={item.id} className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900">{item.title || "Internship Role"}</h3>
                <p className="text-sm text-slate-600 mt-1">{item.companyName || "Company"}</p>
                <p className="text-sm text-slate-500 mt-3">
                  {item.description || item.duration || "No additional details"}
                </p>
                <Link
                  to={`/user/internships/${item.id}/apply`}
                  state={{ internship: item }}
                  className={`mt-4 inline-flex w-full justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    applied
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "bg-teal-600 text-white hover:bg-teal-700"
                  }`}
                  onClick={(event) => {
                    if (applied) event.preventDefault();
                  }}
                >
                  {applied ? "Applied" : "Apply"}
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserInternships;
