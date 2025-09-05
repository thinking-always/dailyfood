// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./account/Home";
import Login from "./account/Login";
import Profile from "./account/Profiles";
import SocialComplete from "./account/SocialComplete";
import Navbar from "./components/Narbar";

export default function App() {
  return (
    <>
    <Navbar />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* 소셜 로그인 이후 JWT 수령 페이지 */}
          <Route path="/social-complete" element={<SocialComplete />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}
