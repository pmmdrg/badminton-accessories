'use client';

import { useState } from 'react';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';
import Pagination from '@/components/custom/pagination';
import { Size } from '@/models/size';
import { useSizeManager } from '@/hooks/manager/useSize';

export default function ManagerSizePage() {
  const { getAll } = useSizeManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredSizes = getAll.data?.data?.filter((b: Size) =>
    b.nameSize.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredSizes || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Kích Thước</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-size'
          type='text'
          placeholder='Tìm kiếm kích thước...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Kích Thước</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredSizes?.map((size: Size) => (
              <tr key={size._id}>
                <td className='px-4 py-2'>{size.nameSize}</td>
                <td className='px-4 py-2'>{size.description}</td>
                <td className='px-4 py-2'>{capitalizeFirst(size.status)}</td>
                <td className='px-4 py-2'>{normalizedDate(size.created_at)}</td>
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
