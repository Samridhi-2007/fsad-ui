import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("internsync_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = (email, role = "user") => {
    const name = email.split("@")[0] || "User";
    const u = { email, role, name };
    setUser(u);
    localStorage.setItem("internsync_user", JSON.stringify(u));
  };

  const signup = (email, role = "user") => {
    login(email, role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("internsync_user");
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

