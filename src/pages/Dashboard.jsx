import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const quickLinks = [
    { to: "/users", label: "Users", icon: "👥", desc: "Manage users" },
    { to: "/users/add", label: "Add User", icon: "➕", desc: "Add new user" },
    { to: "/internships", label: "Internships", icon: "💼", desc: "View internships" },
    { to: "/tasks", label: "Tasks", icon: "✅", desc: "Track tasks" },
    { to: "/feedback", label: "Feedback", icon: "💬", desc: "View feedback" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Welcome to InternSync — your remote internship management hub
          </p>
        </div>
        {user && (
          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold">
              {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="text-sm">
              <p className="font-semibold text-slate-900">
                {user.name || "User"}{" "}
                <span className="ml-2 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  {user.role}
                </span>
              </p>
              <p className="text-slate-500">{user.email}</p>
            </div>
          </div>
        )}
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quickLinks.map(({ to, label, icon, desc }) => (
          <Link
            key={to}
            to={to}
            className="group relative block p-6 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <span className="text-2xl mb-3 block">{icon}</span>
            <h3 className="font-semibold text-slate-900">{label}</h3>
            <p className="text-sm text-slate-500 mt-1">{desc}</p>
            <span className="absolute top-6 right-6 text-teal-600 text-xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
