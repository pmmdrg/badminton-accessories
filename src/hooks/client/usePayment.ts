'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  codPayment,
  findAllPaymentActive,
  findPaymentById,
  findPaymentByName,
  vnpayPayment,
  vnpayPaymentReturn,
} from '@/services/client/paymentService';

export function usePaymentClient(id?: string, name?: string) {
  const getAll = useQuery({
    queryKey: ['payments'],
    queryFn: findAllPaymentActive,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => findPaymentById(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameBrand', name],
    queryFn: () => findPaymentByName(name || ''),
    enabled: !!name,
  });

  const cod = useMutation({
    mutationFn: codPayment,
  });

  const vnpay = useMutation({
    mutationFn: vnpayPayment,
    onSuccess: (data) => {
      console.log(data.data);

      // window.location.href = data.data;
    },
  });

  const vnpayReturn = useMutation({
    mutationFn: vnpayPaymentReturn,
  });

  return {
    getAll,
    getById,
    getByName,
    cod,
    vnpay,
    vnpayReturn,
  };
}
