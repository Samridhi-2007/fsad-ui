import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import {
  applyToInternship,
  getApplicationsByUser,
  hasApplied,
} from "../../services/applicationServices";
import { normalizeRole } from "../../utils/role";

function UserDashboard() {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, setRefreshKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function loadDashboardData() {
      setLoading(true);
      setError("");

      const [internshipsRes, usersRes, tasksRes] = await Promise.allSettled([
        http.get("/internships"),
        http.get("/users"),
        http.get("/tasks"),
      ]);

      if (!mounted) return;

      if (internshipsRes.status === "fulfilled") {
        setInternships(Array.isArray(internshipsRes.value?.data) ? internshipsRes.value.data : []);
      } else {
        setInternships([]);
      }

      if (usersRes.status === "fulfilled") {
        setUsers(Array.isArray(usersRes.value?.data) ? usersRes.value.data : []);
      } else {
        setUsers([]);
      }

      if (tasksRes.status === "fulfilled") {
        setTasks(Array.isArray(tasksRes.value?.data) ? tasksRes.value.data : []);
      } else {
        setTasks([]);
      }

      const failures = [internshipsRes, usersRes, tasksRes].filter((r) => r.status === "rejected");
      if (failures.length > 0) {
        setError("Some dashboard data could not be loaded. Check backend endpoints.");
      }

      setLoading(false);
    }

    loadDashboardData();
    return () => {
      mounted = false;
    };
  }, []);

  const mentors = useMemo(
    () => users.filter((u) => normalizeRole(u?.role) === "mentor"),
    [users]
  );

  const userApplications = getApplicationsByUser(user?.email);
  const internshipsPreview = internships.slice(0, 8);
  const mentorsPreview = mentors.slice(0, 6);
  const tasksPreview = tasks.slice(0, 8);

  const handleApply = (internship) => {
    applyToInternship({ userEmail: user?.email, internship });
    setRefreshKey((prev) => prev + 1);
  };

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
            This dashboard shows a live overview of internships, mentors, and tasks from your backend.
          </p>

          <div className="mt-6 grid sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-cyan-100 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
              <p className="mt-1 text-sm font-bold text-slate-900">User</p>
            </div>
            <div className="rounded-xl border border-cyan-100 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Internships</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{internships.length}</p>
            </div>
            <div className="rounded-xl border border-cyan-100 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Mentors</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{mentors.length}</p>
            </div>
            <div className="rounded-xl border border-cyan-100 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">My Applications</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{userApplications.length}</p>
            </div>
          </div>
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
                <button
                  type="button"
                  onClick={() => handleApply(item)}
                  disabled={applied}
                  className={`mt-4 w-full rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    applied
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "bg-cyan-600 text-white hover:bg-cyan-700"
                  }`}
                >
                  {applied ? "Applied" : "Quick Apply"}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Mentors</h2>
            <p className="text-sm text-slate-600">All mentors available to guide you.</p>
          </div>
          <Link to="/user/mentors" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            View all mentors
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {mentorsPreview.length === 0 && (
            <p className="text-sm text-slate-500 col-span-full">No mentors found.</p>
          )}
          {mentorsPreview.map((mentor) => (
            <article key={mentor.id || mentor.email} className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/60 to-white p-4 shadow-sm">
              <h3 className="font-bold text-slate-900">{mentor.name || "Mentor"}</h3>
              <p className="mt-1 text-sm text-slate-600">{mentor.email || "-"}</p>
              <p className="mt-3 text-sm text-slate-700">
                <span className="font-semibold">Role:</span> Mentor
              </p>
              <div className="mt-4">
                <Link
                  to="/user/mentors"
                  className="inline-flex rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  Connect
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Tasks</h2>
            <p className="text-sm text-slate-600">All recent tasks from the task section.</p>
          </div>
          <Link to="/tasks" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            View all tasks
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {tasksPreview.length === 0 && (
            <p className="text-sm text-slate-500 col-span-full">No tasks found.</p>
          )}
          {tasksPreview.map((task) => (
            <article key={task.id || task.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 leading-5">{task.title || "Task"}</h3>
              <p className="mt-2 text-xs text-slate-500 line-clamp-3">
                {task.description || task.deadline || "No description"}
              </p>
              {task.status && (
                <span className="inline-block mt-3 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {task.status}
                </span>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
