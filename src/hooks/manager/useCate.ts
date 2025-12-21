'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllCateManager } from '@/services/manager/cateService';

export function useCateManager() {
  const getAll = useQuery({
    queryKey: ['manager-cates'],
    queryFn: getAllCateManager,
  });

  return {
    getAll,
  };
}
