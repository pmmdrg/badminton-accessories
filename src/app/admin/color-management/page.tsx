'use client';

import { useState } from 'react';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { COUNTRY_CODE, STATUS } from '@/lib/constants';
import Pagination from '@/components/custom/pagination';
import { useColorAdmin } from '@/hooks/admin/useColor';
import { Color } from '@/models/color';
import EditColorModal from './editColorModal';
import AddColorModal from './addColorModal';
import { capitalizeFirst } from '@/lib/utils';

export default function AdminColorPage() {
  const { getAll, add, edit, remove, restore } = useColorAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const filteredColors = getAll.data?.data?.filter((s: Color) =>
    s.nameColor.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredColors || []).length / 20);

  const handleConfirmAdd = async (colorName: string, description: string) => {
    add.mutate({
      nameColor: colorName,
      description,
    });
  };

  const handleConfirmEdit = async (colorName: string, description: string) => {
    edit.mutate({
      id: selectedId,
      payload: {
        nameColor: colorName,
        description,
      },
    });

    setSelectedId('');
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Màu</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-color'
          type='text'
          placeholder='Tìm kiếm màu...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpenAdd(true)}>
          Thêm màu
        </Button>
        <AddColorModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditColorModal
          colorId={selectedId}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          onConfirm={handleConfirmEdit}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Tên Màu</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredColors?.map((color: Color) => (
              <tr key={color._id}>
                <td className='px-4 py-2'>{color.nameColor}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {color.description}
                </td>
                <td className='px-4 py-2'>{capitalizeFirst(color.status)}</td>
                <td className='px-4 py-2'>
                  {new Date(color.created_at).toLocaleDateString(
                    COUNTRY_CODE.VN
                  )}
                </td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(color._id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {color.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(color._id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(color._id)}
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
