import {
  calculateShippingFee,
  calculateTotalFee,
  getCartByUserId,
  tickCartItem,
  untickCartItem,
  updateCartTotal,
} from '@/services/client/cartService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCart(
  toDistrictId?: number,
  toWardCode?: string,
  address?: string,
  phoneNumber?: string
) {
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
    queryKey: ['total-fee', toDistrictId, toWardCode, address, phoneNumber],
    queryFn: () =>
      calculateTotalFee({
        from_district_id: 3695,
        from_ward_code: '90764',
        to_district_id: toDistrictId!,
        to_ward_code: toWardCode!,
        address: address!,
        phonenumber: phoneNumber!,
      }),
    enabled:
      toDistrictId !== undefined &&
      toDistrictId !== 0 &&
      toWardCode !== undefined &&
      toWardCode !== '' &&
      address !== undefined &&
      address !== '' &&
      phoneNumber !== undefined &&
      phoneNumber !== '',
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
