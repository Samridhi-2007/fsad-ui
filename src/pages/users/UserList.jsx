import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    http
      .get("/users")
      .then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
        setError(null);
      })
      .catch((err) => {
        setUsers([]);
        setError(err.message || "Failed to load users");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Users</h1>
        <div className="w-10 h-10 border-2 border-slate-200 border-t-teal-600 rounded-full animate-spin mx-auto my-16" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <Link to="/users/add" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors">
          Add User
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
          <small className="block mt-2 opacity-80">
            Make sure the API is running at {API_DISPLAY_URL}
          </small>
        </div>
      )}

      {!error && users.length === 0 && (
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No users yet</h3>
          <p className="text-slate-600 mb-4">Add your first user to get started.</p>
          <Link to="/users/add" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors">
            Add User
          </Link>
        </div>
      )}

      {!error && users.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl p-5 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="flex gap-4 items-start">
                <span className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-teal-100 text-teal-700 rounded-lg font-semibold text-lg">
                  {user.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{user.name || "—"}</h3>
                  <p className="text-sm text-slate-500">{user.email || "—"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
