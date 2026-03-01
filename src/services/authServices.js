import { http } from "../api/http";
import { AUTH_LOGIN_PATH, AUTH_REGISTER_PATH } from "../config";
import { normalizeRole } from "../utils/role";

function getToken(data) {
  return (
    data?.token ||
    data?.accessToken ||
    data?.jwt ||
    data?.data?.token ||
    data?.data?.accessToken ||
    null
  );
}

function getUserFromResponse(data) {
  const candidate = data?.user || data?.data?.user || data || {};
  if (typeof candidate !== "object" || candidate === null) return {};
  return candidate;
}

export async function loginUser({ email, password, role }) {
  const payload = { email, password, role };
  const response = await http.post(AUTH_LOGIN_PATH, payload);
  const data = response?.data;
  const userData = getUserFromResponse(data);
  const token = getToken(data);

  const user = {
    ...userData,
    email: userData.email || email,
    role: normalizeRole(userData.role || role),
    name: userData.name || email.split("@")[0] || "User",
  };

  return { user, token };
}

export async function registerUser({ name, email, password, role }) {
  const payload = { name, email, password, role };
  const response = await http.post(AUTH_REGISTER_PATH, payload);
  const data = response?.data;
  const userData = getUserFromResponse(data);
  const token = getToken(data);

  const user = {
    ...userData,
    email: userData.email || email,
    role: normalizeRole(userData.role || role),
    name: userData.name || name || email.split("@")[0] || "User",
  };

  return { user, token };
}
