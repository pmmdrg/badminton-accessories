import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import { useState } from 'react';

interface AddPaymentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (namePayment: string) => void;
}

export default function AddPaymentModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddPaymentModalProps) {
  const [payment, setPayment] = useState('');

  const resetState = () => {
    setPayment('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(payment);
        resetState();
        setIsOpen(false);
      }}
      title='Thêm Phương Thức Thanh Toán'
    >
      <TextField
        name='payment-name'
        label='Tên phương thức thanh toán'
        placeholder='Nhập tên phương thức thanh toán'
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
        error={
          payment === '' ? 'Không để trống tên phương thức thanh toán' : ''
        }
        fullWidth
      />
    </Modal>
  );
}
