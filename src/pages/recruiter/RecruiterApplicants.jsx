import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { getApplicationsByRecruiter } from "../../services/applicationServices";

function RecruiterApplicants() {
  const { user } = useAuth();
  const applications = useMemo(() => getApplicationsByRecruiter(user?.email), [user?.email]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Applicants</h1>
        <p className="mt-1 text-slate-600">
          Review users who applied to openings posted from your recruiter account.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Incoming Applications</h2>
        <div className="mt-5 space-y-4">
          {applications.length === 0 && (
            <p className="text-sm text-slate-500">No applications received yet.</p>
          )}
          {applications.map((app) => (
            <article key={app.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{app.fullName || "Applicant"}</h3>
                  <p className="mt-1 text-sm text-slate-600">{app.email || app.userEmail || "-"}</p>
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  {app.status}
                </span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <p><span className="font-medium text-slate-800">Opening:</span> {app.internshipTitle}</p>
                <p><span className="font-medium text-slate-800">Company:</span> {app.companyName}</p>
                <p><span className="font-medium text-slate-800">Phone:</span> {app.phone || "-"}</p>
                <p><span className="font-medium text-slate-800">College:</span> {app.college || "-"}</p>
                <p><span className="font-medium text-slate-800">Degree:</span> {app.degree || "-"}</p>
                <p><span className="font-medium text-slate-800">Resume:</span> {app.resumeFileName || "-"}</p>
              </div>
              {app.coverLetter && (
                <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">Why this candidate applied</p>
                  <p className="mt-1">{app.coverLetter}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RecruiterApplicants;
