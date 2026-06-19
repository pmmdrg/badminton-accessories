import Modal from '@/components/custom/modal';
import { SelectString } from '@/components/custom/select';
import TextField from '@/components/custom/textfield';
import { useProductItemManager } from '@/hooks/manager/useProductItem';
import { normalizedSelectOptions } from '@/lib/utils';
import { ProductItem } from '@/models/productItem';
import { useState } from 'react';

interface AddImportDetailModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  onConfirm: (quantity: number, productItem: ProductItem | null) => void;
}

export default function AddImportDetailModal({
  isOpen,
  setIsOpen,
  title = '',
  onConfirm,
}: AddImportDetailModalProps) {
  const productItems = useProductItemManager();
  const [productItem, setProductItem] = useState<ProductItem | null>(null);
  const [productItemName, setProductItemName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const prodItemOptions = productItems.getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...productItems.getAll.data.data.map((pi: ProductItem) =>
          normalizedSelectOptions(pi.nameProductItem, pi.id),
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const resetState = () => {
    setProductItem(null);
    setProductItemName('');
    setQuantity(0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(quantity, productItem);
        resetState();
        setIsOpen(false);
      }}
      title='Thêm Chi Tiết Nhập Hàng'
    >
      <div className='mb-4 px-2'>
        <p className='block text-sm text-gray-700 mb-1 font-medium'>
          Lô hàng: {title}
        </p>
      </div>

      <SelectString
        label='Mặt hàng sản phẩm'
        value={productItemName}
        options={prodItemOptions}
        onChange={(value) => {
          setProductItemName(value);

          const foundProdItem = productItems.getAll.data?.data?.filter(
            (pi: ProductItem) => pi.id === value,
          );

          if (foundProdItem.length > 0) {
            setProductItem(foundProdItem[0]);
          }
        }}
        className='mx-2 my-2'
      />

      <TextField
        name='quantity'
        label='Số lượng'
        type='number'
        placeholder='Nhập số lượng'
        value={quantity.toString()}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        fullWidth
      />
    </Modal>
  );
}
