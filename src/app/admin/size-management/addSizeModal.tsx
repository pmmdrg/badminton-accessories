import Modal from '@/components/custom/modal';
import { SelectString } from '@/components/custom/select';
import TextField from '@/components/custom/textfield';
import { useSizeTypeAdmin } from '@/hooks/admin/useSizeType';
import { normalizedSelectOptions } from '@/lib/utils';
import { SizeType } from '@/models/sizeType';
import { useState } from 'react';

interface AddSizeModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    nameSize: string,
    sizeTypeId: string,
    description: string
  ) => void;
}

export default function AddSizeModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddSizeModalProps) {
  const { getAll } = useSizeTypeAdmin();
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [sizeTypeId, setSizeTypeId] = useState('');

  const sizeTypeOptions = getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...getAll.data.data.map((st: SizeType) =>
          normalizedSelectOptions(st.description, st._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const resetState = () => {
    setSize('');
    setDescription('');
    setSizeTypeId('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(size, sizeTypeId, description);
        resetState();
        setIsOpen(false);
      }}
      title='Thêm Kích Thước'
    >
      <SelectString
        label='Loại kích thước'
        value={sizeTypeId}
        onChange={setSizeTypeId}
        options={sizeTypeOptions}
        className='ml-2'
      />

      <TextField
        name='size-name'
        label='Tên kích thước'
        placeholder='Nhập tên kích thước'
        value={size}
        onChange={(e) => setSize(e.target.value)}
        error={size === '' ? 'Không để trống tên kích thước' : ''}
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
