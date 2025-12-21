'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllSupplierManager } from '@/services/manager/supplierService';

export function useSupplierManager() {
  const getAll = useQuery({
    queryKey: ['manager-suppliers'],
    queryFn: getAllSupplierManager,
  });

  return {
    getAll,
  };
}
