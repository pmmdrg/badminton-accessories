'use client';

import { SelectString } from '@/components/custom/select';
import Image from 'next/image';
import { useState } from 'react';
import { placeholderImage } from '@/assets/images';
import Button from '@/components/custom/button';
import { COUNTRY_CODE } from '@/lib/constants';
import { usePaymentClient } from '@/hooks/client/usePayment';
import { Payment } from '@/models/payment';
import { isValidImageSrc, normalizedSelectOptions } from '@/lib/utils';
import { useCart } from '@/hooks/client/useCart';
import { Spinner } from '@/components/custom/spinner';
import { CartItem } from '@/models/cartItem';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const districtId = parseInt(searchParams.get('district') || '0');
  const wardCode = searchParams.get('ward') || '';
  const addressUser = searchParams.get('address') || '';
  const phoneNumber = searchParams.get('phone') || '';

  const { getByUserId, totalFee } = useCart(
    districtId,
    wardCode,
    addressUser,
    phoneNumber
  );
  const payments = usePaymentClient();
  const [paymentMethod, setPaymentMethod] = useState('');

  const paymentOptions = payments.getAll.data?.data
    ? [
        { label: 'Phương thức thanh toán', value: '' },
        ...payments.getAll.data.data.map((p: Payment) =>
          normalizedSelectOptions(p.namePayment, p.namePayment)
        ),
      ]
    : [{ label: 'Phương thức thanh toán', value: '' }];

  const handleCheckout = () => {
    if (paymentMethod === 'COD') {
      payments.cod.mutate();
    } else if (totalFee.data?.data?.totalCartOrder) {
      payments.vnpay.mutate({ amount: totalFee.data.data.totalCartOrder });
    }
  };

  return (
    <div className='w-full bg-gray-100 py-12 px-6 flex justify-center'>
      <div className='w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-8'>
        {payments.cod.isSuccess || payments.vnpayReturn.isSuccess ? (
          <div className='flex justify-center items-center'>
            <CheckCircleIcon className='w-10 h-10 text-emerald-600' />
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
                        key={ci._id}
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
                              COUNTRY_CODE.VN
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
                    COUNTRY_CODE.VN
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
                    COUNTRY_CODE.VN
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
                    COUNTRY_CODE.VN
                  )}
                  ₫
                </span>
              )}
            </div>

            <div className='space-y-2'>
              <h2 className='text-xl font-semibold'>Phương thức thanh toán</h2>
              <SelectString
                label='Chọn phương thức thanh toán'
                value={paymentMethod}
                options={paymentOptions}
                onChange={setPaymentMethod}
                className='w-full border border-gray-300 rounded-lg p-3'
              />
            </div>

            <Button className='w-full font-bold py-3' onClick={handleCheckout}>
              Xác Nhận Đặt Hàng
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
