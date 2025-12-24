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

export function usePaymentClient(
  id?: string,
  name?: string,
  vnpAmount?: string,
  vnpBankCode?: string,
  vnpBankTranNo?: string,
  vnpCardType?: string,
  vnpOrderInfo?: string,
  vnpPayDate?: string,
  vnpResponseCode?: string,
  vnpTmnCode?: string,
  vnpTransactionNo?: string,
  vnpTransactionStatus?: string,
  vnpTxnRef?: string,
  vnpSecureHash?: string
) {
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
      window.location.href = data.data;
    },
  });

  const vnpayReturn = useQuery({
    queryKey: [
      'vn-pay-return',
      vnpAmount,
      vnpBankCode,
      vnpBankTranNo,
      vnpCardType,
      vnpOrderInfo,
      vnpPayDate,
      vnpResponseCode,
      vnpTmnCode,
      vnpTransactionNo,
      vnpTransactionStatus,
      vnpTxnRef,
      vnpSecureHash,
    ],
    queryFn: () =>
      vnpayPaymentReturn(
        vnpAmount!,
        vnpBankCode!,
        vnpBankTranNo!,
        vnpCardType!,
        vnpOrderInfo!,
        vnpPayDate!,
        vnpResponseCode!,
        vnpTmnCode!,
        vnpTransactionNo!,
        vnpTransactionStatus!,
        vnpTxnRef!,
        vnpSecureHash!
      ),
    enabled:
      vnpAmount !== undefined &&
      vnpAmount !== '' &&
      vnpBankCode !== undefined &&
      vnpBankCode !== '' &&
      vnpBankTranNo !== undefined &&
      vnpBankTranNo !== '' &&
      vnpCardType !== undefined &&
      vnpCardType !== '' &&
      vnpOrderInfo !== undefined &&
      vnpOrderInfo !== '' &&
      vnpPayDate !== undefined &&
      vnpPayDate !== '' &&
      vnpResponseCode !== undefined &&
      vnpResponseCode !== '' &&
      vnpTmnCode !== undefined &&
      vnpTmnCode !== '' &&
      vnpTransactionNo !== undefined &&
      vnpTransactionNo !== '' &&
      vnpTransactionStatus !== undefined &&
      vnpTransactionStatus !== '' &&
      vnpTxnRef !== undefined &&
      vnpTxnRef !== '' &&
      vnpSecureHash !== undefined &&
      vnpSecureHash !== '',
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
