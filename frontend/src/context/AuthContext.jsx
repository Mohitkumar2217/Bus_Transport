import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user + token on first render
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }

    setLoading(false);
  }, []);

  // FIXED login(token, user)
  const login = (tokenData, userData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);

    // attach token to axios globally
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenData}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
