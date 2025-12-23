import Modal from '@/components/custom/modal';
import { SelectString } from '@/components/custom/select';
import TextField from '@/components/custom/textfield';
import { useBrandAdmin } from '@/hooks/admin/useBrand';
import { useCateAdmin } from '@/hooks/admin/useCate';
import { useSizeTypeAdmin } from '@/hooks/admin/useSizeType';
import { normalizedSelectOptions } from '@/lib/utils';
import { Brand } from '@/models/brand';
import { Cate } from '@/models/cate';
import { SizeType } from '@/models/sizeType';
import Image from 'next/image';
import { useState } from 'react';

interface AddProdModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    brand: string,
    cate: string,
    sizeType: string,
    nameProduct: string,
    description?: string,
    file?: File | null
  ) => void;
}

export default function AddProdModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddProdModalProps) {
  const brands = useBrandAdmin();
  const cates = useCateAdmin();
  const sizeTypes = useSizeTypeAdmin();

  const [brand, setBrand] = useState('');
  const [cate, setCate] = useState('');
  const [sizeType, setSizeType] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const brandOptions = brands.getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...brands.getAll.data.data.map((brand: Brand) =>
          normalizedSelectOptions(brand.nameBrand, brand._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const cateOptions = cates.getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...cates.getAll.data.data.map((cate: Cate) =>
          normalizedSelectOptions(cate.nameCate, cate._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const sizeTypeOptions = sizeTypes.getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...sizeTypes.getAll.data.data.map((sizeType: SizeType) =>
          normalizedSelectOptions(sizeType.description, sizeType._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const resetState = () => {
    setBrand('');
    setCate('');
    setDescription('');
    setFile(null);
    setProductName('');
    setSizeType('');
    setPreview(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(brand, cate, sizeType, productName, description, file);
        resetState();
        setIsOpen(false);
      }}
      title='Thêm Sản Phẩm'
    >
      <div className='flex gap-8 mx-2 mb-2'>
        <SelectString
          label='Thương hiệu'
          value={brand}
          options={brandOptions}
          onChange={setBrand}
        />
        <SelectString
          label='Danh mục'
          value={cate}
          options={cateOptions}
          onChange={setCate}
        />
      </div>

      <SelectString
        label='Loại kích thước'
        value={sizeType}
        options={sizeTypeOptions}
        onChange={setSizeType}
        className='mx-2'
      />

      <TextField
        name='product-name'
        label='Tên sản phẩm'
        placeholder='Nhập tên sản phẩm'
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        error={productName === '' ? 'Không để trống tên sản phẩm' : ''}
        fullWidth
      />

      <TextField
        label='Mô tả'
        name='desctiption'
        placeholder='Nhập mô tả'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />

      <div className='m-2'>
        <p className='text-sm font-medium'>Xem trước ảnh</p>
        <div className='w-40 h-40 overflow-hidden rounded-lg border border-dashed border-gray-400'>
          {preview && (
            <Image
              src={preview}
              width={160}
              height={160}
              alt='Preview'
              className='object-cover'
            />
          )}
        </div>
      </div>

      <TextField
        label='Ảnh sản phẩm'
        name='product-image'
        type='file'
        accept='image/*'
        onChange={handleSelectImage}
      />
    </Modal>
  );
}
