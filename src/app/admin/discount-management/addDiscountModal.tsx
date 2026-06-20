import Modal from '@/components/modal';
import TextField from '@/components/textfield';
import { useState } from 'react';

interface AddDiscountModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (discountCode: string, valuePromotion: number) => void;
}

export default function AddDiscountModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddDiscountModalProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [valuePromotion, setValuePromotion] = useState(0);

  const resetState = () => {
    setDiscountCode('');
    setValuePromotion(0);
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
        type='number'
        name='value'
        placeholder='Nhập giá trị'
        value={valuePromotion.toString()}
        onChange={(e) => setValuePromotion(parseInt(e.target.value))}
        error={
          valuePromotion <= 0 || valuePromotion > 100
            ? 'Vui lòng nhập số trong khoảng 1-100'
            : ''
        }
        fullWidth
      />
    </Modal>
  );
}
