import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Navbar.css";

export default function Navbar() {
  const nav = useNavigate();
  const [me, setMe] = useState(null); // 사용자 정보 (로그인 상태 확인용)

  // 마운트 시 로그인 상태 확인
  useEffect(() => {
    let ignore = false;
    api.get("/api/me/")
      .then(res => { if (!ignore) setMe(res.data); })
      .catch(() => { if (!ignore) setMe(null); });

    return () => { ignore = true; };
  }, []);

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 (쿠키 삭제/세션 정리)
      await api.post("/api/logout/");
    } catch (_) {
      // 실패해도 무시
    }

    // 프론트 상태 초기화
    setMe(null);
    nav("/login");
  };

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 16px",
      borderBottom: "1px solid #eee"
    }}>
      <div>
        <Link to="/" style={{ fontWeight: 700, textDecoration: "none" }}>
          Recipe Bank
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {me ? (
          <>
            <span style={{ opacity: 0.8 }}>{me.username}</span>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
