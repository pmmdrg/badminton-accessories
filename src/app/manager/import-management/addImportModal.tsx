import Modal from '@/components/custom/modal';
import { SelectString } from '@/components/custom/select';
import TextField from '@/components/custom/textfield';
import { useSupplierManager } from '@/hooks/manager/useSupplier';
import { normalizedSelectOptions } from '@/lib/utils';
import { Supplier } from '@/models/supplier';
import { useState } from 'react';

interface AddImportModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (supplierId: string, title: string, description?: string) => void;
}

export default function AddImportModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddImportModalProps) {
  const { getAll } = useSupplierManager();
  const [supplier, setSupplier] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const supplierOptions = getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...getAll.data.data.map((supplier: Supplier) =>
          normalizedSelectOptions(supplier.nameSupplier, supplier._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const resetState = () => {
    setSupplier('');
    setDescription('');
    setTitle('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(supplier, title, description);
        resetState();
        setIsOpen(false);
      }}
      title='Thêm Lô Hàng'
    >
      <SelectString
        label='Nhà cung cấp'
        value={supplier}
        options={supplierOptions}
        onChange={setSupplier}
        className='mx-2'
      />

      <TextField
        name='title'
        label='Tiêu đề'
        placeholder='Nhập tiêu đề'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={title === '' ? 'Không để trống tiêu đề' : ''}
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
    </Modal>
  );
}
