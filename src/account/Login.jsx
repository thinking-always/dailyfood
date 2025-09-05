// src/pages/Login.jsx
import React from "react";
import { API_URL } from "../config";
import "./Login.css";

export default function Login() {
  const socialLogin = (provider) => {
    window.location.href = `${API_URL}/accounts/${provider}/login/?process=login`;
  };

  return (
    <div className="login-fullscreen bright">
      <div className="login-box bright">
        <h1 className="login-logo">🥗 오늘 뭐 먹지?</h1>
        <p className="login-text">소셜 계정으로 간편하게 로그인하세요</p>

        <div className="login-buttons">
          <button onClick={() => socialLogin("google")} className="btn wide btn-google">
            <img src="/icons/google.svg" alt="Google" className="btn-icon-circle" />
            Google 로그인
          </button>

          <button onClick={() => socialLogin("naver")} className="btn wide btn-naver">
            <img src="/icons/naver.svg" alt="Naver" className="btn-icon-circle" />
            Naver 로그인
          </button>

          <button onClick={() => socialLogin("kakao")} className="btn wide btn-kakao">
            <img src="/icons/kakao.svg" alt="Kakao" className="btn-icon-circle" />
            Kakao 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
