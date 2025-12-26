'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductItem } from '@/models/productItem';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { COUNTRY_CODE, STATUS } from '@/lib/constants';
import { capitalizeFirst, isValidImageSrc, normalizedDate } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/custom/pagination';
import AddProdItemModal from './addProdItemModal';
import { useProductItemAdmin } from '@/hooks/admin/useProductItem';
import { useUpload } from '@/hooks/useUpload';
import { upload } from '@imagekit/next';
import EditProdItemModal from '../product-item-management/editProdItemModal';
import { UploadProgress } from '@/components/custom/uploadProgress';

export default function AdminProductItemPage() {
  const { getIKToken } = useUpload();
  const { getAll, add, edit, remove, restore } = useProductItemAdmin();

  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [progress, setProgress] = useState(0);

  const filteredProductItems = getAll.data?.data?.filter((pi: ProductItem) =>
    pi.nameProductItem.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredProductItems || []).length / 20);

  const handleConfirmAdd = async (
    product: string,
    size: string,
    color: string,
    nameProductItem: string,
    files: File[],
    price: number,
    description?: string
  ) => {
    let imageUrls: string[] = [];

    try {
      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const tokenRes = await getIKToken.mutateAsync(file);

          if (tokenRes?.signature && tokenRes?.token) {
            const uploadRes = await upload({
              file,
              fileName: file.name,
              signature: tokenRes.signature,
              token: tokenRes.token,
              expire: tokenRes.expire,
              publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY || '',
              onProgress: (e) =>
                setProgress(Math.round((e.loaded / e.total) * 100)),
            });

            return uploadRes.url ?? null;
          }
          return null;
        });

        const results = await Promise.all(uploadPromises);

        imageUrls = results.filter((url): url is string => url !== null);
      }

      add.mutate({
        productId: product,
        sizeId: size,
        colorId: color,
        nameProductItem,
        imageProductItem: imageUrls,
        description: description || '',
        price: price,
      });
    } catch (err) {
      console.error('Lỗi trong quá trình xử lý:', err);
    }
  };

  const handleConfirmEdit = async (
    nameProductItem: string,
    files: File[],
    price: number,
    description?: string
  ) => {
    let imageUrls: string[] = [];

    try {
      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const tokenRes = await getIKToken.mutateAsync(file);

          if (tokenRes?.signature && tokenRes?.token) {
            const uploadRes = await upload({
              file,
              fileName: file.name,
              signature: tokenRes.signature,
              token: tokenRes.token,
              expire: tokenRes.expire,
              publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY || '',
              onProgress: (e) =>
                setProgress(Math.round((e.loaded / e.total) * 100)),
            });

            return uploadRes.url ?? null;
          }
          return null;
        });

        const results = await Promise.all(uploadPromises);

        imageUrls = results.filter((url): url is string => url !== null);
      }

      edit.mutate({
        id: selectedId,
        payload: {
          nameProductItem,
          imageProductItem: imageUrls,
          description: description || '',
          price: price,
        },
      });
    } catch (err) {
      console.error('Lỗi trong quá trình xử lý:', err);
    }
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <UploadProgress value={progress} />
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Mặt Hàng Sản Phẩm</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-product-item'
          type='text'
          placeholder='Tìm kiếm mặt hàng sản phẩm...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-md'
        />
        <Button variant='info' onClick={() => setIsOpenAdd(true)}>
          Thêm mặt hàng sản phẩm
        </Button>
        <AddProdItemModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditProdItemModal
          prodItemId={selectedId}
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
              <th className='px-4 py-2 text-left'>Tên Mặt Hàng</th>
              <th className='px-4 py-2 text-left'>SKU</th>
              <th className='px-4 py-2 text-left'>Giá</th>
              <th className='px-4 py-2 text-left'>SL</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredProductItems
              ?.slice((currPage - 1) * 20, (currPage - 1) * 20 + 20)
              .map((productItem: ProductItem) => (
                <tr key={productItem._id}>
                  <td className='px-4 py-2'>
                    <div className='w-16 h-16 relative'>
                      <Image
                        src={
                          productItem.imageProductItem &&
                          isValidImageSrc(productItem.imageProductItem[0])
                            ? productItem.imageProductItem[0]
                            : placeholderImage
                        }
                        alt={productItem.nameProductItem}
                        fill
                        className='object-cover rounded'
                      />
                    </div>
                  </td>
                  <td className='px-4 py-2'>{productItem.nameProductItem}</td>
                  <td className='px-4 py-2'>{productItem._id}</td>
                  <td className='px-4 py-2 text-rose-700 font-semibold'>
                    {productItem.price.toLocaleString(COUNTRY_CODE.VN)}₫
                  </td>
                  <td className='px-4 py-2'>{productItem.quantity}</td>
                  <td className='px-4 py-2'>
                    {capitalizeFirst(productItem.status)}
                  </td>
                  <td className='px-4 py-2'>
                    {normalizedDate(productItem.created_at)}
                  </td>
                  <td className='px-4 py-2'>
                    <div className='flex gap-2'>
                      <Button
                        variant='info'
                        className='px-2 py-1'
                        onClick={() => {
                          setSelectedId(productItem._id);
                          setIsOpenEdit(true);
                        }}
                      >
                        Sửa
                      </Button>
                      {productItem.status === STATUS.ACTIVE ? (
                        <Button
                          variant='danger'
                          className='px-2 py-1'
                          onClick={() => remove.mutate(productItem._id)}
                        >
                          Xoá
                        </Button>
                      ) : (
                        <Button
                          variant='success'
                          className='px-2 py-1'
                          onClick={() => restore.mutate(productItem._id)}
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
