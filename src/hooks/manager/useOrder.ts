'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getAllOrderManager,
  getDetailOrder,
  getAllOrderProcessing,
  getAllOrderShipped,
  getAllOrderDelivered,
  getAllOrderCompleted,
  getAllOrderCancelled,
  getAllOrderCreatedByTime,
  getAllOrderDeliveredByTime,
  getAllOrderCompletedByTime,
  getAllOrderByNameUser,
  getOrderByOrderId,
  getAllOrderByUserId,
  takeOrderDelivered,
} from '@/services/manager/orderService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useOrderManager(
  id?: string,
  createStartDate?: string,
  createEndDate?: string,
  shipStartDate?: string,
  shipEndDate?: string,
  deliverStartDate?: string,
  deliverEndDate?: string,
  completeStartDate?: string,
  completeEndDate?: string,
  fullname?: string,
  userId?: string
) {
  const { addToast } = useToast();

  const getAll = useQuery({
    queryKey: ['manager-orders'],
    queryFn: getAllOrderManager,
  });

  const getDetail = useQuery({
    queryKey: ['id', id],
    queryFn: () => getDetailOrder(id || ''),
    enabled: !!id,
  });

  const getAllProcessing = useQuery({
    queryKey: ['order-processing'],
    queryFn: () => getAllOrderProcessing(),
  });

  const getAllShipped = useQuery({
    queryKey: ['order-shipped'],
    queryFn: () => getAllOrderShipped(),
  });

  const getAllDelivered = useQuery({
    queryKey: ['order-delivered'],
    queryFn: () => getAllOrderDelivered(),
  });

  const getAllCompleted = useQuery({
    queryKey: ['order-completed'],
    queryFn: () => getAllOrderCompleted(),
  });

  const getAllCancelled = useQuery({
    queryKey: ['order-cancelled'],
    queryFn: () => getAllOrderCancelled(),
  });

  const getAllCreatedByTime = useQuery({
    queryKey: ['created-by-time', createStartDate, createEndDate],
    queryFn: () =>
      getAllOrderCreatedByTime(createStartDate || '', createEndDate || ''),
    enabled: !!createStartDate && !!createEndDate,
  });

  const getAllShippedByTime = useQuery({
    queryKey: ['shipped-by-time', shipStartDate, shipEndDate],
    queryFn: () =>
      getAllOrderCreatedByTime(shipStartDate || '', shipEndDate || ''),
    enabled: !!shipStartDate && !!shipEndDate,
  });

  const getAllDeliveredByTime = useQuery({
    queryKey: ['delivered-by-time', deliverStartDate, deliverEndDate],
    queryFn: () =>
      getAllOrderDeliveredByTime(deliverStartDate || '', deliverEndDate || ''),
    enabled: !!deliverStartDate && !!deliverEndDate,
  });

  const getAllCompletedByTime = useQuery({
    queryKey: ['completed-by-time', completeStartDate, completeEndDate],
    queryFn: () =>
      getAllOrderCompletedByTime(
        completeStartDate || '',
        completeEndDate || ''
      ),
    enabled: !!completeStartDate && !!completeEndDate,
  });

  const getAllByNameUser = useQuery({
    queryKey: ['fullname', fullname],
    queryFn: () => getAllOrderByNameUser(fullname || ''),
    enabled: !!fullname,
  });

  const getAllByUserId = useQuery({
    queryKey: ['userid', userId],
    queryFn: () => getAllOrderByUserId(userId || ''),
    enabled: !!userId,
  });

  const getByOrderId = useQuery({
    queryKey: ['id', id],
    queryFn: () => getOrderByOrderId(id || ''),
    enabled: !!id,
  });

  const deliver = useMutation({
    mutationFn: (id: string) => takeOrderDelivered(id),
    onSuccess: () => {
      addToast({
        message: 'Đã chuyển sang trạng thái vận chuyển đơn hàng',
        type: TOAST_TYPE.SUCCESS,
      });
    },
  });

  return {
    getAll,
    getDetail,
    getAllProcessing,
    getAllShipped,
    getAllDelivered,
    getAllCompleted,
    getAllCancelled,
    getAllByNameUser,
    getAllByUserId,
    getAllCreatedByTime,
    getAllShippedByTime,
    getAllDeliveredByTime,
    getAllCompletedByTime,
    deliver,
    getByOrderId,
  };
}
