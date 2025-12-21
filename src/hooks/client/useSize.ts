'use client';

import {
  findAllSizeActive,
  findSizeById,
  findSizeByName,
} from '@/services/client/sizeService';
import { useQuery } from '@tanstack/react-query';

export function useSizeClient(id?: string, name?: string) {
  const getAll = useQuery({
    queryKey: ['sizes'],
    queryFn: findAllSizeActive,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => findSizeById(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameSize', name],
    queryFn: () => findSizeByName(name || ''),
    enabled: !!name,
  });

  return {
    getAll,
    getById,
    getByName,
  };
}
