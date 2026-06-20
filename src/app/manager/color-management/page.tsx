'use client';

import { useState } from 'react';

import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';
import Pagination from '@/components/pagination';
import { Color } from '@/models/color';
import { useColorManager } from '@/hooks/manager/useColor';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ManagerColorPage() {
  const { getAll } = useColorManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredColors = getAll.data?.data?.filter((b: Color) =>
    b.nameColor.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredColors || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh Sách Màu</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-8'>
        <TextField
          name='search-color'
          type='text'
          placeholder='Tìm kiếm màu...'
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
              <th className='px-4 py-2 text-left'>Tên Màu</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredColors?.map((color: Color) => (
              <tr key={color.id}>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {color.nameColor}
                </td>
                <td className='px-4 py-2'>{color.description}</td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    color.status === 'active'
                      ? 'text-green-600'
                      : 'text-red-600',
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(color.status)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(color.created_at)}
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
