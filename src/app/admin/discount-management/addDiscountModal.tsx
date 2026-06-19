import Modal from '@/components/modal';
import TextField from '@/components/textfield';
import { useState } from 'react';

interface AddDiscountModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (discountCode: string, valuePromotion: string) => void;
}

export default function AddDiscountModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddDiscountModalProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [valuePromotion, setValuePromotion] = useState('');

  const resetState = () => {
    setDiscountCode('');
    setValuePromotion('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(discountCode, valuePromotion);
        resetState();
        setIsOpen(false);
      }}
      title='Thêm Mã Giảm Giá'
    >
      <TextField
        name='discount-code'
        label='Mã giảm giá'
        placeholder='Nhập mã giảm giá'
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        error={discountCode === '' ? 'Không để trống mã giảm giá' : ''}
        fullWidth
      />

      <TextField
        label='Giá trị (%)'
        name='value'
        placeholder='Nhập giá trị'
        value={valuePromotion}
        onChange={(e) => setValuePromotion(e.target.value)}
        error={valuePromotion === '' ? 'Không để trống giá trị' : ''}
        fullWidth
      />
    </Modal>
  );
}
