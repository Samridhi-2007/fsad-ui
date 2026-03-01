import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { getApplicationsByUser } from "../services/applicationServices";
import { normalizeRole } from "../utils/role";

function Profile() {
  const { user } = useAuth();
  const role = normalizeRole(user?.role);

  const applications = useMemo(() => {
    return getApplicationsByUser(user?.email);
  }, [user?.email]);

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

      {role === "user" && (
        <section className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Application Tracking</h2>
          <div className="space-y-3">
            {applications.length === 0 && (
              <p className="text-sm text-slate-500">
                No applications yet. Apply from the Internships page.
              </p>
            )}
            {applications.map((app) => (
              <article key={app.id} className="p-3 border border-slate-200 rounded-lg">
                <p className="font-semibold text-slate-900">{app.internshipTitle}</p>
                <p className="text-sm text-slate-600">{app.companyName}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                    {app.status}
                  </span>
                  <span className="text-xs text-slate-500">
                    Applied: {new Date(app.appliedAt).toLocaleDateString()}
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
