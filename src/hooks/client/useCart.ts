import {
  calculateShippingFee,
  calculateTotalFee,
  getCartByUserId,
  tickCartItem,
  untickCartItem,
  updateCartTotal,
} from '@/services/client/cartService';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useCart() {
  const getByUserId = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartByUserId(),
  });

  const shipFee = useMutation({
    mutationFn: calculateShippingFee,
  });

  const editTotal = useMutation({
    mutationFn: updateCartTotal,
  });

  const totalFee = useMutation({
    mutationFn: calculateTotalFee,
  });

  const untick = useMutation({
    mutationFn: (id: string) => untickCartItem(id),
  });

  const tick = useMutation({
    mutationFn: (id: string) => tickCartItem(id),
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
