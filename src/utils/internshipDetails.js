export function buildInternshipDetails(internship) {
  const title = internship?.title || "Internship Role";
  const company = internship?.companyName || "Company";
  const location = internship?.location || "Remote";
  const duration = internship?.duration || "3 to 6 months";

  return {
    eligibility:
      internship?.eligibility ||
      "Open to students in B.Tech, BCA, MCA, or related programs with basic coding knowledge and strong communication skills.",
    stipend: internship?.stipend || "INR 15,000 - 35,000 / month",
    jobDescription:
      internship?.jobDescription ||
      internship?.description ||
      `Work with the ${company} team as a ${title}, contribute to real product tasks, collaborate on feature delivery, and learn production workflows in a ${location} setup.`,
    responsibilities:
      internship?.responsibilities || [
        "Build and improve features with guidance from the engineering team.",
        "Write clean, readable code and participate in code reviews.",
        "Collaborate with recruiters, managers, designers, and teammates on assigned tasks.",
        "Share weekly progress updates and document your work clearly.",
      ],
    skills:
      internship?.skills || ["JavaScript", "React", "Node.js", "Problem Solving", "Git"],
    duration,
    location,
  };
}
