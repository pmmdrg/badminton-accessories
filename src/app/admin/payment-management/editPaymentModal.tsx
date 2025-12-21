import Modal from '@/components/custom/modal';
import TextField from '@/components/custom/textfield';
import { usePaymentAdmin } from '@/hooks/admin/usePayment';
import { useEffect, useState } from 'react';

interface EditPaymentModalProps {
  paymentId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (namePayment: string) => void;
}

export default function EditPaymentModal({
  paymentId,
  isOpen,
  setIsOpen,
  onConfirm,
}: EditPaymentModalProps) {
  const { getById } = usePaymentAdmin(paymentId);

  const [payment, setPayment] = useState('');

  useEffect(() => {
    if (!getById.data?.data) return;

    setPayment(getById.data.data.namePayment);
  }, [isOpen, getById.data]);

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
      title='Chỉnh Sửa Phương Thức Thanh Toán'
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
