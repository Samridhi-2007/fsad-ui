import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  canEditApplication,
  getApplicationEditDeadline,
  getApplicationsByUser,
  removeApplication,
} from "../services/applicationServices";
import { normalizeRole } from "../utils/role";

const applicationFlowSteps = [
  "Received",
  "Under Review",
  "Reviewed",
  "Selected for Interview",
];

function getApplicationStageIndex(status) {
  const normalized = (status || "").toLowerCase();

  if (normalized.includes("interview")) return 3;
  if (normalized.includes("reviewed")) return 2;
  if (normalized.includes("under review")) return 1;
  if (normalized.includes("received") || normalized.includes("applied")) return 0;

  return 0;
}

function getApplicationStageLabel(status) {
  return applicationFlowSteps[getApplicationStageIndex(status)];
}

function Profile() {
  const { user } = useAuth();
  const role = normalizeRole(user?.role);
  const [, setRefreshKey] = useState(0);

  const applications = getApplicationsByUser(user?.email);

  const handleRemoveApplication = (applicationId) => {
    removeApplication(applicationId);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-1 text-slate-600">Manage your personal details and activity summary.</p>
      </header>

      <section className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Profile Details</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Name</p>
            <p className="font-semibold text-slate-900">{user?.name || "-"}</p>
          </div>
          <div>
            <p className="text-slate-500">Email</p>
            <p className="font-semibold text-slate-900">{user?.email || "-"}</p>
          </div>
          <div>
            <p className="text-slate-500">Role</p>
            <p className="font-semibold text-slate-900 capitalize">{role}</p>
          </div>
        </div>
      </section>

      {role === "intern" && (
        <section className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Application Tracking</h2>
          <div className="space-y-3">
            {applications.length === 0 && (
              <p className="text-sm text-slate-500">
                No applications yet. Apply from the Internships page.
              </p>
            )}
            {applications.map((app) => (
              <article key={app.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{app.internshipTitle}</p>
                    <p className="text-sm text-slate-600">{app.companyName}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/user/internships/${app.internshipId}/apply`}
                      state={{ mode: "edit" }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                        canEditApplication(app.appliedAt)
                          ? "bg-cyan-600 text-white hover:bg-cyan-700"
                          : "cursor-not-allowed bg-slate-200 text-slate-500 pointer-events-none"
                      }`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemoveApplication(app.id)}
                      className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">Application Progress</p>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      {getApplicationStageLabel(app.status)}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    {applicationFlowSteps.map((step, index) => {
                      const currentIndex = getApplicationStageIndex(app.status);
                      const isCompleted = index <= currentIndex;

                      return (
                        <div
                          key={step}
                          className={`rounded-lg border px-3 py-3 text-center text-xs font-semibold ${
                            isCompleted
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 bg-white text-slate-400"
                          }`}
                        >
                          {step}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-500">
                    Applied: {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-slate-500">
                    Edit before: {getApplicationEditDeadline(app.appliedAt)?.toLocaleDateString() || "-"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Profile;
