// src/pages/Login.jsx
import { useContext, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { setAccess, setRefresh } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // SimpleJWT: /api/token/ (username/password)
      const { data } = await axios.post(`${API_URL}/api/token/`, {
        username,
        password,
      });
      setAccess(data.access);
      setRefresh(data.refresh);
      alert("로그인 성공!");
      window.location.href = "/profile";
    } catch (err) {
      alert("로그인 실패");
    }
  };

  // 소셜 로그인은 백엔드 allauth URL로 이동
  const socialLogin = (provider) => {
    window.location.href = `${API_URL}/accounts/${provider}/login/?process=login`;
  };

  return (
    <div style={{ maxWidth: 360 }}>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label><br/>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button style={{ marginTop: 12 }} type="submit">로그인</button>
      </form>

      <hr style={{ margin: "16px 0" }} />
      <h4>소셜 로그인</h4>
      <button onClick={()=>socialLogin("google")} style={{ display:"block", marginBottom:8 }}>Google로 계속하기</button>
      <button onClick={()=>socialLogin("naver")} style={{ display:"block", marginBottom:8 }}>Naver로 계속하기</button>
      <button onClick={()=>socialLogin("kakao")} style={{ display:"block", marginBottom:8 }}>Kakao로 계속하기</button>
    </div>
  );
}
