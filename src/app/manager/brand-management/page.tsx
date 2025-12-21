'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import { COUNTRY_CODE, STATUS } from '@/lib/constants';
import { isValidImageSrc } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/custom/pagination';
import { Brand } from '@/models/brand';
import { useBrandManager } from '@/hooks/manager/useBrand';

export default function ManagerBrandPage() {
  const { getAll } = useBrandManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredBrands = getAll.data?.data?.filter((b: Brand) =>
    b.nameBrand.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredBrands || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Thương Hiệu</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-brand'
          type='text'
          placeholder='Tìm kiếm thương hiệu...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Ảnh</th>
              <th className='px-4 py-2 text-left'>Tên</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Quốc Gia</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredBrands?.map((brand: Brand) => (
              <tr key={brand._id}>
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
                <td className='px-4 py-2'>{brand.nameBrand}</td>
                <td className='px-4 py-2'>{brand.description}</td>
                <td className='px-4 py-2'>{brand.country}</td>
                <td className='px-4 py-2'>
                  {brand.status === STATUS.ACTIVE ? 'Active' : 'Inactive'}
                </td>
                <td className='px-4 py-2'>
                  {new Date(brand.created_at).toLocaleDateString(
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
