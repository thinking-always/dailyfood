// src/pages/SocialComplete.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function SocialComplete() {
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // ✅ 쿠키로 인증된 상태인지 확인
        await api.get("/api/me/");
        nav("/"); // 홈으로 이동
      } catch (err) {
        console.error("로그인 확인 실패:", err);
        nav("/login");
      }
    })();
  }, [nav]);

  return <p>소셜 로그인 처리 중...</p>;
}
