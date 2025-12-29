'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllOrder,
  getAllOrderCancelled,
  getAllOrderCompleted,
  getAllOrderDelivered,
  getAllOrderProcessing,
  // getAllOrderShipped,
  getDetailOrder,
  takeOrderCompleted,
} from '@/services/client/orderService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useOrderClient(id?: string) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrder,
  });

  const getDetail = useQuery({
    queryKey: ['detail-order', id],
    queryFn: () => getDetailOrder(id!),
    enabled: id !== undefined && id !== '',
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getDetailOrder(id || ''),
    enabled: !!id,
  });

  const getAllProcessing = useQuery({
    queryKey: ['processing-orders'],
    queryFn: getAllOrderProcessing,
  });

  // const getAllShipped = useQuery({
  //   queryKey: ['shipped-orders'],
  //   queryFn: getAllOrderShipped,
  // });

  const getAllDelivered = useQuery({
    queryKey: ['delivered-orders'],
    queryFn: getAllOrderDelivered,
  });

  const getAllCompleted = useQuery({
    queryKey: ['completed-orders'],
    queryFn: getAllOrderCompleted,
  });

  const getAllCancelled = useQuery({
    queryKey: ['cancelled-orders'],
    queryFn: getAllOrderCancelled,
  });

  const complete = useMutation({
    mutationFn: (id: string) => takeOrderCompleted(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đơn hàng đã chuyển thành trạng thái hoàn tất',
      });

      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    getAll,
    getById,
    getDetail,
    // getAllShipped,
    getAllProcessing,
    getAllCompleted,
    getAllCancelled,
    getAllDelivered,
    complete,
  };
}
