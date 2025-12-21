'use client';

import {
  findAllColorActive,
  findColorById,
  findAllColorByName,
} from '@/services/client/colorService';
import { useQuery } from '@tanstack/react-query';

export function useColorClient(id?: string, name?: string) {
  const getAll = useQuery({
    queryKey: ['colors'],
    queryFn: findAllColorActive,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => findColorById(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameColor', name],
    queryFn: () => findAllColorByName(name || ''),
    enabled: !!name,
  });

  return {
    getAll,
    getById,
    getByName,
  };
}
