'use client';

import { useState } from 'react';
import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import Pagination from '@/components/pagination';
import { Supplier } from '@/models/supplier';
import { useSupplierManager } from '@/hooks/manager/useSupplier';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ManagerSupplierPage() {
  const { getAll } = useSupplierManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredSuppliers = getAll.data?.data?.filter((s: Supplier) =>
    s.nameSupplier.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredSuppliers || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh Sách Nhà Cung Cấp</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-8'>
        <TextField
          name='search-product'
          type='text'
          placeholder='Tìm kiếm nhà cung cấp...'
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
              <th className='px-4 py-2 text-left'>Nhà Cung Cấp</th>
              <th className='px-4 py-2 text-left'>Địa Chỉ</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredSuppliers?.map((supplier: Supplier) => (
              <tr key={supplier.id}>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {supplier.nameSupplier}
                </td>
                <td className='px-4 py-2'>{supplier.address}</td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    supplier.status === 'active'
                      ? 'text-green-600'
                      : 'text-red-600',
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(supplier.status)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(supplier.created_at)}
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
