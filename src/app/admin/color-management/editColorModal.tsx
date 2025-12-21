import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import { useColorAdmin } from '@/hooks/admin/useColor';
import { useEffect, useState } from 'react';

interface EditColorModalProps {
  colorId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (nameColor: string, description: string) => void;
}

export default function EditColorModal({
  colorId,
  isOpen,
  setIsOpen,
  onConfirm,
}: EditColorModalProps) {
  const { getById } = useColorAdmin(colorId);

  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!getById.data?.data) return;

    setColor(getById.data.data.nameColor);
    setDescription(getById.data.data.description);
  }, [isOpen, getById.data]);

  const resetState = () => {
    setColor('');
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
        onConfirm(color, description);
        resetState();
        setIsOpen(false);
      }}
      title='Chỉnh Sửa Màu'
    >
      <TextField
        name='color-name'
        label='Tên màu'
        placeholder='Nhập tên màu'
        value={color}
        onChange={(e) => setColor(e.target.value)}
        error={color === '' ? 'Không để trống tên màu' : ''}
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
