import { useEffect, useMemo, useState } from "react";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { normalizeRole } from "../../utils/role";

function MentorMentees() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    http
      .get("/users")
      .then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
        setError("");
      })
      .catch((err) => {
        setUsers([]);
        setError(err.response?.data?.message || err.message || "Failed to load mentees");
      })
      .finally(() => setLoading(false));
  }, []);

  const mentees = useMemo(() => {
    return users.filter((u) => normalizeRole(u?.role) === "user");
  }, [users]);

  if (loading) return <div className="text-slate-600">Loading mentees...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Assigned Mentees</h1>
        <p className="mt-1 text-slate-600">View learners in the platform and support their progress.</p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
          <small className="block mt-1 opacity-80">Backend: {API_DISPLAY_URL}</small>
        </div>
      )}

      {!error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mentees.length === 0 && (
            <p className="text-sm text-slate-500 col-span-full">No mentees found.</p>
          )}
          {mentees.map((mentee) => (
            <article key={mentee.id || mentee.email} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{mentee.name || "User"}</h3>
              <p className="text-sm text-slate-600 mt-1">{mentee.email || "-"}</p>
              <button
                type="button"
                className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
              >
                View Progress
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default MentorMentees;
