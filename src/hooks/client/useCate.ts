'use client';

import {
  findAllCateActive,
  findCateById,
  findCateByName,
} from '@/services/client/cateService';
import { useQuery } from '@tanstack/react-query';

export function useCateClient(id?: string, name?: string) {
  const getAll = useQuery({
    queryKey: ['cates'],
    queryFn: findAllCateActive,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => findCateById(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameCate', name],
    queryFn: () => findCateByName(name || ''),
    enabled: !!name,
  });

  return {
    getAll,
    getById,
    getByName,
  };
}
