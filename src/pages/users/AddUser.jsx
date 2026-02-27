import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../../api/http";

function AddUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    http
      .post("/users", user)
      .then(() => {
        navigate("/users");
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Failed to add user");
        setLoading(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Add User</h1>
        <Link to="/users" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
          ← Back to Users
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
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Adding…" : "Add User"}
            </button>
            <Link to="/users" className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
