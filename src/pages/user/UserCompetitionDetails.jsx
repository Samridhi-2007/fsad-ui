import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { competitionItems } from "../../data/competitionData";

function UserCompetitionDetails() {
  const { competitionId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    teamName: "",
    resume: "",
    whyJoin: "",
  });

  const opportunity = useMemo(
    () => competitionItems.find((item) => String(item.id) === String(competitionId)) || null,
    [competitionId]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setFormData((prev) => ({ ...prev, resume: file?.name || "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (!opportunity) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          Opportunity details could not be found.
        </div>
        <Link to="/user/competitions" className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Back to competitions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-6 md:p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">{opportunity.type}</p>
        <h1 className="mt-2 text-2xl md:text-4xl font-extrabold text-slate-900">{opportunity.title}</h1>
        <p className="mt-3 text-sm md:text-base text-slate-600">{opportunity.description}</p>
      </header>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
        <section className="space-y-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">What This Opportunity Is About</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{opportunity.about}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Event Details</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">When</p>
                <p className="mt-2 font-medium text-slate-800">{opportunity.date}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Where</p>
                <p className="mt-2 font-medium text-slate-800">{opportunity.location}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Conducted By</p>
                <p className="mt-2 font-medium text-slate-800">{opportunity.conductedBy}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Prize / Benefit</p>
                <p className="mt-2 font-medium text-slate-800">{opportunity.prize}</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Eligibility</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{opportunity.eligibility}</p>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-slate-900">Apply for This Opportunity</h2>
          <p className="mt-1 text-sm text-slate-600">
            Share your details to register interest for this competition or student event.
          </p>

          {submitted && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              Your application has been submitted for this opportunity.
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="fullName">Full Name</label>
              <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="college">College</label>
              <input id="college" name="college" value={formData.college} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="teamName">Team Name</label>
              <input id="teamName" name="teamName" value={formData.teamName} onChange={handleChange} placeholder="Optional for solo events" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="resume">Upload Resume</label>
              <input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-cyan-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-cyan-700" />
              {formData.resume && <p className="mt-2 text-xs text-slate-500">Selected file: {formData.resume}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="whyJoin">Why do you want to join?</label>
              <textarea id="whyJoin" name="whyJoin" rows="5" value={formData.whyJoin} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-700">
              Apply Now
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UserCompetitionDetails;
