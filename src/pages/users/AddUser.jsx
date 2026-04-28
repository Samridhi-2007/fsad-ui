import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { http } from "../../api/http";

function AddUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ name: "", email: "", password: "", role: "INTERN" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultRole = useMemo(() => {
    const requestedRole = location.state?.defaultRole;
    return requestedRole === "RECRUITER" || requestedRole === "ADMIN" || requestedRole === "INTERN"
      ? requestedRole
      : "INTERN";
  }, [location.state]);

  useEffect(() => {
    setUser((prev) => ({ ...prev, role: defaultRole }));
  }, [defaultRole]);

  const currentRole = user.role;

  const roleCopy = {
    INTERN: {
      title: "Add Intern",
      subtitle: "Create a student-facing account that can browse internships and apply.",
      submit: "Create Intern",
    },
    RECRUITER: {
      title: "Add Recruiter",
      subtitle: "Create a recruiter account that can manage openings and review applicants.",
      submit: "Create Recruiter",
    },
    ADMIN: {
      title: "Add Admin",
      subtitle: "Create an administrator account with full platform access.",
      submit: "Create Admin",
    },
  };

  const copy = roleCopy[currentRole] || roleCopy.INTERN;
  const backTarget = "/admin/users-mentors";

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    http
      .post("/admin/users", { ...user, role: currentRole })
      .then(() => {
        navigate(backTarget);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Failed to add user");
        setLoading(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{copy.title}</h1>
          <p className="mt-1 text-sm text-slate-600">{copy.subtitle}</p>
        </div>
        <Link
          to={backTarget}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
        >
          Back to People
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              placeholder="Enter name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              placeholder="Enter password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
            <select
              id="role"
              name="role"
              className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              value={currentRole}
              onChange={handleChange}
            >
              <option value="INTERN">Intern</option>
              <option value="RECRUITER">Recruiter</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Saving..." : copy.submit}
            </button>
            <Link
              to={backTarget}
              className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
