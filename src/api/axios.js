// src/api/axios.js
import axios from "axios";
import { API_URL } from "../config";

const api = axios.create({
  baseURL: API_URL,
});

// 토큰 첨부
api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// 401이면 리프레시 시도
let isRefreshing = false;
let queue = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) throw error;

      if (isRefreshing) {
        // 다른 요청은 리프레시 완료까지 대기
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;
      try {
        const { data } = await axios.post(`${API_URL}/api/token/refresh/`, { refresh });
        const newAccess = data.access;
        localStorage.setItem("access", newAccess);
        // 큐 처리
        queue.forEach((p) => p.resolve(newAccess));
        queue = [];
        isRefreshing = false;

        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (e) {
        queue.forEach((p) => p.reject(e));
        queue = [];
        isRefreshing = false;
        // 토큰 만료 → 로그아웃
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        throw e;
      }
    }
    throw error;
  }
);

export default api;
