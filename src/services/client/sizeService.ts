import api from '@/lib/api';

export async function findAllSizeActive() {
  const res = await api.get('/size');
  return res.data;
}

export async function findSizeById(id: string) {
  const res = await api.get(`/size/id?id=${id}`);

  return res.data;
}

export async function findSizeByName(name: string) {
  const res = await api.get(`/size/name?nameSize=${name}`);

  return res.data;
}
