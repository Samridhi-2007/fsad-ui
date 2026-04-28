export function normalizeRole(rawRole) {
  const role = (rawRole || "").toString().trim().toLowerCase();

  if (role === "student" || role === "intern" || role === "candidate" || role === "user") return "intern";
  if (
    role === "mentor" ||
    role === "guide" ||
    role === "recruiter" ||
    role === "hr" ||
    role === "talent" ||
    role === "talent acquisition"
  ) {
    return "recruiter";
  }
  if (role === "admin" || role === "administrator") return "admin";

  return role || "intern";
}

export function hasAllowedRole(userRole, allowedRoles = []) {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  const normalizedUserRole = normalizeRole(userRole);
  return allowedRoles.map(normalizeRole).includes(normalizedUserRole);
}

export function getRoleApiPrefix(userRole) {
  const role = normalizeRole(userRole);
  if (role === "admin") return "/admin";
  if (role === "recruiter") return "/recruiter";
  return "/intern";
}
