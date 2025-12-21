'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductItem } from '@/models/productItem';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import { COUNTRY_CODE, STATUS } from '@/lib/constants';
import { isValidImageSrc } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/custom/pagination';
import { useProductItemManager } from '@/hooks/manager/useProductItem';

export default function ManagerProductItemPage() {
  const { getAllActive } = useProductItemManager();

  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredProductItems = getAllActive.data?.data?.filter(
    (pi: ProductItem) =>
      pi.nameProductItem.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredProductItems || []).length / 20);

  if (getAllActive.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Mặt Hàng Sản Phẩm</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-product-item'
          type='text'
          placeholder='Tìm kiếm mặt hàng sản phẩm...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-md'
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
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
          <tbody className='divide-y divide-gray-200'>
            {filteredProductItems
              ?.slice((currPage - 1) * 20, (currPage - 1) * 20 + 20)
              .map((productItem: ProductItem) => (
                <tr key={productItem._id}>
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
                  <td className='px-4 py-2'>{productItem.nameProductItem}</td>
                  <td className='px-4 py-2'>{productItem._id}</td>
                  <td className='px-4 py-2 text-rose-700 font-semibold'>
                    {productItem.price.toLocaleString(COUNTRY_CODE.VN)}₫
                  </td>
                  <td className='px-4 py-2'>{productItem.quantity}</td>
                  <td className='px-4 py-2'>
                    {productItem.status === STATUS.ACTIVE
                      ? 'Active'
                      : 'Inactive'}
                  </td>
                  <td className='px-4 py-2'>
                    {new Date(productItem.created_at).toLocaleDateString(
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
