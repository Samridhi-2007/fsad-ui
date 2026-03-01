import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authServices";

const AuthContext = createContext(null);
const STORAGE_USER_KEY = "internsync_user";
const STORAGE_TOKEN_KEY = "internsync_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_USER_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!user) {
      localStorage.removeItem(STORAGE_USER_KEY);
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    }
  }, [user]);

  const login = async (email, password, role = "user") => {
    const { user: loggedInUser, token } = await loginUser({ email, password, role });
    const u = { ...loggedInUser };
    setUser(u);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(u));
    if (token) {
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
    }
    return u;
  };

  const signup = async ({ name, email, password, role = "user" }) => {
    const { user: createdUser, token } = await registerUser({
      name,
      email,
      password,
      role,
    });
    const u = { ...createdUser };
    setUser(u);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(u));
    if (token) {
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
    }
    return u;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

