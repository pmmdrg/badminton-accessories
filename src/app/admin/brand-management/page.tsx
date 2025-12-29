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
import { useBrandAdmin } from '@/hooks/admin/useBrand';
import { Brand } from '@/models/brand';
import { useUpload } from '@/hooks/useUpload';
import { upload } from '@imagekit/next';
import AddBrandModal from './addBrandModal';
import EditBrandModal from './editBrandModal';
import { UploadProgress } from '@/components/custom/uploadProgress';

export default function AdminBrandPage() {
  const { getIKToken } = useUpload();
  const { getAll, add, edit, remove, restore } = useBrandAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [progress, setProgress] = useState(0);

  const filteredBrands = getAll.data?.data?.filter((b: Brand) =>
    b.nameBrand.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredBrands || []).length / 20);

  const handleConfirmAdd = async (
    brandName: string,
    country: string,
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
        nameBrand: brandName,
        country,
        imageBrand: imageUrl,
        description: description || '',
      });
    } else {
      add.mutate({
        nameBrand: brandName,
        country,
        imageBrand: '',
        description: description || '',
      });
    }
  };

  const handleConfirmEdit = async (
    brandName: string,
    country: string,
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
          nameBrand: brandName,
          country,
          imageBrand: imageUrl,
          description: description || '',
        },
      });
    } else {
      edit.mutate({
        id: selectedId,
        payload: {
          nameBrand: brandName,
          country,
          imageBrand: '',
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
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Thương Hiệu</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-brand'
          type='text'
          placeholder='Tìm kiếm thương hiệu...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpenAdd(true)}>
          Thêm thương hiệu
        </Button>
        <AddBrandModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditBrandModal
          brandId={selectedId}
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
              <th className='px-4 py-2 text-left'>Tên</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Quốc Gia</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredBrands?.map((brand: Brand) => (
              <tr key={brand._id}>
                <td className='px-4 py-2'>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={
                        brand.imageBrand && isValidImageSrc(brand.imageBrand)
                          ? brand.imageBrand
                          : placeholderImage
                      }
                      alt={brand.nameBrand}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                </td>
                <td className='px-4 py-2'>{brand.nameBrand}</td>
                <td className='px-4 py-2'>{brand.description}</td>
                <td className='px-4 py-2'>{brand.country}</td>
                <td className='px-4 py-2'>{capitalizeFirst(brand.status)}</td>
                <td className='px-4 py-2'>
                  {normalizedDate(brand.created_at)}
                </td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(brand._id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {brand.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(brand._id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1 bg-red-500 hover:bg-red-700 text-white'
                        onClick={() => restore.mutate(brand._id)}
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
