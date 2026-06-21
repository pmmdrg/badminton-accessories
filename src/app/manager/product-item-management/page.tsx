'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductItem } from '@/models/productItem';
import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import { COUNTRY_CODE } from '@/lib/constants';
import { capitalizeFirst, isValidImageSrc, normalizedDate } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/pagination';
import { useProductItemManager } from '@/hooks/manager/useProductItem';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ManagerProductItemPage() {
  const { getAllActive } = useProductItemManager();

  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredProductItems = getAllActive.data?.data?.filter(
    (pi: ProductItem) =>
      pi.nameProductItem.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredProductItems || []).length / 20);

  if (getAllActive.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh Sách Mặt Hàng Sản Phẩm</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-8'>
        <TextField
          name='search-product-item'
          type='text'
          placeholder='Tìm kiếm mặt hàng sản phẩm...'
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
              <th className='px-4 py-2 text-left'>Tên Mặt Hàng</th>
              <th className='px-4 py-2 text-left'>SKU</th>
              <th className='px-4 py-2 text-left'>Giá</th>
              <th className='px-4 py-2 text-left'>SL</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-400'>
            {filteredProductItems
              ?.slice((currPage - 1) * 20, (currPage - 1) * 20 + 20)
              .map((productItem: ProductItem) => (
                <tr key={productItem.id}>
                  <td className='px-4 py-2'>
                    <div className='w-16 h-16 relative'>
                      <Image
                        src={
                          productItem.imageProductItem &&
                          isValidImageSrc(productItem.imageProductItem[0])
                            ? productItem.imageProductItem[0]
                            : placeholderImage
                        }
                        alt={productItem.nameProductItem}
                        fill
                        className='object-cover rounded'
                      />
                    </div>
                  </td>
                  <td className='px-4 py-2 text-rose-700 font-semibold'>
                    {productItem.nameProductItem}
                  </td>
                  <td className='px-4 py-2'>{productItem.id}</td>
                  <td className='px-4 py-2 text-rose-700 font-semibold'>
                    {productItem.price.toLocaleString(COUNTRY_CODE.VN)}₫
                  </td>
                  <td className='px-4 py-2 text-rose-700 font-semibold'>
                    {productItem.quantity}
                  </td>
                  <td
                    className={clsx(
                      'px-4',
                      'py-2',
                      productItem.status === 'active'
                        ? 'text-green-600'
                        : 'text-red-600',
                      'font-bold',
                    )}
                  >
                    {capitalizeFirst(productItem.status)}
                  </td>
                  <td className='px-4 py-2'>
                    {normalizedDate(productItem.created_at)}
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
