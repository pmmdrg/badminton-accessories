import {
  calculateShippingFee,
  calculateTotalFee,
  getCartByUserId,
  tickCartItem,
  untickCartItem,
  updateCartTotal,
} from '@/services/client/cartService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCart() {
  const queryClient = useQueryClient();

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
  });

  const untick = useMutation({
    mutationFn: (id: string) => untickCartItem(id),
    onSuccess: () => {
      editTotal.mutate();
      queryClient.invalidateQueries({ queryKey: ['total-fee'] });
    },
  });

  const tick = useMutation({
    mutationFn: (id: string) => tickCartItem(id),
    onSuccess: () => {
      editTotal.mutate();
      queryClient.invalidateQueries({ queryKey: ['total-fee'] });
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
