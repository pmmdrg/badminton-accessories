'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProductAdmin } from '@/hooks/admin/useProduct';
import { Product } from '@/models/product';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { STATUS } from '@/lib/constants';
import { capitalizeFirst, isValidImageSrc, normalizedDate } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/custom/pagination';
import AddProdModal from './addProdModal';
import { useUpload } from '@/hooks/useUpload';
import { upload } from '@imagekit/next';
import EditProdModal from './editProdModal';
import { UploadProgress } from '@/components/custom/uploadProgress';

export default function AdminProductPage() {
  const { getIKToken } = useUpload();
  const { getAll, add, edit, remove, restore } = useProductAdmin();

  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [progress, setProgress] = useState(0);

  const filteredProducts = getAll.data?.data?.filter((p: Product) =>
    p.nameProduct.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredProducts || []).length / 20);

  const handleConfirmAdd = async (
    brand: string,
    cate: string,
    sizeType: string,
    nameProduct: string,
    description?: string,
    file?: File | null
  ) => {
    let imageUrl = '';

    if (file) {
      await getIKToken.mutateAsync(file);

      if (getIKToken.isSuccess) {
        const res = await upload({
          file,
          fileName: file.name,
          signature: getIKToken.data.signature,
          token: getIKToken.data.token,
          expire: getIKToken.data.expire,
          publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY || '',
          onProgress: (e) =>
            setProgress(Math.round((e.loaded / e.total) * 100)),
        });

        imageUrl = res.url ?? '';

        add.mutate({
          brandId: brand,
          cateId: cate,
          sizeTypeId: sizeType,
          nameProduct,
          imageProduct: imageUrl,
          description: description || '',
        });
      }
    } else {
      add.mutate({
        brandId: brand,
        cateId: cate,
        sizeTypeId: sizeType,
        nameProduct,
        imageProduct: '',
        description: description || '',
      });
    }
  };

  const handleConfirmEdit = async (
    brand: string,
    cate: string,
    sizeType: string,
    nameProduct: string,
    description?: string,
    file?: File | null
  ) => {
    let imageUrl = '';

    if (file) {
      await getIKToken.mutateAsync(file);

      if (getIKToken.isSuccess) {
        const res = await upload({
          file,
          fileName: file.name,
          signature: getIKToken.data.signature,
          token: getIKToken.data.token,
          expire: getIKToken.data.expire,
          publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY || '',
          onProgress: (e) =>
            setProgress(Math.round((e.loaded / e.total) * 100)),
        });

        imageUrl = res.url ?? '';

        edit.mutate({
          id: selectedId,
          payload: {
            brandId: brand,
            cateId: cate,
            sizeTypeId: sizeType,
            nameProduct,
            imageProduct: imageUrl,
            description: description || '',
          },
        });
      }
    } else {
      edit.mutate({
        id: selectedId,
        payload: {
          brandId: brand,
          cateId: cate,
          sizeTypeId: sizeType,
          nameProduct,
          imageProduct: '',
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
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Sản Phẩm</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-product'
          type='text'
          placeholder='Tìm kiếm sản phẩm...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpenAdd(true)}>
          Thêm sản phẩm
        </Button>
        <AddProdModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditProdModal
          prodId={selectedId}
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
              <th className='px-4 py-2 text-left'>Tên Sản Phẩm</th>
              <th className='px-4 py-2 text-left'>Mã Sản Phẩm</th>
              <th className='px-4 py-2 text-left'>Mô Tả</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredProducts?.map((product: Product) => (
              <tr key={product._id}>
                <td className='px-4 py-2'>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={
                        product.imageProduct &&
                        isValidImageSrc(product.imageProduct)
                          ? product.imageProduct
                          : placeholderImage
                      }
                      alt={product.nameProduct}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                </td>
                <td className='px-4 py-2'>{product.nameProduct}</td>
                <td className='px-4 py-2'>{product._id}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {product.description}
                </td>
                <td className='px-4 py-2'>{capitalizeFirst(product.status)}</td>
                <td className='px-4 py-2'>
                  {normalizedDate(product.created_at)}
                </td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(product._id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {product.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(product._id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(product._id)}
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
