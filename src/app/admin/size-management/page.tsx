'use client';

import { useState } from 'react';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { COUNTRY_CODE, STATUS } from '@/lib/constants';
import Pagination from '@/components/custom/pagination';
import { useSizeAdmin } from '@/hooks/admin/useSize';
import { Size } from '@/models/size';
import EditSizeModal from './editSizeModal';
import AddSizeModal from './addSizeModal';
import { capitalizeFirst } from '@/lib/utils';

export default function AdminSizePage() {
  const { getAll, add, edit, remove, restore } = useSizeAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const filteredSizes = getAll.data?.data?.filter((s: Size) =>
    s.nameSize.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredSizes || []).length / 20);

  const handleConfirmAdd = async (
    sizeName: string,
    sizeTypeId: string,
    description: string
  ) => {
    add.mutate({
      nameSize: sizeName,
      sizeTypeId,
      description,
    });
  };

  const handleConfirmEdit = async (
    sizeName: string,
    sizeTypeId: string,
    description: string
  ) => {
    edit.mutate({
      id: selectedId,
      payload: {
        nameSize: sizeName,
        sizeTypeId,
        description,
      },
    });

    setSelectedId('');
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Kích Thước</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-size'
          type='text'
          placeholder='Tìm kiếm kích thước...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpenAdd(true)}>
          Thêm kích thước
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

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Tên Kích Thước</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredSizes?.map((size: Size) => (
              <tr key={size._id}>
                <td className='px-4 py-2'>{size.nameSize}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {size.description}
                </td>
                <td className='px-4 py-2'>{capitalizeFirst(size.status)}</td>
                <td className='px-4 py-2'>
                  {new Date(size.created_at).toLocaleDateString(
                    COUNTRY_CODE.VN
                  )}
                </td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(size._id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {size.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(size._id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(size._id)}
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
