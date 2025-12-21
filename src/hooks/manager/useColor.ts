'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllColorManager } from '@/services/manager/colorService';

export function useColorManager() {
  const getAll = useQuery({
    queryKey: ['manager-colors'],
    queryFn: getAllColorManager,
  });

  return {
    getAll,
  };
}
