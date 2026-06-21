'use client';

import { useState } from 'react';
import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';
import Pagination from '@/components/pagination';
import { SizeType } from '@/models/sizeType';
import { useSizeTypeManager } from '@/hooks/manager/useSizeType';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ManagerSizeTypePage() {
  const { getAll } = useSizeTypeManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredSizeTypes = getAll.data?.data?.filter((b: SizeType) =>
    b.nameSizeType.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredSizeTypes || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh Sách Loại Kích Thước</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-8'>
        <TextField
          name='search-size-type'
          type='text'
          placeholder='Tìm kiếm loại kích thước...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endIcon={<MagnifyingGlassIcon className='w-5 h-5' />}
          className='w-sm sm:max-w-full'
        />
      </div>

      <div className='overflow-x-auto bg-gradient-to-br from-white/20 via-gray-200 to-gray-300 border border-white/30 backdrop-blur-md rounded-2xl shadow-xl'>
        <table className='min-w-full divide-y divide-gray-400'>
          <thead className='bg-gray-300'>
            <tr>
              <th className='px-4 py-2 text-left'>Loại Kích Thước</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-400'>
            {filteredSizeTypes?.map((sizeType: SizeType) => (
              <tr key={sizeType.id}>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {sizeType.nameSizeType}
                </td>
                <td className='px-4 py-2'>{sizeType.description}</td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    sizeType.status === 'active'
                      ? 'text-green-600'
                      : 'text-red-600',
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(sizeType.status)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(sizeType.created_at)}
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
