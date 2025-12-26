import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import { useBrandAdmin } from '@/hooks/admin/useBrand';
import { isValidImageSrc } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface EditBrandModalProps {
  brandId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    nameBrand: string,
    country: string,
    description?: string,
    file?: File | null
  ) => void;
}

export default function EditBrandModal({
  brandId,
  isOpen,
  setIsOpen,
  onConfirm,
}: EditBrandModalProps) {
  const { getById } = useBrandAdmin(brandId);

  const [brand, setBrand] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!getById.data?.data) return;

    setBrand(getById.data.data.nameBrand);
    setCountry(getById.data.data.country);
    setDescription(getById.data.data.description);
    setPreview(getById.data.data.imageProduct);
  }, [isOpen, getById.data]);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const resetState = () => {
    setBrand('');
    setDescription('');
    setFile(null);
    setCountry('');
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
        onConfirm(brand, country, description, file);
        resetState();
        setIsOpen(false);
      }}
      title='Chỉnh Sửa Thương Hiệu'
    >
      <TextField
        name='brand-name'
        label='Tên thương hiệu'
        placeholder='Nhập tên thương hiệu'
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        error={brand === '' ? 'Không để trống tên thương hiệu' : ''}
        fullWidth
      />

      <TextField
        name='country'
        label='Tên quốc gia'
        placeholder='Nhập tên quốc gia'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        error={country === '' ? 'Không để trống tên quốc gia' : ''}
        fullWidth
      />

      <TextField
        label='Mô tả'
        name='desctiption'
        placeholder='Nhập mô tả'
        value={description}
        multiline={5}
        onChangeForMultiline={(e) => setDescription(e.target.value)}
        fullWidth
      />

      <div className='m-2'>
        <p className='text-sm font-medium'>Xem trước ảnh</p>
        <div className='w-40 h-40 overflow-hidden rounded-lg border border-dashed border-gray-400'>
          {preview && isValidImageSrc(preview) && (
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
        label='Ảnh thương hiệu'
        name='brand-image'
        type='file'
        accept='image/*'
        onChange={handleSelectImage}
      />
    </Modal>
  );
}
