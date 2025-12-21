'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllUserManager } from '@/services/manager/userService';

export function useUserManager() {
  const getAll = useQuery({
    queryKey: ['manager-users'],
    queryFn: getAllUserManager,
  });

  return {
    getAll,
  };
}
