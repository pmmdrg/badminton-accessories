import Modal from '@/components/custom/modal';
import Select from '@/components/custom/select';
import TextField from '@/components/custom/textfield';
import { useSizeAdmin } from '@/hooks/admin/useSize';
import { useSizeTypeAdmin } from '@/hooks/admin/useSizeType';
import { normalizedSelectOptions } from '@/lib/utils';
import { SizeType } from '@/models/sizeType';
import { useEffect, useState } from 'react';

interface EditSizeModalProps {
  sizeId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    nameSize: string,
    sizeTypeId: string,
    description: string
  ) => void;
}

export default function EditSizeModal({
  sizeId,
  isOpen,
  setIsOpen,
  onConfirm,
}: EditSizeModalProps) {
  const sizes = useSizeAdmin(sizeId);
  const sizeTypes = useSizeTypeAdmin();

  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [sizeTypeId, setSizeTypeId] = useState('');

  useEffect(() => {
    if (!sizes.getById.data?.data) return;

    setSize(sizes.getById.data.data.nameSize);
    setDescription(sizes.getById.data.data.description);
    setSizeTypeId(sizes.getById.data.data.sizeTypeId);
  }, [isOpen, sizes.getById.data]);

  const sizeTypeOptions = sizeTypes.getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...sizeTypes.getAll.data.data.map((st: SizeType) =>
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
      title='Chỉnh Sửa Kích Thước'
    >
      <Select
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
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
    </Modal>
  );
}
