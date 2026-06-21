'use client';

import { useState } from 'react';

import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import { Import } from '@/models/import';
import AddImportModal from './addImportModal';
import { useImportManager } from '@/hooks/manager/useImport';
import { normalizedDate } from '@/lib/utils';
import { useImportDetailManager } from '@/hooks/manager/useImportDetail';
import AddImportDetailModal from './addImportDetailModal';
import { ProductItem } from '@/models/productItem';
import ImportDetailModal from './importDetailModal';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ManagerImportPage() {
  const { getAll, add } = useImportManager();
  const { add: addDetail } = useImportDetailManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpenAddImport, setIsOpenAddImport] = useState(false);
  const [isOpenAddImportDetail, setIsOpenAddImportDetail] = useState(false);
  const [isOpenViewImportDetail, setIsOpenViewImportDetail] = useState(false);
  const [selectedImportId, setSelectedImportId] = useState('');

  const filteredImports = getAll.data?.data?.filter((i: Import) =>
    i.title.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredImports || []).length / 20);

  const handleConfirmAddImport = async (
    supplierId: string,
    title: string,
    description?: string,
  ) => {
    add.mutate({
      supplierId,
      title,
      description: description || '',
    });
  };

  const handleConfirmAddImportDetail = async (
    quantity: number,
    productItem: ProductItem | null,
  ) => {
    if (selectedImportId && selectedImportId !== '' && productItem)
      addDetail.mutate({
        importId: selectedImportId,
        productItemId: productItem.id,
        nameProductItem: productItem.nameProductItem,
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
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Nhập Hàng</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-8'>
        <TextField
          name='search-imports'
          type='text'
          placeholder='Tìm kiếm lô hàng...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endIcon={<MagnifyingGlassIcon className='w-5 h-5' />}
          className='w-sm sm:max-w-full'
        />
        <Button variant='success' onClick={() => setIsOpenAddImport(true)}>
          Thêm lô hàng
        </Button>
        <AddImportModal
          isOpen={isOpenAddImport}
          setIsOpen={setIsOpenAddImport}
          onConfirm={handleConfirmAddImport}
        />
        <AddImportDetailModal
          isOpen={isOpenAddImportDetail}
          setIsOpen={setIsOpenAddImportDetail}
          onConfirm={handleConfirmAddImportDetail}
          title={
            getAll.data?.data?.find((i: Import) => i.id === selectedImportId)
              ?.title || ''
          }
        />
        <ImportDetailModal
          isOpen={isOpenViewImportDetail}
          setIsOpen={setIsOpenViewImportDetail}
          importId={selectedImportId}
        />
      </div>

      <div className='overflow-x-auto bg-gradient-to-br from-white/20 via-gray-200 to-gray-300 border border-white/30 backdrop-blur-md rounded-2xl shadow-xl'>
        <table className='min-w-full divide-y divide-gray-400'>
          <thead className='bg-gray-300'>
            <tr>
              <th className='px-4 py-2 text-left'>Tiêu Đề</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Ngày Nhập</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-400'>
            {filteredImports?.map((i: Import) => (
              <tr
                key={i.id}
                className='cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImportId(i.id);
                  setIsOpenViewImportDetail(true);
                }}
              >
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {i.title}
                </td>
                <td className='px-4 py-2'>{i.description}</td>
                <td className='px-4 py-2'>{normalizedDate(i.importDate)}</td>
                <td className='px-4 py-2'>
                  <Button
                    variant='info'
                    className='px-2 py-1'
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImportId(i.id);
                      setIsOpenAddImportDetail(true);
                    }}
                  >
                    Thêm chi tiết
                  </Button>
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
