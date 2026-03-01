import { useEffect, useMemo, useState } from "react";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { normalizeRole } from "../../utils/role";

function AdminUsersMentors() {
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
        setError(err.response?.data?.message || err.message || "Failed to load users");
      })
      .finally(() => setLoading(false));
  }, []);

  const { mentors, platformUsers } = useMemo(() => {
    const mentorRows = [];
    const userRows = [];

    users.forEach((u) => {
      const role = normalizeRole(u?.role);
      if (role === "mentor") mentorRows.push(u);
      else if (role !== "admin") userRows.push(u);
    });

    return { mentors: mentorRows, platformUsers: userRows };
  }, [users]);

  if (loading) {
    return <div className="text-slate-600">Loading people...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Platform People</h1>
        <p className="mt-1 text-slate-600">
          View all registered users and mentors in the platform.
        </p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
          <small className="block mt-1 opacity-80">Backend: {API_DISPLAY_URL}</small>
        </div>
      )}

      {!error && (
        <div className="grid md:grid-cols-2 gap-5">
          <section className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Users ({platformUsers.length})
            </h2>
            <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
              {platformUsers.length === 0 && <p className="text-slate-500 text-sm">No users found.</p>}
              {platformUsers.map((u) => (
                <article key={u.id || u.email} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-semibold text-slate-900">{u.name || "Unnamed"}</p>
                  <p className="text-sm text-slate-600">{u.email || "-"}</p>
                  <p className="text-xs text-slate-500 mt-1 uppercase">
                    Role: {normalizeRole(u.role)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Mentors ({mentors.length})
            </h2>
            <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
              {mentors.length === 0 && <p className="text-slate-500 text-sm">No mentors found.</p>}
              {mentors.map((u) => (
                <article key={u.id || u.email} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-semibold text-slate-900">{u.name || "Unnamed Mentor"}</p>
                  <p className="text-sm text-slate-600">{u.email || "-"}</p>
                  <p className="text-xs text-slate-500 mt-1 uppercase">
                    Role: {normalizeRole(u.role)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default AdminUsersMentors;
