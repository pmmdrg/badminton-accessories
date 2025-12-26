'use client';

import { useState } from 'react';

import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import Pagination from '@/components/custom/pagination';
import { Import } from '@/models/import';
import AddImportModal from './addImportModal';
import { useImportManager } from '@/hooks/manager/useImport';
import { normalizedDate } from '@/lib/utils';

export default function ManagerImportPage() {
  const { getAll, add } = useImportManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredImports = getAll.data?.data?.filter((i: Import) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredImports || []).length / 20);

  const handleConfirmAdd = async (
    supplierId: string,
    title: string,
    description?: string
  ) => {
    add.mutate({
      supplierId,
      title,
      description: description || '',
    });
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Nhập Hàng</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-imports'
          type='text'
          placeholder='Tìm kiếm lô hàng...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpen(true)}>
          Thêm lô hàng
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
              <th className='px-4 py-2 text-left'>Tiêu Đề</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Ngày Nhập</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredImports?.map((i: Import) => (
              <tr key={i._id}>
                <td className='px-4 py-2'>{i.title}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {i.description}
                </td>
                <td className='px-4 py-2'>{normalizedDate(i.importDate)}</td>
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
