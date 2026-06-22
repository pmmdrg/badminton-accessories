import {
  calculateShippingFee,
  calculateTotalFee,
  getCartByUserId,
  tickCartItem,
  untickCartItem,
  updateCartTotal,
} from '@/services/client/cartService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../useAuth';

export function useCart() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const getByUserId = useQuery({
    queryKey: ['cart'],
    queryFn: () => {
      if (
        localStorage.getItem('access_token') &&
        localStorage.getItem('access_token') !== ''
      )
        return getCartByUserId();

      return null;
    },
  });

  const shipFee = useMutation({
    mutationFn: calculateShippingFee,
  });

  const editTotal = useMutation({
    mutationFn: updateCartTotal,
  });

  const totalFee = useQuery({
    queryKey: ['total-fee'],
    queryFn: calculateTotalFee,
    enabled: !!(userId && userId !== ''),
  });

  const untick = useMutation({
    mutationFn: (id: string) => untickCartItem(id),
    onSuccess: async () => {
      await editTotal.mutateAsync();
      await queryClient.invalidateQueries({ queryKey: ['total-fee'] });
    },
  });

  const tick = useMutation({
    mutationFn: (id: string) => tickCartItem(id),
    onSuccess: async () => {
      await editTotal.mutateAsync();
      await queryClient.invalidateQueries({ queryKey: ['total-fee'] });
    },
  });

  return {
    getByUserId,
    shipFee,
    editTotal,
    totalFee,
    untick,
    tick,
  };
}
