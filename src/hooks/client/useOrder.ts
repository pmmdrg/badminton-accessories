'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  cancelOrder,
  getAllOrder,
  getAllOrderCancelled,
  getAllOrderCompleted,
  getAllOrderDelivered,
  getAllOrderProcessing,
  getAllOrderShipped,
  getDetailOrder,
  takeOrderCompleted,
} from '@/services/client/orderService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useOrderClient(id?: string) {
  const { addToast } = useToast();

  const getAll = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrder,
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

  const getAllShipped = useQuery({
    queryKey: ['shipped-orders'],
    queryFn: getAllOrderShipped,
  });

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
    },
  });

  const cancel = useMutation({
    mutationFn: (id: string) => cancelOrder(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã huỷ đơn hàng',
      });
    },
  });

  return {
    getAll,
    getById,
    getAllShipped,
    getAllProcessing,
    getAllCompleted,
    getAllCancelled,
    getAllDelivered,
    complete,
    cancel,
  };
}
