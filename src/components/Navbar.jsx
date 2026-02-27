import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/users", label: "Users" },
    { to: "/internships", label: "Internships" },
    { to: "/tasks", label: "Tasks" },
    { to: "/feedback", label: "Feedback" },
  ];

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
      <Link to="/" className="px-4 py-2 text-sm text-white border border-white/50 rounded-md hover:bg-white/10 transition-colors">
        Home
      </Link>
    </nav>
  );
}

export default Navbar;
