import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_DISPLAY_URL, AUTH_LOGIN_PATH, AUTH_REGISTER_PATH } from "../config";

function Auth() {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await login(email, password, role);
      } else {
        await signup({ name, email, password, role });
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Authentication failed. Check backend auth endpoints."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-slate-500 mb-6 text-center">
          Sign in to access your InternSync dashboard.
        </p>

        {/* Role selector */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
            Login as
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "admin", label: "Admin" },
              { id: "mentor", label: "Mentor" },
              { id: "user", label: "User" },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                  role === id
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-teal-500 hover:text-teal-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex mb-6 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
              mode === "login"
                ? "bg-white text-slate-900 shadow"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
              mode === "signup"
                ? "bg-white text-slate-900 shadow"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
              <p>{error}</p>
              <small className="block mt-1 opacity-80">
                Backend: {API_DISPLAY_URL} | Login: {AUTH_LOGIN_PATH} | Register: {AUTH_REGISTER_PATH}
              </small>
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border-2 border-slate-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                placeholder="Your full name"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border-2 border-slate-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border-2 border-slate-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              placeholder="Enter a password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-400 text-center">
          Auth is now backend-driven. If it fails, verify your Spring Boot auth
          endpoints and CORS configuration.
        </p>
        <p className="mt-2 text-center text-xs text-slate-400">
          <Link to="/" className="underline hover:text-slate-600">
            Back to landing
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Auth;

