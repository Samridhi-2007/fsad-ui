import { useEffect, useMemo, useState } from "react";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { sampleMentorProfiles } from "../../data/mentorProfiles";
import { mergeMentorsWithSamples } from "../../utils/mentorHelpers";
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
        if (err.response?.status === 403) {
          setError("");
          return;
        }
        setError(err.response?.data?.message || err.message || "Failed to load recruiters");
      })
      .finally(() => setLoading(false));
  }, []);

  const mentors = useMemo(() => {
    const liveMentors = users.filter((u) => normalizeRole(u?.role) === "recruiter");
    return mergeMentorsWithSamples(liveMentors, sampleMentorProfiles);
  }, [users]);

  if (loading) return <div className="text-slate-600">Loading recruiters...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Connect With Recruiters</h1>
        <p className="mt-1 text-slate-600">
          Explore recruiters, hiring teams, and industry contacts behind active openings.
        </p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
          <small className="block mt-1 opacity-80">Backend: {API_DISPLAY_URL}</small>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mentors.length === 0 && (
          <p className="text-sm text-slate-500 col-span-full">No recruiters found on the platform yet.</p>
        )}
        {mentors.map((mentor) => (
          <article key={mentor.id || mentor.email} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">{mentor.name || "Recruiter"}</h3>
                <p className="text-sm text-slate-600 mt-1">{mentor.email || "-"}</p>
              </div>
              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-700">
                Recruiter
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-800">
              {mentor.title || "Recruiter"}
              {mentor.company ? ` at ${mentor.company}` : ""}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {mentor.expertise || "Hiring support, opportunity updates, and role information."}
            </p>
            <button
              type="button"
              className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              Contact
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default UserMentors;
