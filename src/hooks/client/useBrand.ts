'use client';
import { useQuery } from '@tanstack/react-query';
import {
  findAllBrandActive,
  findBrandById,
  findBrandByName,
} from '@/services/client/brandService';

export function useBrandClient(id?: string, name?: string) {
  const getAll = useQuery({
    queryKey: ['brands'],
    queryFn: findAllBrandActive,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => findBrandById(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameBrand', name],
    queryFn: () => findBrandByName(name || ''),
    enabled: !!name,
  });

  return {
    getAll,
    getById,
    getByName,
  };
}
