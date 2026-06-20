import api from '@/lib/api';
import axios from 'axios';

export async function loginUserGoogle(payload: { credential: string }) {
  const res = await api.post('/user/login/google', payload);

  return res.data;
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await api.post('/user/login', payload);

  return res.data;
}

export async function signUpUser(payload: {
  username: string;
  fullname: string;
  email: string;
  password: string;
}) {
  const res = await api.post('/user/signup', payload);

  return res.data;
}

export async function signUpAdmin(payload: {
  username: string;
  fullname: string;
  email: string;
  password: string;
}) {
  const res = await api.post('/admin/signup', payload);

  return res.data;
}

export async function signUpManager(payload: {
  username: string;
  fullname: string;
  email: string;
  password: string;
}) {
  const res = await api.post('/admin/signup-manager', payload);

  return res.data;
}

export async function logOut() {
  const refreshToken = localStorage.getItem('refresh_token');

  const logOutApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  });

  const res = await logOutApi.delete('/user/logout', {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  return res.data;
}

export async function requestResetPassword(payload: { email: string }) {
  const res = await api.post('/user/request-reset-password', payload);

  return res.data;
}

export async function changePassword(
  token: string,
  payload: { password: string },
) {
  const res = await api.post(`/user/reset-password?token=${token}`, payload);

  return res.data;
}
