// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 필요 시 /api/me 등으로 가져오기
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(localStorage.getItem("refresh"));

  useEffect(() => {
    if (access) localStorage.setItem("access", access);
    else localStorage.removeItem("access");
  }, [access]);

  useEffect(() => {
    if (refresh) localStorage.setItem("refresh", refresh);
    else localStorage.removeItem("refresh");
  }, [refresh]);

  const value = { user, setUser, access, setAccess, refresh, setRefresh };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
