import api from '@/lib/api';

export async function getAllSupplierManager() {
  const res = await api.get('/manager/supplier');
  return res.data;
}
