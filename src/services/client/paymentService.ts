import api from '@/lib/api';

export async function findAllPaymentActive() {
  const res = await api.get('/payment');

  return res.data;
}

export async function findPaymentById(id: string) {
  const res = await api.get(`/payment/id?id=${id}`);

  return res.data;
}

export async function findPaymentByName(name: string) {
  const res = await api.get(`/payment/name?namePayment=${name}`);

  return res.data;
}

export async function codPayment() {
  const res = await api.post('/payment/cod');

  return res.data;
}

export async function vnpayPayment(payload: { amount: number }) {
  const res = await api.post('/payment/vnpay', payload);

  return res.data;
}

export async function vnpayPaymentReturn(
  vnpAmount: string,
  vnpBankCode: string,
  vnpBankTranNo: string,
  vnpCardType: string,
  vnpOrderInfo: string,
  vnpPayDate: string,
  vnpResponseCode: string,
  vnpTmnCode: string,
  vnpTransactionNo: string,
  vnpTransactionStatus: string,
  vnpTxnRef: string,
  vnpSecureHash: string
) {
  const res = await api.get(
    `/payment/vnpay/return?vnp_Amount=${vnpAmount}&vnp_BankCode=${vnpBankCode}&vnp_BankTranNo=${vnpBankTranNo}&vnp_CardType=${vnpCardType}&vnp_OrderInfo=${vnpOrderInfo}&vnp_PayDate=${vnpPayDate}&vnp_ResponseCode=${vnpResponseCode}&vnp_TmnCode=${vnpTmnCode}&vnp_TransactionNo=${vnpTransactionNo}&vnp_TransactionStatus=${vnpTransactionStatus}&vnp_TxnRef=${vnpTxnRef}&vnp_SecureHash=${vnpSecureHash}`
  );

  return res.data;
}
