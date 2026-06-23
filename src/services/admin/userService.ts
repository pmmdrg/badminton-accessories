import api from '@/lib/api';

export async function getAllUserAdmin() {
  const res = await api.get('/admin/user-and-manager');
  return res.data;
}

export async function getAllActiveUser() {
  const res = await api.get('/admin/user/active');
  return res.data;
}

export async function getAllInactiveUser() {
  const res = await api.get('/admin/user/inactive');
  return res.data;
}

export async function lockUser(id: string) {
  const res = await api.put(`/admin/lock-user?id=${id}`);
  return res.data;
}

export async function restoreUser(id: string) {
  const res = await api.put(`/admin/restore-user?id=${id}`);
  return res.data;
}
