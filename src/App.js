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
            path="/users"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internships"
            element={
              <ProtectedRoute>
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
