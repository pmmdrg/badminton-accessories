import api from '@/lib/api';

export async function findAllColorActive() {
  const res = await api.get('/color');
  return res.data;
}

export async function findAllColorByName(name: string) {
  const res = await api.get(`/color/name?nameColor=${name}`);
  return res.data;
}

export async function findColorById(id: string) {
  const res = await api.get(`/color/id?id=${id}`);

  return res.data;
}
