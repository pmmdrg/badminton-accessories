'use client';

import { useState } from 'react';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';
import Pagination from '@/components/custom/pagination';
import { SizeType } from '@/models/sizeType';
import { useSizeTypeManager } from '@/hooks/manager/useSizeType';

export default function ManagerSizeTypePage() {
  const { getAll } = useSizeTypeManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredSizeTypes = getAll.data?.data?.filter((b: SizeType) =>
    b.nameSizeType.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredSizeTypes || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Loại Kích Thước</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-size-type'
          type='text'
          placeholder='Tìm kiếm loại kích thước...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Loại Kích Thước</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredSizeTypes?.map((sizeType: SizeType) => (
              <tr key={sizeType._id}>
                <td className='px-4 py-2'>{sizeType.nameSizeType}</td>
                <td className='px-4 py-2'>{sizeType.description}</td>
                <td className='px-4 py-2'>
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
