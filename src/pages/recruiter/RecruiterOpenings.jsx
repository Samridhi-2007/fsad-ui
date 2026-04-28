import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  createRecruiterOpening,
  getRecruiterOpeningsByEmail,
} from "../../services/recruiterOpeningsService";

function RecruiterOpenings() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "Remote",
    duration: "",
    stipend: "",
    eligibility: "",
    description: "",
    jobDescription: "",
    skills: "",
    responsibilities: "",
  });

  const openings = getRecruiterOpeningsByEmail(user?.email);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createRecruiterOpening({
      recruiter: user,
      openingData: {
        ...formData,
        skills: formData.skills.split(",").map((item) => item.trim()).filter(Boolean),
        responsibilities: formData.responsibilities
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      },
    });

    setMessage("Opening posted successfully.");
    setFormData({
      title: "",
      companyName: "",
      location: "Remote",
      duration: "",
      stipend: "",
      eligibility: "",
      description: "",
      jobDescription: "",
      skills: "",
      responsibilities: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Recruiter Openings</h1>
        <p className="mt-1 text-slate-600">
          Post internship openings so users can view and apply from the platform.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_0.95fr] gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Post a New Opening</h2>
          <p className="mt-1 text-sm text-slate-600">Add role details similar to a real-world internship posting.</p>

          {message && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              {message}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="title">Role Title</label>
                <input id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="companyName">Company Name</label>
                <input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="location">Location</label>
                <input id="location" name="location" value={formData.location} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="duration">Duration</label>
                <input id="duration" name="duration" value={formData.duration} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="stipend">Stipend</label>
                <input id="stipend" name="stipend" value={formData.stipend} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="eligibility">Eligibility</label>
              <textarea id="eligibility" name="eligibility" rows="3" value={formData.eligibility} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="description">Short Description</label>
              <textarea id="description" name="description" rows="3" value={formData.description} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="jobDescription">Job Description</label>
              <textarea id="jobDescription" name="jobDescription" rows="4" value={formData.jobDescription} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="skills">Skills</label>
              <input id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, SQL" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="responsibilities">Responsibilities</label>
              <textarea id="responsibilities" name="responsibilities" rows="4" value={formData.responsibilities} onChange={handleChange} placeholder="One responsibility per line" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500" />
            </div>

            <button type="submit" className="w-full rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700">
              Post Opening
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Your Posted Openings</h2>
          <div className="mt-5 space-y-4">
            {openings.length === 0 && (
              <p className="text-sm text-slate-500">No openings posted yet.</p>
            )}
            {openings.map((opening) => (
              <article key={opening.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{opening.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{opening.companyName}</p>
                  </div>
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                    {opening.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{opening.description}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <p>Location: {opening.location}</p>
                  <p>Stipend: {opening.stipend}</p>
                  <p>Duration: {opening.duration}</p>
                  <p>Posted: {new Date(opening.createdAt).toLocaleDateString()}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default RecruiterOpenings;
