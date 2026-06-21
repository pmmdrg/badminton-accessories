'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import { capitalizeFirst, isValidImageSrc, normalizedDate } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/pagination';
import { Brand } from '@/models/brand';
import { useBrandManager } from '@/hooks/manager/useBrand';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ManagerBrandPage() {
  const { getAll } = useBrandManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredBrands = getAll.data?.data?.filter((b: Brand) =>
    b.nameBrand.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredBrands || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh Sách Thương Hiệu</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-8'>
        <TextField
          name='search-brand'
          type='text'
          placeholder='Tìm kiếm thương hiệu...'
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
              <th className='px-4 py-2 text-left'>Tên</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Quốc Gia</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-400'>
            {filteredBrands?.map((brand: Brand) => (
              <tr key={brand.id}>
                <td className='px-4 py-2'>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={
                        brand.imageBrand && isValidImageSrc(brand.imageBrand)
                          ? brand.imageBrand
                          : placeholderImage
                      }
                      alt={brand.nameBrand}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                </td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {brand.nameBrand}
                </td>
                <td className='px-4 py-2'>{brand.description}</td>
                <td className='px-4 py-2'>{brand.country}</td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    brand.status === 'active'
                      ? 'text-green-600'
                      : 'text-red-600',
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(brand.status)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(brand.created_at)}
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
