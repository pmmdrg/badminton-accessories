'use client';

import { useState } from 'react';
import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import Button from '@/components/button';
import { STATUS } from '@/lib/constants';
import Pagination from '@/components/pagination';
import { useSizeAdmin } from '@/hooks/admin/useSize';
import { Size } from '@/models/size';
import EditSizeModal from './editSizeModal';
import AddSizeModal from './addSizeModal';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function AdminSizePage() {
  const { getAllWithSizeTypeName, add, edit, remove, restore } = useSizeAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const filteredSizes = getAllWithSizeTypeName.data?.data?.filter((s: Size) =>
    s.nameSize.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredSizes || []).length / 20);

  const handleConfirmAdd = async (
    sizeName: string,
    sizeTypeId: string,
    description: string,
  ) => {
    add.mutate({
      nameSize: sizeName,
      sizeTypeId,
      description,
    });
  };

  const handleConfirmEdit = async (sizeName: string, description: string) => {
    edit.mutate({
      id: selectedId,
      payload: {
        nameSize: sizeName,
        description,
      },
    });

    setSelectedId('');
  };

  if (getAllWithSizeTypeName.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Kích Thước</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-size'
          type='text'
          placeholder='Tìm kiếm kích thước...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endIcon={<MagnifyingGlassIcon className='w-5 h-5' />}
          className='w-sm sm:max-w-full'
        />
        <Button variant='success' onClick={() => setIsOpenAdd(true)}>
          Thêm Kích Thước
        </Button>
        <AddSizeModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditSizeModal
          sizeId={selectedId}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          onConfirm={handleConfirmEdit}
        />
      </div>

      <div className='overflow-x-auto bg-gradient-to-br from-white/20 via-gray-200 to-gray-300 border border-white/30 backdrop-blur-md rounded-2xl shadow-xl'>
        <table className='min-w-full divide-y divide-gray-400'>
          <thead className='bg-gray-300'>
            <tr>
              <th className='px-4 py-2 text-left'>Tên Kích Thước</th>
              <th className='px-4 py-2 text-left'>Loại</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-400'>
            {filteredSizes?.map((size: Size) => (
              <tr key={size.id}>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {size.nameSize}
                </td>
                <td className='px-4 py-2 font-semibold'>{size.nameSizeType}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {size.description}
                </td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    {
                      'text-green-600': size.status === STATUS.ACTIVE,
                      'text-red-600': size.status === STATUS.INACTIVE,
                    },
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(size.status)}
                </td>
                <td className='px-4 py-2'>{normalizedDate(size.created_at)}</td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(size.id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {size.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(size.id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(size.id)}
                      >
                        Khôi Phục
                      </Button>
                    )}
                  </div>
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
