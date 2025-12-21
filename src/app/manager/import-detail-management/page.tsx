'use client';

import { useState } from 'react';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import Pagination from '@/components/custom/pagination';
import AddImportModal from './addImportDetailModal';
import { useImportDetailManager } from '@/hooks/manager/useImportDetail';
import { ProductItem } from '@/models/productItem';
import { ImportDetail } from '@/models/importDetail';
import Image from 'next/image';
import { isValidImageSrc } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';

export default function ManagerImportDetailPage() {
  const { getAll, add } = useImportDetailManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredImportDetails = getAll.data?.data?.filter((i: ImportDetail) =>
    i.productItemName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredImportDetails || []).length / 20);

  const handleConfirmAdd = async (
    importId: string,
    quantity: number,
    productItem: ProductItem | null
  ) => {
    if (productItem)
      add.mutate({
        importId,
        productItemId: productItem._id,
        productItemName: productItem.nameProductItem,
        colorId: productItem.colorId,
        sizeId: productItem.sizeId,
        imgProductItem:
          productItem.imageProductItem &&
          productItem.imageProductItem.length > 0
            ? productItem.imageProductItem[0]
            : '',
        quantity,
      });
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Chi Tiết Nhập Hàng</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-import-details'
          type='text'
          placeholder='Tìm kiếm lô hàng chi tiết...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpen(true)}>
          Thêm chi tiết nhập hàng
        </Button>
        <AddImportModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={handleConfirmAdd}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Ảnh</th>
              <th className='px-4 py-2 text-left'>Tên Mặt Hàng Sản Phẩm</th>
              <th className='px-4 py-2 text-left'>Số Lượng</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredImportDetails?.map((iDetail: ImportDetail) => (
              <tr key={iDetail._id}>
                <td className='px-4 py-2'>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={
                        iDetail.imgProductItem &&
                        isValidImageSrc(iDetail.imgProductItem)
                          ? iDetail.imgProductItem
                          : placeholderImage
                      }
                      alt={iDetail.productItemName}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                </td>
                <td className='px-4 py-2'>{iDetail.productItemName}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {iDetail.quantity}
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
