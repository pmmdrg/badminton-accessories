'use client';

import Button from '@/components/custom/button';
import { Spinner } from '@/components/custom/spinner';
import { useOrderClient } from '@/hooks/client/useOrder';
import { COUNTRY_CODE } from '@/lib/constants';
import { capitalizeFirst } from '@/lib/utils';
import { Order } from '@/models/order';

export default function OrderHistoryPage() {
  const { getAll, complete } = useOrderClient();

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='max-w-5xl mx-auto px-6 py-10'>
      <h1 className='text-2xl font-bold mb-8'>Lịch sử đơn hàng</h1>

      {getAll.data?.data?.length === 0 ? (
        <p className='text-gray-500'>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className='flex flex-col gap-6'>
          {getAll.data?.data?.map((order: Order) => (
            <div
              key={order._id}
              className='border rounded-2xl p-6 shadow-sm bg-white'
            >
              <div className='flex justify-between items-center mb-4'>
                <span className='font-medium text-rose-700'>
                  {capitalizeFirst(order.status)}
                </span>
              </div>

              <div className='grid grid-cols-2 gap-y-3 text-sm'>
                <div className='text-gray-500'>Số lượng sản phẩm</div>
                <div className='font-medium'>{order.totalQuantity}</div>

                <div className='text-gray-500'>Giá trị hàng hóa</div>
                <div className='font-medium'>
                  {order.totalCart.toLocaleString(COUNTRY_CODE.VN)} ₫
                </div>

                <div className='text-gray-500'>Phí ship</div>
                <div className='font-medium'>
                  {order.shippingFee.toLocaleString(COUNTRY_CODE.VN)} ₫
                </div>

                <div className='text-gray-500'>Tổng giá trị</div>
                <div className='font-semibold text-rose-700'>
                  {order.totalCartOrder.toLocaleString(COUNTRY_CODE.VN)} ₫
                </div>

                <div className='text-gray-500'>Phương thức thanh toán</div>
                <div className='font-medium'>{order.namePayment}</div>

                {order.status === 'delivered' && (
                  <Button onClick={() => complete.mutate(order._id)}>
                    Đã nhận được hàng
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
