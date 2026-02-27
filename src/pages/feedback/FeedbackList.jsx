import { useEffect, useState } from "react";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    http
      .get("/feedbacks")
      .then((res) => {
        setFeedbacks(Array.isArray(res.data) ? res.data : []);
        setError(null);
      })
      .catch((err) => {
        setFeedbacks([]);
        setError(err.message || "Failed to load feedback");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Feedback</h1>
        <div className="w-10 h-10 border-2 border-slate-200 border-t-teal-600 rounded-full animate-spin mx-auto my-16" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Feedback</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
          <small className="block mt-2 opacity-80">
            Make sure the API is running at {API_DISPLAY_URL}
          </small>
        </div>
      )}

      {!error && feedbacks.length === 0 && (
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No feedback yet</h3>
          <p className="text-slate-600">Feedback from mentors will appear here.</p>
        </div>
      )}

      {!error && feedbacks.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-5">
          {feedbacks.map((f) => (
            <div key={f.id} className="bg-white rounded-xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-all">
              <p className="text-slate-700 leading-relaxed mb-4">{f.comment || f.message || "—"}</p>
              {(f.rating || f.author || f.createdAt) && (
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  {f.rating && <span>⭐ {f.rating}</span>}
                  {f.author && <span>{f.author}</span>}
                  {f.createdAt && <span>{new Date(f.createdAt).toLocaleDateString()}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbackList;
