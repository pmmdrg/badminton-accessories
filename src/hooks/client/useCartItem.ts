import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import {
  deleteCartItem,
  getCartItemByUserId,
  insertCartItem,
  updateCartItem,
} from '@/services/client/cartItemService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCartItem() {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const getByUserId = useQuery({
    queryKey: ['cart-item'],
    queryFn: () => getCartItemByUserId(),
  });

  const insert = useMutation({
    mutationFn: insertCartItem,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã thêm vào giỏ hàng',
      });
    },
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        quantity: number;
      };
    }) => updateCartItem(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã cập nhật giỏ hàng',
      });

      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteCartItem(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá sản phẩm ra khỏi giỏ hàng',
      });
    },
  });

  return {
    getByUserId,
    insert,
    edit,
    remove,
  };
}
