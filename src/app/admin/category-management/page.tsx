'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { STATUS } from '@/lib/constants';
import { capitalizeFirst, isValidImageSrc, normalizedDate } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/custom/pagination';
import { useCateAdmin } from '@/hooks/admin/useCate';
import { Cate } from '@/models/cate';
import { useUpload } from '@/hooks/useUpload';
import { upload } from '@imagekit/next';
import AddCateModal from './addCateModal';
import EditCateModal from './editCateModal';
import { UploadProgress } from '@/components/custom/uploadProgress';

export default function AdminCategoryPage() {
  const { getIKToken } = useUpload();
  const { getAll, add, edit, remove, restore } = useCateAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [progress, setProgress] = useState(0);

  const filteredCates = getAll.data?.data?.filter((c: Cate) =>
    c.nameCate.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredCates || []).length / 20);

  const handleConfirmAdd = async (
    cateName: string,
    description?: string,
    file?: File | null
  ) => {
    let imageUrl = '';

    if (file) {
      const tokenRes = await getIKToken.mutateAsync(file);

      const res = await upload({
        file,
        fileName: file.name,
        signature: tokenRes.signature,
        token: tokenRes.token,
        expire: tokenRes.expire,
        publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY || '',
        onProgress: (e) => setProgress(Math.round((e.loaded / e.total) * 100)),
      });

      imageUrl = res.url ?? '';

      add.mutate({
        nameCate: cateName,
        imageCate: imageUrl,
        description: description || '',
      });
    } else {
      add.mutate({
        nameCate: cateName,
        imageCate: '',
        description: description || '',
      });
    }
  };

  const handleConfirmEdit = async (
    cateName: string,
    description?: string,
    file?: File | null
  ) => {
    let imageUrl = '';

    if (file) {
      const tokenRes = await getIKToken.mutateAsync(file);

      const res = await upload({
        file,
        fileName: file.name,
        signature: tokenRes.signature,
        token: tokenRes.token,
        expire: tokenRes.expire,
        publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY || '',
        onProgress: (e) => setProgress(Math.round((e.loaded / e.total) * 100)),
      });

      imageUrl = res.url ?? '';

      edit.mutate({
        id: selectedId,
        payload: {
          nameCate: cateName,
          imageCate: imageUrl,
          description: description || '',
        },
      });
    } else {
      edit.mutate({
        id: selectedId,
        payload: {
          nameCate: cateName,
          description: description || '',
        },
      });
    }

    setSelectedId('');
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <UploadProgress value={progress} />
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Danh Mục</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-cates'
          type='text'
          placeholder='Tìm kiếm danh mục...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpenAdd(true)}>
          Thêm danh mục
        </Button>
        <AddCateModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditCateModal
          cateId={selectedId}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          onConfirm={handleConfirmEdit}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Ảnh</th>
              <th className='px-4 py-2 text-left'>Tên Danh Mục</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredCates?.map((cate: Cate) => (
              <tr key={cate._id}>
                <td className='px-4 py-2'>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={
                        cate.imageCate && isValidImageSrc(cate.imageCate)
                          ? cate.imageCate
                          : placeholderImage
                      }
                      alt={cate.nameCate}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                </td>
                <td className='px-4 py-2'>{cate.nameCate}</td>

                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {cate.description}
                </td>

                <td className='px-4 py-2'>{capitalizeFirst(cate.status)}</td>
                <td className='px-4 py-2'>{normalizedDate(cate.created_at)}</td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(cate._id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {cate.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(cate._id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(cate._id)}
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
