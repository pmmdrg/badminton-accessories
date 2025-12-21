'use client';

import {
  findAllProductActive,
  findProductById,
  findProductByName,
} from '@/services/client/productService';
import { useQuery } from '@tanstack/react-query';

export function useProductClient(id?: string, name?: string) {
  const getAll = useQuery({
    queryKey: ['products'],
    queryFn: findAllProductActive,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => findProductById(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameProduct', name],
    queryFn: () => findProductByName(name || ''),
    enabled: !!name,
  });

  return {
    getAll,
    getById,
    getByName,
  };
}
