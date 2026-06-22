import Modal from '@/components/modal';
import { SelectString } from '@/components/select';
import TextField from '@/components/textfield';
import { useSizeAdmin } from '@/hooks/admin/useSize';
import { useSizeTypeAdmin } from '@/hooks/admin/useSizeType';
import { normalizedSelectOptions } from '@/lib/utils';
import { SizeType } from '@/models/sizeType';
import { useEffect, useState } from 'react';

interface EditSizeModalProps {
  sizeId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (nameSize: string, description: string) => void;
}

export default function EditSizeModal({
  sizeId,
  isOpen,
  setIsOpen,
  onConfirm,
}: EditSizeModalProps) {
  const { getById } = useSizeAdmin(sizeId);
  const { getAll } = useSizeTypeAdmin();

  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [sizeTypeId, setSizeTypeId] = useState('');

  useEffect(() => {
    if (!getById.data?.data) return;

    setSize(getById.data.data.nameSize);
    setDescription(getById.data.data.description);
    setSizeTypeId(getById.data.data.sizeTypeId);
  }, [isOpen, getById.data]);

  const sizeTypeOptions = getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...getAll.data.data.map((st: SizeType) =>
          normalizedSelectOptions(st.description, st.id),
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
        onConfirm(size, description);
        resetState();
        setIsOpen(false);
      }}
      title='Chỉnh Sửa Kích Thước'
    >
      <SelectString
        label='Loại kích thước'
        value={sizeTypeId}
        onChange={setSizeTypeId}
        options={sizeTypeOptions}
        className='ml-2'
        disable
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
