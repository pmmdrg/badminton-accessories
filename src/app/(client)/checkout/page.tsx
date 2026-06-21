'use client';

import { SelectString } from '@/components/select';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import { placeholderImage } from '@/assets/images';
import Button from '@/components/button';
import { COUNTRY_CODE, EmailRegex, PhoneRegex } from '@/lib/constants';
import { usePaymentClient } from '@/hooks/client/usePayment';
import { Payment } from '@/models/payment';
import { isValidImageSrc, normalizedSelectOptions } from '@/lib/utils';
import { useCart } from '@/hooks/client/useCart';
import { Spinner } from '@/components/spinner';
import { CartItem } from '@/models/cartItem';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import TextField from '@/components/textfield';

function CheckoutContent() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const searchParams = useSearchParams();
  const vnpAmount = searchParams.get('vnp_Amount') || '';
  const vnpBankCode = searchParams.get('vnp_BankCode') || '';
  const vnpBankTranNo = searchParams.get('vnp_BankTranNo') || '';
  const vnpCardType = searchParams.get('vnp_CardType') || '';
  const vnpOrderInfo = searchParams.get('vnp_OrderInfo') || '';
  const vnpPayDate = searchParams.get('vnp_PayDate') || '';
  const vnpResponseCode = searchParams.get('vnp_ResponseCode') || '';
  const vnpTmnCode = searchParams.get('vnp_TmnCode') || '';
  const vnpTransactionNo = searchParams.get('vnp_TransactionNo') || '';
  const vnpTransactionStatus = searchParams.get('vnp_TransactionStatus') || '';
  const vnpTxnRef = searchParams.get('vnp_TxnRef') || '';
  const vnpSecureHash = searchParams.get('vnp_SecureHash') || '';

  const { getByUserId, totalFee } = useCart();
  const { getAll, vnpayReturn, cod, vnpay } = usePaymentClient(
    '',
    '',
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
    phoneNumber,
  );

  const paymentOptions = getAll.data?.data
    ? [
        { label: 'Phương thức thanh toán', value: '' },
        ...getAll.data.data.map((p: Payment) =>
          normalizedSelectOptions(p.namePayment, p.namePayment),
        ),
      ]
    : [{ label: 'Phương thức thanh toán', value: '' }];

  const handleCheckout = () => {
    if (paymentMethod === 'COD') {
      cod.mutate(phoneNumber);
    } else if (totalFee.data?.data?.totalCartOrder) {
      vnpay.mutate({ amount: totalFee.data.data.totalCartOrder });
    }
  };

  return (
    <div className='w-full bg-gray-100 py-12 px-6 flex justify-center'>
      <div className='w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-8'>
        {cod.isSuccess || vnpayReturn.isSuccess ? (
          <div className='flex flex-col justify-center items-center h-96'>
            <CheckCircleIcon className='w-10 h-10 text-emerald-600' />
            <p>Đặt hàng thành công!</p>
          </div>
        ) : (
          <>
            <h1 className='text-3xl font-bold mb-6'>Tổng Hợp Đơn Hàng</h1>

            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>Sản phẩm đã chọn</h2>
              {getByUserId.isLoading ? (
                <Spinner />
              ) : (
                getByUserId.data?.data?.items?.map((ci: CartItem) => {
                  return (
                    ci.status === 'tick' && (
                      <div
                        key={ci.id}
                        className='border border-gray-200 rounded-lg p-4 space-y-4'
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-4'>
                            <div className='relative w-20 h-20 rounded-lg overflow-hidden'>
                              <Image
                                src={
                                  isValidImageSrc(ci.imageProductItem)
                                    ? ci.imageProductItem
                                    : placeholderImage
                                }
                                alt={ci.nameProductItem}
                                fill
                                className='object-cover'
                              />
                            </div>
                            <div>
                              <p className='font-semibold'>
                                {ci.nameProductItem}
                              </p>
                              <p className='text-gray-500'>
                                Số lượng: {ci.quantity}
                              </p>
                            </div>
                          </div>
                          <p className='font-semibold'>
                            {ci.totalPriceCartItem.toLocaleString(
                              COUNTRY_CODE.VN,
                            )}
                            ₫
                          </p>
                        </div>
                      </div>
                    )
                  );
                })
              )}
            </div>

            <div className='flex justify-between items-center text-lg'>
              <span>Tiền hàng:</span>
              {totalFee.data && (
                <span>
                  {totalFee.data.data?.totalCart?.toLocaleString(
                    COUNTRY_CODE.VN,
                  )}
                  ₫
                </span>
              )}
            </div>

            <div className='flex justify-between items-center text-lg'>
              <span>Phí ship:</span>
              {totalFee.data && (
                <span>
                  {totalFee.data.data?.shippingFee?.toLocaleString(
                    COUNTRY_CODE.VN,
                  )}
                  ₫
                </span>
              )}
            </div>

            <div className='flex justify-between items-center text-xl font-bold'>
              <span>Tổng tiền:</span>
              {totalFee.data && (
                <span>
                  {totalFee.data.data?.totalCartOrder?.toLocaleString(
                    COUNTRY_CODE.VN,
                  )}
                  ₫
                </span>
              )}
            </div>

            <div className='flex rounded-lg border border-gray-400 p-4 items-center gap-20'>
              <SelectString
                label='Chọn Phương Thức Thanh Toán'
                value={paymentMethod}
                options={paymentOptions}
                onChange={setPaymentMethod}
                className='ml-2 grow-1'
              />

              <TextField
                name='phone-number'
                label='Nhập Số Điện Thoại'
                placeholder='Số điện thoại'
                value={phoneNumber}
                error={
                  PhoneRegex.test(phoneNumber)
                    ? undefined
                    : 'Vui lòng nhập số điện thoại hợp lệ'
                }
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <Button
              disabled={paymentMethod === '' || !PhoneRegex.test(phoneNumber)}
              className='w-full font-bold py-3'
              onClick={handleCheckout}
            >
              Xác Nhận Đặt Hàng
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
