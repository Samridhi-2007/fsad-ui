import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/authServices";

const AuthContext = createContext(null);
const STORAGE_USER_KEY = "internsync_user";
const STORAGE_TOKEN_KEY = "internsync_token";

export function AuthProvider({ children }) {
  const storedUser = localStorage.getItem(STORAGE_USER_KEY);
  const [user, setUser] = useState(() => {
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });
  const [authReady, setAuthReady] = useState(() => !storedUser);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem(STORAGE_USER_KEY);
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    }
  }, [user]);

  useEffect(() => {
    const hasStoredUser = !!localStorage.getItem(STORAGE_USER_KEY);
    if (!hasStoredUser) {
      setAuthReady(true);
      return;
    }

    let cancelled = false;

    getCurrentUser()
      .then((currentUser) => {
        if (cancelled) return;
        setUser(currentUser);
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(currentUser));
      })
      .catch(() => {
        if (cancelled) return;
        setUser(null);
        localStorage.removeItem(STORAGE_USER_KEY);
        localStorage.removeItem(STORAGE_TOKEN_KEY);
      })
      .finally(() => {
        if (!cancelled) {
          setAuthReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email, password) => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    const { user: loggedInUser, token } = await loginUser({ email, password });
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
    authReady,
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

