'use client';

import Button from '@/components/button';
import { Spinner } from '@/components/spinner';
import { useOrderClient } from '@/hooks/client/useOrder';
import { COUNTRY_CODE } from '@/lib/constants';
import { capitalizeFirst } from '@/lib/utils';
import { Order } from '@/models/order';
import { useState } from 'react';
import DetailOrderModal from './orderDetailModal';
import clsx from 'clsx';

export default function OrderHistoryPage() {
  const { getAll, complete } = useOrderClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='max-w-5xl mx-auto px-6 py-10'>
      <h1 className='text-2xl font-bold mb-8'>Lịch Sử Đơn Hàng</h1>

      <DetailOrderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        orderId={selected}
      />

      {getAll.data?.data?.length === 0 ? (
        <p className='text-gray-500'>Bạn Chưa Có Đơn Hàng Nào.</p>
      ) : (
        <div className='flex flex-col gap-6'>
          {getAll.data?.data?.map((order: Order) => (
            <div key={order.id}>
              <div className='border rounded-2xl p-6 bg-gradient-to-br from-white/20 via-gray-200 to-gray-300 border-white/30 backdrop-blur-md shadow-xl'>
                <div className='flex justify-between items-center mb-4'>
                  <span
                    className={clsx(
                      order.status === 'completed'
                        ? 'text-green-600'
                        : order.status === 'cancelled'
                          ? 'text-red-600'
                          : order.status === 'delivered'
                            ? 'text-orange-600'
                            : 'text-blue-600',
                      'font-semibold',
                      'text-xl',
                    )}
                  >
                    {capitalizeFirst(order.status)}
                  </span>
                  <Button
                    variant='info'
                    onClick={() => {
                      setSelected(order.id);
                      setIsOpen(true);
                    }}
                  >
                    Chi Tiết
                  </Button>
                </div>

                <div className='grid grid-cols-2 gap-y-3 text-sm'>
                  <div className='text-gray-500 font-semibold'>
                    Số Lượng Sản Phẩm
                  </div>
                  <div className='font-medium'>{order.totalQuantity}</div>

                  <div className='text-gray-500 font-semibold'>
                    Giá Trị Hàng Hóa
                  </div>
                  <div className='font-medium'>
                    {order.totalCart.toLocaleString(COUNTRY_CODE.VN)}₫
                  </div>

                  <div className='text-gray-500 font-semibold'>Phí Ship</div>
                  <div className='font-medium'>
                    {order.shippingFee.toLocaleString(COUNTRY_CODE.VN)}₫
                  </div>

                  <div className='text-gray-500 font-semibold'>
                    Tổng Giá Trị
                  </div>
                  <div className='font-semibold text-rose-700'>
                    {order.totalCartOrder.toLocaleString(COUNTRY_CODE.VN)}₫
                  </div>

                  <div className='text-gray-500 font-semibold'>
                    Phương Thức Thanh Toán
                  </div>
                  <div className='font-medium'>{order.namePayment}</div>

                  {order.status === 'delivered' && (
                    <Button onClick={() => complete.mutate(order.id)}>
                      Đã Nhận Được Hàng
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
