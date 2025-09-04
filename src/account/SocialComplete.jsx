// src/pages/SocialComplete.jsx
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SocialComplete() {
  const { setAccess, setRefresh } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    // 해시에서 토큰 추출 (#access=...&refresh=...)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access = params.get("access");
    const refresh = params.get("refresh");
    if (access && refresh) {
      setAccess(access);
      setRefresh(refresh);
      nav("/profile");
    } else {
      nav("/login");
    }
  }, [nav, setAccess, setRefresh]);

  return <p>소셜 로그인 처리 중...</p>;
}
