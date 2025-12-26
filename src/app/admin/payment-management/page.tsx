'use client';

import { useState } from 'react';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { STATUS } from '@/lib/constants';
import Pagination from '@/components/custom/pagination';
import { usePaymentAdmin } from '@/hooks/admin/usePayment';
import { Payment } from '@/models/payment';
import EditPaymentModal from './editPaymentModal';
import AddPaymentModal from './addPaymentModal';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';

export default function AdminPaymentPage() {
  const { getAll, add, edit, remove, restore } = usePaymentAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const filteredPayments = getAll.data?.data?.filter((s: Payment) =>
    s.namePayment.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredPayments || []).length / 20);

  const handleConfirmAdd = async (paymentName: string) => {
    add.mutate({
      namePayment: paymentName,
    });
  };

  const handleConfirmEdit = async (paymentName: string) => {
    edit.mutate({
      id: selectedId,
      payload: {
        namePayment: paymentName,
      },
    });

    setSelectedId('');
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        Quản Lý Phương Thức Thanh Toán
      </h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-payment'
          type='text'
          placeholder='Tìm kiếm phương thức thanh toán...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpenAdd(true)}>
          Thêm phương thức thanh toán
        </Button>
        <AddPaymentModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditPaymentModal
          paymentId={selectedId}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          onConfirm={handleConfirmEdit}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Phương Thức Thanh Toán</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredPayments?.map((payment: Payment) => (
              <tr key={payment._id}>
                <td className='px-4 py-2'>{payment.namePayment}</td>
                <td className='px-4 py-2'>{capitalizeFirst(payment.status)}</td>
                <td className='px-4 py-2'>
                  {normalizedDate(payment.created_at)}
                </td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(payment._id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {payment.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(payment._id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(payment._id)}
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
