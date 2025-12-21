'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllSizeTypeManager } from '@/services/manager/sizeTypeService';

export function useSizeTypeManager() {
  const getAll = useQuery({
    queryKey: ['manager-size-types'],
    queryFn: getAllSizeTypeManager,
  });

  return {
    getAll,
  };
}
