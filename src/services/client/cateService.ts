import api from '@/lib/api';

export async function findAllCateActive() {
  const res = await api.get('/cate');
  return res.data;
}

export async function findCateById(id: string) {
  const res = await api.get(`/cate/id?id=${id}`);

  return res.data;
}

export async function findCateByName(name: string) {
  const res = await api.get(`/cate/name?nameCate=${name}`);

  return res.data;
}
