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

export function getApplicationsByUser(email) {
  const normalized = (email || "").toLowerCase();
  return readAllApplications().filter((app) => (app.userEmail || "").toLowerCase() === normalized);
}

export function hasApplied(userEmail, internshipId) {
  return getApplicationsByUser(userEmail).some((app) => app.internshipId === internshipId);
}

export function applyToInternship({ userEmail, internship }) {
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
    appliedAt: new Date().toISOString(),
    status: "Applied",
  });

  writeAllApplications(all);
}
