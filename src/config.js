// If REACT_APP_API_URL is unset, we rely on CRA "proxy" (package.json) in dev.
export const API_BASE_URL = process.env.REACT_APP_API_URL || "";

// Shown in UI error messages (what backend you expect to be running).
export const API_DISPLAY_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8082";

// Override these in .env if your Spring Boot auth paths are different.
export const AUTH_LOGIN_PATH = process.env.REACT_APP_AUTH_LOGIN_PATH || "/auth/login";
export const AUTH_REGISTER_PATH =
  process.env.REACT_APP_AUTH_REGISTER_PATH || "/auth/register";
