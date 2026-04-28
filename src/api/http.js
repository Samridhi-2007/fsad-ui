import axios from "axios";
import { API_BASE_URL } from "../config";

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const requestUrl = `${config.baseURL || ""}${config.url || ""}`;
  const isAuthRequest = requestUrl.includes("/auth/");
  const token = localStorage.getItem("internsync_token");

  if (isAuthRequest && config.headers?.Authorization) {
    delete config.headers.Authorization;
  }

  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
