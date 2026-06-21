import { DecodePayload } from './../types/decodeAuthPayload';
import { jwtDecode } from 'jwt-decode';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;

let queue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
});

const processQueue = (error: unknown, token: string | null = null) => {
  queue.forEach((prom) => {
    if (error || !token) prom.reject(error);
    else prom.resolve(token);
  });

  queue = [];
};

const getAccessToken = () => localStorage.getItem('access_token');

const getRefreshToken = () => localStorage.getItem('refresh_token');

const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalReq = err.config as RetryRequestConfig;

    if (err.response?.status !== 401 || originalReq._retry) {
      return Promise.reject(err);
    }

    if (isRefreshing) {
      return new Promise<string>(function (resolve, reject) {
        queue.push({ resolve, reject });
      }).then((token) => {
        originalReq.headers.Authorization = `Bearer ${token}`;

        return api(originalReq);
      });
    }

    originalReq._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();

      if (!refreshToken) throw new Error('No refresh token');

      let decoded: DecodePayload;

      try {
        decoded = jwtDecode<DecodePayload>(refreshToken);
      } catch {
        throw new Error('Invalid refresh token');
      }

      const { data } = await refreshApi.get(`/${decoded.role}/renew`, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      const newAccessToken = data?.data?.access_token;
      const newRefreshToken = data?.data?.refresh_token;

      setTokens(newAccessToken, newRefreshToken);

      processQueue(null, newAccessToken);

      originalReq.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalReq);
    } catch (err) {
      processQueue(err, null);

      logout();
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
