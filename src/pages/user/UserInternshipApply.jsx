import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { http } from "../../api/http";
import { API_DISPLAY_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import {
  applyToInternship,
  canEditApplication,
  getApplicationByUserAndInternship,
  updateApplication,
} from "../../services/applicationServices";
import { mergeInternshipsWithRecruiterOpenings } from "../../services/recruiterOpeningsService";
import { buildInternshipDetails } from "../../utils/internshipDetails";
import { getRoleApiPrefix } from "../../utils/role";

function UserInternshipApply() {
  const { internshipId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = location.state?.mode === "edit";

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    college: "",
    degree: "",
    graduationYear: "",
    currentLocation: "",
    linkedInUrl: "",
    githubUrl: "",
    resumeFileName: "",
    coverLetter: "",
    availability: "Immediate",
  });

  useEffect(() => {
    let mounted = true;

    http
      .get(`${getRoleApiPrefix(user?.role)}/internships`)
      .then((res) => {
        if (!mounted) return;
        const apiInternships = Array.isArray(res.data) ? res.data : [];
        setInternships(mergeInternshipsWithRecruiterOpenings(apiInternships));
        setError("");
      })
      .catch((err) => {
        if (!mounted) return;
        setInternships(mergeInternshipsWithRecruiterOpenings([]));
        setError(err.response?.data?.message || err.message || "Failed to load internship details");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [user?.role]);

  const internship = useMemo(() => {
    const fromRouteState = location.state?.internship;
    if (fromRouteState && String(fromRouteState.id) === String(internshipId)) return fromRouteState;
    return internships.find((item) => String(item?.id) === String(internshipId)) || null;
  }, [internshipId, internships, location.state]);

  const existingApplication = useMemo(() => {
    if (!internship) return null;
    return getApplicationByUserAndInternship(user?.email, internship?.id);
  }, [internship, user?.email]);

  const details = useMemo(() => buildInternshipDetails(internship), [internship]);
  const isEditable = existingApplication ? canEditApplication(existingApplication.appliedAt) : true;
  const shouldDisableForm = Boolean(existingApplication) && (!isEditMode || !isEditable);

  useEffect(() => {
    if (!existingApplication) return;

    setFormData((prev) => ({
      ...prev,
      fullName: existingApplication.fullName || prev.fullName,
      email: existingApplication.email || prev.email,
      phone: existingApplication.phone || "",
      college: existingApplication.college || "",
      degree: existingApplication.degree || "",
      graduationYear: existingApplication.graduationYear || "",
      currentLocation: existingApplication.currentLocation || "",
      linkedInUrl: existingApplication.linkedInUrl || "",
      githubUrl: existingApplication.githubUrl || "",
      resumeFileName: existingApplication.resumeFileName || "",
      coverLetter: existingApplication.coverLetter || "",
      availability: existingApplication.availability || prev.availability,
    }));
    if (isEditMode && isEditable) {
      setSubmitMessage("Edit your application and save changes before the deadline.");
    } else {
      setSubmitMessage("You have already applied for this internship.");
    }
  }, [existingApplication, isEditMode, isEditable]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      resumeFileName: file?.name || "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!internship) return;

    if (existingApplication && isEditMode && isEditable) {
      updateApplication(existingApplication.id, formData);
      setSubmitMessage("Application updated successfully.");
      navigate("/profile", { replace: true });
      return;
    }

    if (existingApplication) return;

    applyToInternship({
      userEmail: user?.email,
      internship,
      applicationData: formData,
    });

    setSubmitMessage("Application submitted successfully.");
    navigate("/profile", { state: { applied: true } });
  };

  if (loading) return <div className="text-slate-600">Loading internship details...</div>;

  if (!internship) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p>Internship details could not be found.</p>
          {error && <small className="block mt-1 opacity-80">Backend: {API_DISPLAY_URL}</small>}
        </div>
        <Link to="/user/internships" className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Back to internships
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-teal-50 p-6 md:p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Application portal</p>
        <h1 className="mt-2 text-2xl md:text-4xl font-extrabold text-slate-900">{internship.title || "Internship Role"}</h1>
        <p className="mt-2 text-base text-slate-600">{internship.companyName || "Company"} | {details.location}</p>
      </header>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
          <p>{error}</p>
          <small className="block mt-1 opacity-80">Backend: {API_DISPLAY_URL}</small>
        </div>
      )}

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <section className="space-y-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Internship Overview</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Eligibility</p>
                <p className="mt-2 font-medium text-slate-800">{details.eligibility}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Stipend</p>
                <p className="mt-2 font-medium text-slate-800">{details.stipend}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Duration</p>
                <p className="mt-2 font-medium text-slate-800">{details.duration}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Work Mode</p>
                <p className="mt-2 font-medium text-slate-800">{details.location}</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Job Description</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{details.jobDescription}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Key Responsibilities</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {details.responsibilities.map((item) => (
                <li key={item} className="rounded-xl bg-slate-50 px-4 py-3">{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Preferred Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {details.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Apply Now</h2>
              <p className="mt-1 text-sm text-slate-600">Fill in your details like a real internship application.</p>
            </div>
            {existingApplication && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {isEditMode && isEditable ? "Editing application" : "Already applied"}
              </span>
            )}
          </div>

          {submitMessage && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              {submitMessage}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="fullName">Full Name</label>
              <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" value={formData.phone} onChange={handleChange} required disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="graduationYear">Graduation Year</label>
                <input id="graduationYear" name="graduationYear" value={formData.graduationYear} onChange={handleChange} required disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="college">College</label>
                <input id="college" name="college" value={formData.college} onChange={handleChange} required disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="degree">Degree</label>
                <input id="degree" name="degree" value={formData.degree} onChange={handleChange} required disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="currentLocation">Current Location</label>
              <input id="currentLocation" name="currentLocation" value={formData.currentLocation} onChange={handleChange} required disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="linkedInUrl">LinkedIn</label>
                <input id="linkedInUrl" name="linkedInUrl" value={formData.linkedInUrl} onChange={handleChange} placeholder="https://linkedin.com/in/your-profile" disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="githubUrl">GitHub / Portfolio</label>
                <input id="githubUrl" name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="https://github.com/username" disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="availability">Availability</label>
              <select id="availability" name="availability" value={formData.availability} onChange={handleChange} disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500">
                <option>Immediate</option>
                <option>Within 2 Weeks</option>
                <option>Within 1 Month</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="resume">Upload Resume</label>
              <input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-cyan-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-cyan-700" />
              {formData.resumeFileName && (
                <p className="mt-2 text-xs text-slate-500">Selected resume: {formData.resumeFileName}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="coverLetter">Why should we consider you?</label>
              <textarea id="coverLetter" name="coverLetter" rows="5" value={formData.coverLetter} onChange={handleChange} disabled={shouldDisableForm} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500" placeholder="Briefly describe your skills, projects, and why you are a good fit." />
            </div>

            <button
              type="submit"
              disabled={shouldDisableForm}
              className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                shouldDisableForm
                  ? "cursor-not-allowed bg-slate-200 text-slate-500"
                  : "bg-cyan-600 text-white hover:bg-cyan-700"
              }`}
            >
              {existingApplication ? (isEditMode && isEditable ? "Save Changes" : "Application Submitted") : "Submit Application"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UserInternshipApply;
