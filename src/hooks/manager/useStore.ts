'use client';
import { useQuery } from '@tanstack/react-query';
import { getStoreInfoManager } from '@/services/manager/storeService';

export function useStoreManager() {
  const getInfo = useQuery({
    queryKey: ['manager-store-info'],
    queryFn: getStoreInfoManager,
  });

  return {
    getInfo,
  };
}
