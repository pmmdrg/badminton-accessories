'use client';

import { useState } from 'react';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { STATUS } from '@/lib/constants';
import Pagination from '@/components/custom/pagination';
import { useSizeTypeAdmin } from '@/hooks/admin/useSizeType';
import { SizeType } from '@/models/sizeType';
import EditSizeTypeModal from './editSizeTypeModal';
import AddSizeTypeModal from './addSizeTypeModal';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';

export default function AdminSizeTypePage() {
  const { getAll, add, edit, remove, restore } = useSizeTypeAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const filteredSizeTypes = getAll.data?.data?.filter((s: SizeType) =>
    s.nameSizeType.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredSizeTypes || []).length / 20);

  const handleConfirmAdd = async (
    sizeTypeName: string,
    description: string
  ) => {
    add.mutate({
      nameSizeType: sizeTypeName,
      description,
    });
  };

  const handleConfirmEdit = async (
    sizeTypeName: string,
    description: string
  ) => {
    edit.mutate({
      id: selectedId,
      payload: {
        nameSizeType: sizeTypeName,
        description,
      },
    });

    setSelectedId('');
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Loại Kích Thước</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-sizeType'
          type='text'
          placeholder='Tìm kiếm loại kích thước...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpenAdd(true)}>
          Thêm loại kích thước
        </Button>
        <AddSizeTypeModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditSizeTypeModal
          sizeTypeId={selectedId}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          onConfirm={handleConfirmEdit}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Loại Kích Thước</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredSizeTypes?.map((sizeType: SizeType) => (
              <tr key={sizeType._id}>
                <td className='px-4 py-2'>{sizeType.nameSizeType}</td>

                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {sizeType.description}
                </td>

                <td className='px-4 py-2'>
                  {capitalizeFirst(sizeType.status)}
                </td>
                <td className='px-4 py-2'>
                  {normalizedDate(sizeType.created_at)}
                </td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(sizeType._id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {sizeType.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(sizeType._id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(sizeType._id)}
                      >
                        Khôi phục
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
