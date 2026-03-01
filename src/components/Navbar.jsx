import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { normalizeRole } from "../utils/role";

function Navbar() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const role = normalizeRole(user?.role);

  const adminLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/admin/users-mentors", label: "People" },
    { to: "/admin/internships", label: "Internships" },
    { to: "/users", label: "Users" },
    { to: "/tasks", label: "Tasks" },
    { to: "/feedback", label: "Feedback" },
  ];

  const userLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/user/internships", label: "Internships" },
    { to: "/user/mentors", label: "Mentors" },
    { to: "/tasks", label: "Tasks" },
    { to: "/profile", label: "Profile" },
  ];

  const mentorLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/mentor/mentees", label: "Mentees" },
    { to: "/mentor/community", label: "Community" },
    { to: "/feedback", label: "Feedback" },
    { to: "/profile", label: "Profile" },
  ];

  const guestLinks = [
    { to: "/auth", label: "Login" },
  ];

  const navLinks =
    !isAuthenticated ? guestLinks : role === "admin" ? adminLinks : role === "mentor" ? mentorLinks : userLinks;

  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 px-4 md:px-8 py-3 md:h-16 bg-gradient-to-r from-teal-700 to-teal-600 shadow-lg">
      <Link to="/dashboard" className="text-lg font-bold text-white tracking-tight hover:opacity-90 transition-opacity">
        InternSync
      </Link>
      <div className="flex items-center gap-1 flex-wrap">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              location.pathname === to ? "bg-white/25 text-white" : "text-white/90 hover:bg-white/15 hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white bg-white/15 rounded-md">
              {role}
            </span>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 text-sm text-white border border-white/50 rounded-md hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/" className="px-4 py-2 text-sm text-white border border-white/50 rounded-md hover:bg-white/10 transition-colors">
            Home
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
