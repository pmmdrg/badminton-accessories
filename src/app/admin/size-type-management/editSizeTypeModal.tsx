import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import { useSizeTypeAdmin } from '@/hooks/admin/useSizeType';
import { useEffect, useState } from 'react';

interface EditSizeTypeModalProps {
  sizeTypeId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (nameSizeType: string, description: string) => void;
}

export default function EditSizeTypeModal({
  sizeTypeId,
  isOpen,
  setIsOpen,
  onConfirm,
}: EditSizeTypeModalProps) {
  const { getById } = useSizeTypeAdmin(sizeTypeId);

  const [sizeType, setSizeType] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!getById.data?.data) return;

    setSizeType(getById.data.data.nameSizeType);
    setDescription(getById.data.data.description);
  }, [isOpen, getById.data]);

  const resetState = () => {
    setSizeType('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(sizeType, description);
        resetState();
        setIsOpen(false);
      }}
      title='Chỉnh Sửa Loại Kích Thước'
    >
      <TextField
        name='size-type-name'
        label='Loại kích thước'
        placeholder='Nhập loại kích thước'
        value={sizeType}
        onChange={(e) => setSizeType(e.target.value)}
        error={sizeType === '' ? 'Không để trống loại kích thước' : ''}
        fullWidth
      />

      <TextField
        label='Mô tả'
        name='description'
        placeholder='Nhập mô tả'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
    </Modal>
  );
}
