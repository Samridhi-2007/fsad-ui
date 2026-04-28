const APPLICATIONS_KEY = "internsync_applications";

function readAllApplications() {
  const raw = localStorage.getItem(APPLICATIONS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAllApplications(applications) {
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
}

export function getApplicationEditDeadline(appliedAt) {
  const appliedDate = new Date(appliedAt);
  if (Number.isNaN(appliedDate.getTime())) return null;

  const deadline = new Date(appliedDate);
  deadline.setDate(deadline.getDate() + 7);
  return deadline;
}

export function canEditApplication(appliedAt) {
  const deadline = getApplicationEditDeadline(appliedAt);
  if (!deadline) return false;
  return deadline >= new Date();
}

export function getApplicationsByUser(email) {
  const normalized = (email || "").toLowerCase();
  return readAllApplications().filter((app) => (app.userEmail || "").toLowerCase() === normalized);
}

export function getApplicationsByRecruiter(email) {
  const normalized = (email || "").toLowerCase();
  return readAllApplications().filter(
    (app) => (app.recruiterEmail || "").toLowerCase() === normalized
  );
}

export function getApplicationByUserAndInternship(userEmail, internshipId) {
  return readAllApplications().find(
    (app) =>
      (app.userEmail || "").toLowerCase() === (userEmail || "").toLowerCase() &&
      String(app.internshipId) === String(internshipId)
  );
}

export function hasApplied(userEmail, internshipId) {
  return getApplicationsByUser(userEmail).some(
    (app) => String(app.internshipId) === String(internshipId)
  );
}

export function applyToInternship({ userEmail, internship, applicationData = {} }) {
  const all = readAllApplications();
  const internshipId = internship?.id;
  if (!userEmail || internshipId === undefined || internshipId === null) return;

  const alreadyExists = all.some(
    (app) =>
      (app.userEmail || "").toLowerCase() === userEmail.toLowerCase() &&
      app.internshipId === internshipId
  );

  if (alreadyExists) return;

  all.push({
    id: Date.now(),
    userEmail,
    internshipId,
    internshipTitle: internship?.title || internship?.companyName || "Internship",
    companyName: internship?.companyName || internship?.title || "Company",
    recruiterEmail: internship?.recruiterEmail || "",
    recruiterName: internship?.recruiterName || "",
    fullName: applicationData.fullName || "",
    email: applicationData.email || userEmail || "",
    phone: applicationData.phone || "",
    college: applicationData.college || "",
    degree: applicationData.degree || "",
    graduationYear: applicationData.graduationYear || "",
    currentLocation: applicationData.currentLocation || "",
    linkedInUrl: applicationData.linkedInUrl || "",
    githubUrl: applicationData.githubUrl || "",
    resumeFileName: applicationData.resumeFileName || "",
    coverLetter: applicationData.coverLetter || "",
    availability: applicationData.availability || "",
    appliedAt: new Date().toISOString(),
    status: "Applied",
  });

  writeAllApplications(all);
}

export function updateApplication(applicationId, applicationData = {}) {
  const all = readAllApplications();
  const updated = all.map((app) => {
    if (String(app.id) !== String(applicationId)) return app;

    return {
      ...app,
      fullName: applicationData.fullName || app.fullName || "",
      email: applicationData.email || app.email || "",
      phone: applicationData.phone || app.phone || "",
      college: applicationData.college || app.college || "",
      degree: applicationData.degree || app.degree || "",
      graduationYear: applicationData.graduationYear || app.graduationYear || "",
      currentLocation: applicationData.currentLocation || app.currentLocation || "",
      linkedInUrl: applicationData.linkedInUrl || app.linkedInUrl || "",
      githubUrl: applicationData.githubUrl || app.githubUrl || "",
      resumeFileName: applicationData.resumeFileName || app.resumeFileName || "",
      coverLetter: applicationData.coverLetter || app.coverLetter || "",
      availability: applicationData.availability || app.availability || "",
      updatedAt: new Date().toISOString(),
    };
  });

  writeAllApplications(updated);
}

export function removeApplication(applicationId) {
  const all = readAllApplications();
  const filtered = all.filter((app) => String(app.id) !== String(applicationId));
  writeAllApplications(filtered);
}
