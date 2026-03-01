import { useEffect, useState } from "react";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { applyToInternship, hasApplied } from "../../services/applicationServices";

function UserInternships() {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, setRefreshKey] = useState(0);

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

  const handleApply = (internship) => {
    applyToInternship({ userEmail: user?.email, internship });
    setRefreshKey((prev) => prev + 1);
  };

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
                <button
                  type="button"
                  disabled={applied}
                  onClick={() => handleApply(item)}
                  className={`mt-4 w-full px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    applied
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "bg-teal-600 text-white hover:bg-teal-700"
                  }`}
                >
                  {applied ? "Applied" : "Apply"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserInternships;
