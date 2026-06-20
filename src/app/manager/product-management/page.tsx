'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/models/product';
import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import { capitalizeFirst, isValidImageSrc, normalizedDate } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/pagination';
import { useProductManager } from '@/hooks/manager/useProduct';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ManagerProductPage() {
  const { getAllActive } = useProductManager();

  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredProducts = getAllActive.data?.data?.filter((p: Product) =>
    p.nameProduct.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredProducts || []).length / 20);

  if (getAllActive.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh Sách Sản Phẩm</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-8'>
        <TextField
          name='search-product'
          type='text'
          placeholder='Tìm kiếm sản phẩm...'
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
              <th className='px-4 py-2 text-left'>Ảnh</th>
              <th className='px-4 py-2 text-left'>Tên Sản Phẩm</th>
              <th className='px-4 py-2 text-left'>Mã Sản Phẩm</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredProducts?.map((product: Product) => (
              <tr key={product.id}>
                <td className='px-4 py-2'>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={
                        product.imageProduct &&
                        isValidImageSrc(product.imageProduct)
                          ? product.imageProduct
                          : placeholderImage
                      }
                      alt={product.nameProduct}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                </td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {product.nameProduct}
                </td>
                <td className='px-4 py-2'>{product.id}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {product.description}
                </td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    product.status === 'active'
                      ? 'text-green-600'
                      : 'text-red-600',
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(product.status)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(product.created_at)}
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
