import { useEffect, useState } from "react";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    http
      .get("/tasks")
      .then((res) => {
        setTasks(Array.isArray(res.data) ? res.data : []);
        setError(null);
      })
      .catch((err) => {
        setTasks([]);
        setError(err.message || "Failed to load tasks");
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusClass = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("complete") || s.includes("done")) return "bg-green-100 text-green-800";
    if (s.includes("progress") || s.includes("ongoing")) return "bg-teal-100 text-teal-800";
    return "bg-amber-100 text-amber-800";
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Tasks</h1>
        <div className="w-10 h-10 border-2 border-slate-200 border-t-teal-600 rounded-full animate-spin mx-auto my-16" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Tasks</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
          <small className="block mt-2 opacity-80">
            Make sure the API is running at {API_DISPLAY_URL}
          </small>
        </div>
      )}

      {!error && tasks.length === 0 && (
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No tasks yet</h3>
          <p className="text-slate-600">Tasks will appear here when assigned.</p>
        </div>
      )}

      {!error && tasks.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl p-5 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="flex gap-4 items-start">
                <span className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-teal-100 text-teal-700 rounded-lg text-xl">✅</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{task.title || "—"}</h3>
                  <p className="text-sm text-slate-500">{task.description || task.deadline || "—"}</p>
                  {task.status && (
                    <span className={`inline-block mt-2 px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusClass(task.status)}`}>
                      {task.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
