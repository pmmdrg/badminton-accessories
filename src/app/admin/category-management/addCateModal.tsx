import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import Image from 'next/image';
import { useState } from 'react';

interface AddCateModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    nameCate: string,
    description?: string,
    file?: File | null
  ) => void;
}

export default function AddCateModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddCateModalProps) {
  const [cate, setCate] = useState('');
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
    setCate('');
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
        onConfirm(cate, description, file);
        resetState();
        setIsOpen(false);
      }}
      title='Thêm Danh Mục'
    >
      <TextField
        name='cate-name'
        label='Tên danh mục'
        placeholder='Nhập tên danh mục'
        value={cate}
        onChange={(e) => setCate(e.target.value)}
        error={cate === '' ? 'Không để trống tên danh mục' : ''}
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
        label='Ảnh danh mục'
        name='cate-image'
        type='file'
        accept='image/*'
        onChange={handleSelectImage}
      />
    </Modal>
  );
}
