import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import { useState } from 'react';

interface AddColorModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (nameColor: string, description: string) => void;
}

export default function AddColorModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddColorModalProps) {
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');

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
      title='Thêm Màu'
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
        multiline={5}
        onChangeForMultiline={(e) => setDescription(e.target.value)}
        fullWidth
      />
    </Modal>
  );
}
