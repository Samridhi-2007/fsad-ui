import { useEffect, useMemo, useState } from "react";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { normalizeRole } from "../../utils/role";

function UserMentors() {
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
        setError(err.response?.data?.message || err.message || "Failed to load mentors");
      })
      .finally(() => setLoading(false));
  }, []);

  const mentors = useMemo(
    () => users.filter((u) => normalizeRole(u?.role) === "mentor"),
    [users]
  );

  if (loading) return <div className="text-slate-600">Loading mentors...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Connect With Mentors</h1>
        <p className="mt-1 text-slate-600">
          Explore mentors and connect with them for guidance.
        </p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
          <small className="block mt-1 opacity-80">Backend: {API_DISPLAY_URL}</small>
        </div>
      )}

      {!error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mentors.length === 0 && (
            <p className="text-sm text-slate-500 col-span-full">No mentors found on the platform yet.</p>
          )}
          {mentors.map((mentor) => (
            <article key={mentor.id || mentor.email} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{mentor.name || "Mentor"}</h3>
              <p className="text-sm text-slate-600 mt-1">{mentor.email || "-"}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">Mentor</p>
              <button
                type="button"
                className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
              >
                Connect
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserMentors;
