const RECRUITER_OPENINGS_KEY = "internsync_recruiter_openings";

function readAllRecruiterOpenings() {
  const raw = localStorage.getItem(RECRUITER_OPENINGS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAllRecruiterOpenings(openings) {
  localStorage.setItem(RECRUITER_OPENINGS_KEY, JSON.stringify(openings));
}

export function getRecruiterOpenings() {
  return readAllRecruiterOpenings();
}

export function getRecruiterOpeningsByEmail(email) {
  const normalized = (email || "").toLowerCase();
  return readAllRecruiterOpenings().filter(
    (opening) => (opening.recruiterEmail || "").toLowerCase() === normalized
  );
}

export function createRecruiterOpening({ recruiter, openingData }) {
  if (!recruiter?.email) return null;

  const record = {
    id: `recruiter-${Date.now()}`,
    title: openingData.title || "Internship Role",
    companyName: openingData.companyName || recruiter.companyName || "Company",
    location: openingData.location || "Remote",
    duration: openingData.duration || "3 months",
    stipend: openingData.stipend || "INR 15,000 / month",
    eligibility: openingData.eligibility || "",
    description: openingData.description || "",
    jobDescription: openingData.jobDescription || openingData.description || "",
    skills: openingData.skills || [],
    responsibilities: openingData.responsibilities || [],
    status: "Ongoing",
    recruiterEmail: recruiter.email,
    recruiterName: recruiter.name || "Recruiter",
    createdAt: new Date().toISOString(),
    source: "recruiter",
  };

  const all = readAllRecruiterOpenings();
  all.unshift(record);
  writeAllRecruiterOpenings(all);
  return record;
}

export function mergeInternshipsWithRecruiterOpenings(apiInternships = []) {
  const combined = [...readAllRecruiterOpenings(), ...apiInternships];
  const seen = new Set();

  return combined.filter((item) => {
    const key = String(item?.id || `${item?.title}-${item?.companyName}`);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
