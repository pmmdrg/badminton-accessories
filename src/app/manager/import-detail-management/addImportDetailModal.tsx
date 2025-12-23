import Modal from '@/components/custom/modal';
import { SelectString } from '@/components/custom/select';
import TextField from '@/components/custom/textfield';
import { useImportManager } from '@/hooks/manager/useImport';
import { useProductItemManager } from '@/hooks/manager/useProductItem';
import { normalizedSelectOptions } from '@/lib/utils';
import { Import } from '@/models/import';
import { ProductItem } from '@/models/productItem';
import { useState } from 'react';

interface AddImportDetailModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    importId: string,
    quantity: number,
    productItem: ProductItem | null
  ) => void;
}

export default function AddImportModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: AddImportDetailModalProps) {
  const imports = useImportManager();
  const productItems = useProductItemManager();
  const [imp, setImp] = useState('');
  const [productItem, setProductItem] = useState<ProductItem | null>(null);
  const [productItemName, setProductItemName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const importOptions = imports.getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...imports.getAll.data.data.map((imp: Import) =>
          normalizedSelectOptions(imp.title, imp._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const prodItemOptions = productItems.getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...productItems.getAll.data.data.map((pi: ProductItem) =>
          normalizedSelectOptions(pi.nameProductItem, pi._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const resetState = () => {
    setImp('');
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
        onConfirm(imp, quantity, productItem);
        resetState();
        setIsOpen(false);
      }}
      title='Thêm Chi Tiết Nhập Hàng'
    >
      <div className='flex gap-10'>
        <SelectString
          label='Lô hàng'
          value={imp}
          options={importOptions}
          onChange={setImp}
          className='mx-2 my-2'
        />

        <SelectString
          label='Mặt hàng sản phẩm'
          value={productItemName}
          options={prodItemOptions}
          onChange={(value) => {
            setProductItemName(value);

            const foundProdItem = productItems.getAll.data?.data?.filter(
              (pi: ProductItem) => pi._id === value
            );

            if (foundProdItem.length > 0) {
              setProductItem(foundProdItem[0]);
            }
          }}
          className='mx-2 my-2'
        />
      </div>

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
