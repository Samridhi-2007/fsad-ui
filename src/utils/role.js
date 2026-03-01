export function normalizeRole(rawRole) {
  const role = (rawRole || "").toString().trim().toLowerCase();

  if (role === "student" || role === "intern" || role === "candidate") return "user";
  if (role === "mentor" || role === "guide") return "mentor";
  if (role === "admin" || role === "administrator") return "admin";

  return role || "user";
}

export function hasAllowedRole(userRole, allowedRoles = []) {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  const normalizedUserRole = normalizeRole(userRole);
  return allowedRoles.map(normalizeRole).includes(normalizedUserRole);
}
