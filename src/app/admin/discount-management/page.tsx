'use client';

import { useState } from 'react';
import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import Button from '@/components/button';
import { STATUS } from '@/lib/constants';
import Pagination from '@/components/pagination';
import { useDiscountAdmin } from '@/hooks/admin/useDiscount';
import { Discount } from '@/models/discount';
import EditDiscountModal from './editDiscountModal';
import AddDiscountModal from './addDiscountModal';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function AdminDiscountPage() {
  const { getAll, add, edit, remove, restore } = useDiscountAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const filteredDiscounts = getAll.data?.data?.filter((s: Discount) =>
    s.codePromotion.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredDiscounts || []).length / 20);

  const handleConfirmAdd = async (
    discountCode: string,
    valuePromotion: number,
  ) => {
    add.mutate({
      codePromotion: discountCode,
      valuePromotion,
    });
  };

  const handleConfirmEdit = async (
    discountCode: string,
    valuePromotion: number,
  ) => {
    edit.mutate({
      id: selectedId,
      payload: {
        codePromotion: discountCode,
        valuePromotion,
      },
    });

    setSelectedId('');
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Mã Giảm Giá</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-discount'
          type='text'
          placeholder='Tìm kiếm mã giảm giá...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        endIcon={<MagnifyingGlassIcon className='w-5 h-5' />}
          className='w-sm sm:max-w-full'
        />
        <Button variant='success' onClick={() => setIsOpenAdd(true)}>
          Thêm mã giảm giá
        </Button>
        <AddDiscountModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditDiscountModal
          discountId={selectedId}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          onConfirm={handleConfirmEdit}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Mã Giảm Giá</th>
              <th className='px-4 py-2 text-left'>Giá Trị (%)</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredDiscounts?.map((discount: Discount) => (
              <tr key={discount.id}>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {discount.codePromotion}
                </td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {discount.valuePromotion}
                </td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    {
                      'text-green-600': discount.status === STATUS.ACTIVE,
                      'text-red-600': discount.status === STATUS.INACTIVE,
                    },
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(discount.status)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(discount.created_at)}
                </td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(discount.id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {discount.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(discount.id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(discount.id)}
                      >
                        Khôi phục
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currPage}
        totalPages={totalPages}
        onPageChange={setCurrPage}
      />
    </div>
  );
}
