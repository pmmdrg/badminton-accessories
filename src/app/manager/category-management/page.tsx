'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import { capitalizeFirst, isValidImageSrc, normalizedDate } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/pagination';
import { Cate } from '@/models/cate';
import { useCateManager } from '@/hooks/manager/useCate';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ManagerCategoryPage() {
  const { getAll } = useCateManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredCates = getAll.data?.data?.filter((c: Cate) =>
    c.nameCate.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredCates || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh Sách Danh Mục</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-8'>
        <TextField
          name='search-cates'
          type='text'
          placeholder='Tìm kiếm danh mục...'
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
              <th className='px-4 py-2 text-left'>Ảnh</th>
              <th className='px-4 py-2 text-left'>Tên Danh Mục</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-400'>
            {filteredCates?.map((cate: Cate) => (
              <tr key={cate.id}>
                <td className='px-4 py-2'>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={
                        cate.imageCate && isValidImageSrc(cate.imageCate)
                          ? cate.imageCate
                          : placeholderImage
                      }
                      alt={cate.nameCate}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                </td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {cate.nameCate}
                </td>
                <td className='px-4 py-2'>{cate.description}</td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    cate.status === 'active'
                      ? 'text-green-600'
                      : 'text-red-600',
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(cate.status)}
                </td>
                <td className='px-4 py-2'>{normalizedDate(cate.created_at)}</td>
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
