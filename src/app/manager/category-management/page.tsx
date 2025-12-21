'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import { COUNTRY_CODE, STATUS } from '@/lib/constants';
import { isValidImageSrc } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/custom/pagination';
import { Cate } from '@/models/cate';
import { useCateManager } from '@/hooks/manager/useCate';

export default function ManagerCategoryPage() {
  const { getAll } = useCateManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredCates = getAll.data?.data?.filter((c: Cate) =>
    c.nameCate.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredCates || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh Mục</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-cates'
          type='text'
          placeholder='Tìm kiếm danh mục...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Ảnh</th>
              <th className='px-4 py-2 text-left'>Tên Danh Mục</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredCates?.map((cate: Cate) => (
              <tr key={cate._id}>
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
                <td className='px-4 py-2'>{cate.nameCate}</td>

                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {cate.description}
                </td>

                <td className='px-4 py-2'>
                  {cate.status === STATUS.ACTIVE ? 'Active' : 'Inactive'}
                </td>
                <td className='px-4 py-2'>
                  {new Date(cate.created_at).toLocaleDateString(
                    COUNTRY_CODE.VN
                  )}
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
