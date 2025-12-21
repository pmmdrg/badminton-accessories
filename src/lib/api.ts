import { DecodePayload } from './../types/decodeAuthPayload';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface FailedRequest {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

const refreshApi = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8080',
});

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    if (error.status === 401 && !originalReq._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalReq.headers['Authorization'] = 'Bearer ' + token;
          return api(originalReq);
        });
      }

      originalReq._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
          const decode = jwtDecode<DecodePayload>(accessToken);

          console.log(
            `prepare to get new access token for role ${decode.role} with refresh token ${refreshToken}`
          );

          const { data } = await refreshApi.get(`/${decode.role}/renew`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });

          console.log(`new access token: ${data}`);

          localStorage.setItem('access_token', data.data.accessToken);
          localStorage.setItem('refresh_token', data.data.refreshToken);

          processQueue(null, data.data.accessToken);

          originalReq.headers.Authorization = 'Bearer ' + data.data.accessToken;
        } else {
          processQueue('access token null', null);
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject('access token null');
        }

        return api(originalReq);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
