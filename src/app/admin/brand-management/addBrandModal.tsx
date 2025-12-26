import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import Image from 'next/image';
import { useState } from 'react';

interface AddBrandModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    nameBrand: string,
    country: string,
    description?: string,
    file?: File | null
  ) => void;
}

export default function AddBrandModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddBrandModalProps) {
  const [brand, setBrand] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
      title='Thêm Thương Hiệu'
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
        label='Ảnh thương hiệu'
        name='brand-image'
        type='file'
        accept='image/*'
        onChange={handleSelectImage}
      />
    </Modal>
  );
}
