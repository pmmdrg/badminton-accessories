'use client';
import { useQuery } from '@tanstack/react-query';
import {
  getAllAddressAdmin,
  getAddressByIdAdmin,
  getAllAddressByUserIdAdmin,
} from '@/services/admin/addressService';

export function useAddressAdmin(id?: string, userId?: string) {
  const getAll = useQuery({
    queryKey: ['admin-address'],
    queryFn: getAllAddressAdmin,
  });

  const getAllByUserId = useQuery({
    queryKey: ['id', userId],
    queryFn: () => getAllAddressByUserIdAdmin(userId || ''),
    enabled: !!userId,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getAddressByIdAdmin(id || ''),
    enabled: !!id,
  });

  return {
    getAll,
    getAllByUserId,
    getById,
  };
}
