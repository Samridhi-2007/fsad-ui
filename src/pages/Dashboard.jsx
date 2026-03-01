import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { normalizeRole } from "../utils/role";
import { getApplicationsByUser } from "../services/applicationServices";
import UserDashboard from "./user/UserDashboard";

function Dashboard() {
  const { user } = useAuth();
  const role = normalizeRole(user?.role);
  const userApplications = getApplicationsByUser(user?.email);

  if (role === "user") {
    return <UserDashboard />;
  }

  const adminCards = [
    {
      to: "/admin/users-mentors",
      title: "Users and Mentors",
      desc: "View all users and mentors with their details.",
    },
    {
      to: "/admin/internships",
      title: "Internship Overview",
      desc: "Track all ongoing and expired internships.",
    },
    {
      to: "/users",
      title: "Manage Users",
      desc: "Create and manage platform users.",
    },
  ];

  const mentorCards = [
    {
      to: "/mentor/mentees",
      title: "My Mentees",
      desc: "View users and follow their progress.",
    },
    {
      to: "/mentor/community",
      title: "Mentor Community",
      desc: "Join communities and collaborate with mentors.",
    },
    {
      to: "/profile",
      title: "Mentor Profile",
      desc: "View your profile and account details.",
    },
  ];

  const cards = role === "admin" ? adminCards : mentorCards;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 capitalize">
          {role} Dashboard
        </h1>
        <p className="mt-2 text-slate-600">
          Welcome {user?.name || "User"}. You are logged in as {role}.
        </p>

        <div className="mt-5 grid sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 break-all">{user?.email || "-"}</p>
          </div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 capitalize">{role}</p>
          </div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">User Applications</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {role === "user" ? userApplications.length : "N/A"}
            </p>
          </div>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="block bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <h3 className="font-semibold text-slate-900">{card.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
