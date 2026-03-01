import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingNav from "./components/LandingNav";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/users/UserList";
import AddUser from "./pages/users/AddUser";
import Internshiplist from "./pages/internships/Internshiplist";
import TaskList from "./pages/tasks/TaskList";
import FeedbackList from "./pages/feedback/FeedbackList";
import Auth from "./pages/Auth";
import AdminUsersMentors from "./pages/admin/AdminUsersMentors";
import AdminInternshipOverview from "./pages/admin/AdminInternshipOverview";
import UserInternships from "./pages/user/UserInternships";
import UserMentors from "./pages/user/UserMentors";
import MentorMentees from "./pages/mentor/MentorMentees";
import MentorCommunity from "./pages/mentor/MentorCommunity";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <LandingNav /> : <Navbar />}
      <main className="min-h-[calc(100vh-64px)] p-6 md:p-8 bg-slate-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users-mentors"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsersMentors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/internships"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminInternshipOverview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/internships"
            element={
              <ProtectedRoute allowedRoles={["user", "student"]}>
                <UserInternships />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/mentors"
            element={
              <ProtectedRoute allowedRoles={["user", "student"]}>
                <UserMentors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/mentees"
            element={
              <ProtectedRoute allowedRoles={["mentor"]}>
                <MentorMentees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/community"
            element={
              <ProtectedRoute allowedRoles={["mentor"]}>
                <MentorCommunity />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internships"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Internshiplist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <FeedbackList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
