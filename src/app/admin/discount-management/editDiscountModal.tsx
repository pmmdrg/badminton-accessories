import Modal from '@/components/modal';
import TextField from '@/components/textfield';
import { useDiscountAdmin } from '@/hooks/admin/useDiscount';
import { useEffect, useState } from 'react';

interface EditDiscountModalProps {
  discountId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (codePromotion: string, valuePromotion: string) => void;
}

export default function EditDiscountModal({
  discountId,
  isOpen,
  setIsOpen,
  onConfirm,
}: EditDiscountModalProps) {
  const { getById } = useDiscountAdmin(discountId);

  const [codePromotion, setCodePromotion] = useState('');
  const [valuePromotion, setValuePromotion] = useState('');

  useEffect(() => {
    if (!getById.data?.data) return;

    setCodePromotion(getById.data.data.codePromotion);
    setValuePromotion(getById.data.data.valuePromotion);
  }, [isOpen, getById.data]);

  const resetState = () => {
    setCodePromotion('');
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
        onConfirm(codePromotion, valuePromotion);
        resetState();
        setIsOpen(false);
      }}
      title='Chỉnh Sửa Mã Giảm Giá'
    >
      <TextField
        name='discount-code'
        label='Mã giảm giá'
        placeholder='Nhập mã giảm giá'
        value={codePromotion}
        onChange={(e) => setCodePromotion(e.target.value)}
        error={codePromotion === '' ? 'Không để trống mã giảm giá' : ''}
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
