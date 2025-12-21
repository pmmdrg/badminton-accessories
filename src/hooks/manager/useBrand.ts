'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllBrandManager } from '@/services/manager/brandService';

export function useBrandManager() {
  const getAll = useQuery({
    queryKey: ['manager-brands'],
    queryFn: getAllBrandManager,
  });

  return {
    getAll,
  };
}
