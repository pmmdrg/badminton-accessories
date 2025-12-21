'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllSizeManager } from '@/services/manager/sizeService';

export function useSizeManager() {
  const getAll = useQuery({
    queryKey: ['manager-sizes'],
    queryFn: getAllSizeManager,
  });

  return {
    getAll,
  };
}
