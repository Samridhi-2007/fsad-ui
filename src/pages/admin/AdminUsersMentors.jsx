import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { normalizeRole } from "../../utils/role";

function AdminUsersMentors() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    http
      .get("/admin/users")
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

  const { recruiters, platformUsers } = useMemo(() => {
    const recruiterRows = [];
    const userRows = [];

    users.forEach((u) => {
      const role = normalizeRole(u?.role);
      if (role === "recruiter") recruiterRows.push(u);
      else if (role !== "admin") userRows.push(u);
    });

    return { recruiters: recruiterRows, platformUsers: userRows };
  }, [users]);

  if (loading) {
    return <div className="text-slate-600">Loading people...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform People</h1>
          <p className="mt-1 text-slate-600">
            View all registered interns and recruiters in the platform.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/users/add"
            state={{ defaultRole: "RECRUITER" }}
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Add Recruiter
          </Link>
          <Link
            to="/users/add"
            state={{ defaultRole: "INTERN" }}
            className="inline-flex items-center justify-center rounded-lg border-2 border-teal-600 px-4 py-2.5 text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-50"
          >
            Add Intern
          </Link>
        </div>
      </header>

      {!error && (
        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total People</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{platformUsers.length + recruiters.length}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Interns</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{platformUsers.length}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Recruiters</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{recruiters.length}</p>
          </article>
        </section>
      )}

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
              Interns ({platformUsers.length})
            </h2>
            <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
              {platformUsers.length === 0 && <p className="text-slate-500 text-sm">No interns found.</p>}
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
              Recruiters ({recruiters.length})
            </h2>
            <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
              {recruiters.length === 0 && <p className="text-slate-500 text-sm">No recruiters found.</p>}
              {recruiters.map((u) => (
                <article key={u.id || u.email} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-semibold text-slate-900">{u.name || "Unnamed Recruiter"}</p>
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
