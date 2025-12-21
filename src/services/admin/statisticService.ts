import api from '@/lib/api';

export async function generalStatistic() {
  const res = await api.get('/admin/statistic/general-statistic');
  return res.data;
}

export async function statisticByStatus() {
  const res = await api.get('/admin/statistic/by-status');
  return res.data;
}

export async function statisticByTime() {
  const res = await api.get('/admin/statistic/by-time');
  return res.data;
}

export async function getTopSellingProductItem() {
  const res = await api.get('/admin/statistic/top-selling');
  return res.data;
}

export async function statisticByBrand() {
  const res = await api.get('/admin/statistic/by-brand');
  return res.data;
}

export async function statisticByCate() {
  const res = await api.get('/admin/statistic/by-cate');
  return res.data;
}
