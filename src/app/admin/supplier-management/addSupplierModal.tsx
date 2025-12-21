import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import { useState } from 'react';

interface AddSupplierModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (nameSupplier: string, address: string) => void;
}

export default function AddSupplierModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddSupplierModalProps) {
  const [supplier, setSupplier] = useState('');
  const [address, setAddress] = useState('');

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
      title='Thêm Nhà Cung Cấp'
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
        placeholder='Nhập địa chỉ nhà cung cấp'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={address === '' ? 'Không để trống địa chỉ' : ''}
        fullWidth
      />
    </Modal>
  );
}
