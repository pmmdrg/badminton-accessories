'use client';

import { useState } from 'react';
import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import Button from '@/components/button';
import { COUNTRY_CODE } from '@/lib/constants';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';
import Pagination from '@/components/pagination';
import { useOrderAdmin } from '@/hooks/admin/useOrder';
import { Order } from '@/models/order';
import DetailOrderModal from './detailOrderModal';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function AdminOrderPage() {
  const { getAll, deliver, cancel } = useOrderAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const filteredOrders = getAll.data?.data?.filter(
    (o: Order) =>
      o.fullname.toLowerCase().includes(search.toLowerCase()) ||
      o.phonenumber.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredOrders || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Đơn Hàng</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-order'
          type='text'
          placeholder='Tìm kiếm đơn hàng...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endIcon={<MagnifyingGlassIcon className='w-5 h-5' />}
          className='w-sm sm:max-w-full'
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Họ Tên</th>
              <th className='px-4 py-2 text-left'>SL</th>
              <th className='px-4 py-2 text-left'>Giá Trị Đơn Hàng</th>
              <th className='px-4 py-2 text-left'>Địa Chỉ</th>
              <th className='px-4 py-2 text-left'>SĐT</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Ngày Vận Chuyển</th>
              <th className='px-4 py-2 text-left'>Ngày Hoàn Thành</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredOrders?.map((order: Order) => (
              <tr
                key={order.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(order.id);
                  setIsOpen(true);
                }}
                className='cursor-pointer'
              >
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {order.fullname}
                </td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {order.totalQuantity}
                </td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {order.totalCartOrder.toLocaleString(COUNTRY_CODE.VN)}₫
                </td>
                <td className='px-4 py-2'>{order.address}</td>
                <td className='px-4 py-2'>{order.phonenumber}</td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    {
                      'text-green-600': order.status === 'completed',
                      'text-red-600': order.status === 'cancelled',
                      'text-orange-600': order.status === 'delivered',
                      'text-blue-600': order.status === 'processing',
                    },
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(order.status)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(order.created_at)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(order.delivered_at)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(order.completed_at)}
                </td>
                <td className='px-4 py-2'>
                  {order.status === 'processing' && (
                    <div className='flex gap-2'>
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={(e) => {
                          e.stopPropagation();
                          deliver.mutate(order.id);
                        }}
                      >
                        Vận chuyển
                      </Button>

                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={(e) => {
                          e.stopPropagation();
                          cancel.mutate(order.id);
                        }}
                      >
                        Huỷ
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DetailOrderModal
          orderId={selectedId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>

      <Pagination
        currentPage={currPage}
        totalPages={totalPages}
        onPageChange={setCurrPage}
      />
    </div>
  );
}
