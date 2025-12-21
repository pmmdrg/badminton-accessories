import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import { useSupplierAdmin } from '@/hooks/admin/useSupplier';
import { useEffect, useState } from 'react';

interface EditSupplierModalProps {
  supplierId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (nameSupplier: string, address: string) => void;
}

export default function EditSupplierModal({
  supplierId,
  isOpen,
  setIsOpen,
  onConfirm,
}: EditSupplierModalProps) {
  const { getById } = useSupplierAdmin(supplierId);

  const [supplier, setSupplier] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!getById.data?.data) return;

    setSupplier(getById.data.data.nameSupplier);
    setAddress(getById.data.data.address);
  }, [isOpen, getById.data]);

  const resetState = () => {
    setSupplier('');
    setAddress('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(supplier, address);
        resetState();
        setIsOpen(false);
      }}
      title='Chỉnh Sửa Nhà Cung Cấp'
    >
      <TextField
        name='supplier-name'
        label='Tên nhà cung cấp'
        placeholder='Nhập tên nhà cung cấp'
        value={supplier}
        onChange={(e) => setSupplier(e.target.value)}
        error={supplier === '' ? 'Không để trống tên nhà cung cấp' : ''}
        fullWidth
      />

      <TextField
        label='Địa chỉ'
        name='address'
        placeholder='Nhập địa chỉ'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={address === '' ? 'Không để trống địa chỉ' : ''}
        fullWidth
      />
    </Modal>
  );
}
