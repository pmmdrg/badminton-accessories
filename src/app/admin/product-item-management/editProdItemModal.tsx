import Modal from '@/components/custom/modal';
import { SelectString } from '@/components/custom/select';
import TextField from '@/components/custom/textfield';
import { useColorAdmin } from '@/hooks/admin/useColor';
import { useProductAdmin } from '@/hooks/admin/useProduct';
import { useProductItemAdmin } from '@/hooks/admin/useProductItem';
import { useSizeAdmin } from '@/hooks/admin/useSize';
import { isValidImageSrc, normalizedSelectOptions } from '@/lib/utils';
import { Color } from '@/models/color';
import { Product } from '@/models/product';
import { Size } from '@/models/size';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface EditProdItemModalProps {
  prodItemId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    product: string,
    size: string,
    color: string,
    nameProductItem: string,
    files: File[],
    price: number,
    description?: string
  ) => void;
}

export default function AddProdItemModal({
  prodItemId,
  isOpen,
  setIsOpen,
  onConfirm,
}: EditProdItemModalProps) {
  const productItems = useProductItemAdmin(prodItemId);
  const products = useProductAdmin(productItems.getById.data?.data?.productId);
  const colors = useColorAdmin();

  const [product, setProduct] = useState<Product | null>(null);

  const sizes = useSizeAdmin(
    productItems.getById.data?.data?.sizeId,
    '',
    product?.sizeTypeId
  );

  const [productName, setProductName] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [productItemName, setProductItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  useEffect(() => {
    if (!productItems.getById.data?.data) return;

    setColor(productItems.getById.data.data.colorId);
    setProductItemName(productItems.getById.data.data.nameProductItem);
    setDescription(productItems.getById.data.data.description);
    setPreview(productItems.getById.data.data.imageProductItem);
    setPrice(productItems.getById.data.data.price);

    if (!products.getById.data?.data) return;
    setProduct(products.getById.data.data);
    setProductName(products.getById.data.data._id);

    if (!sizes.getBySizeTypeId.data?.data) return;
    setSize(productItems.getById.data.data.sizeId);
  }, [
    isOpen,
    productItems.getById.data,
    sizes.getBySizeTypeId.data,
    products.getById.data,
  ]);

  const productNameOptions = products.getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...products.getAll.data.data.map((product: Product) =>
          normalizedSelectOptions(product.nameProduct, product._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const sizeOptions = sizes.getBySizeTypeId.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...sizes.getBySizeTypeId.data.data.map((size: Size) =>
          normalizedSelectOptions(size.nameSize, size._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const colorOptions = colors.getAll.data?.data
    ? [
        { label: 'Chưa có', value: '' },
        ...colors.getAll.data.data.map((color: Color) =>
          normalizedSelectOptions(color.description, color._id)
        ),
      ]
    : [{ label: 'Chưa có', value: '' }];

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected) return;

    setFiles(selected);
    setPreview(selected.map((image) => URL.createObjectURL(image)));
  };

  const resetState = () => {
    setColor('');
    setProduct(null);
    setProductName('');
    setPrice(0);
    setDescription('');
    setFiles([]);
    setProductItemName('');
    setSize('');
    setPreview([]);
  };

  console.log(size);
  console.log(sizes.getAll.data?.data);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        resetState();
      }}
      onConfirm={() => {
        onConfirm(
          productName,
          size,
          color,
          productItemName,
          files,
          price,
          description
        );
        resetState();
        setIsOpen(false);
      }}
      title='Chỉnh Sửa Mặt Hàng Sản Phẩm'
    >
      <div className='flex gap-8 mx-2 mb-2'>
        <SelectString
          label='Sản phẩm'
          value={productName}
          options={productNameOptions}
          onChange={(value) => {
            setProductName(value);

            const foundProd = products.getAll.data?.data?.filter(
              (product: Product) => product._id === value
            );

            if (foundProd.length > 0) {
              setProduct(foundProd[0]);
            }
          }}
        />
        <SelectString
          label='Kích thước'
          value={size}
          options={sizeOptions}
          onChange={setSize}
        />
      </div>

      <SelectString
        label='Màu'
        value={color}
        options={colorOptions}
        onChange={setColor}
        className='mx-2'
      />

      <TextField
        name='product-item-name'
        label='Tên mặt hàng sản phẩm'
        placeholder='Nhập tên mặt hàng sản phẩm'
        value={productItemName}
        onChange={(e) => setProductItemName(e.target.value)}
        error={
          productItemName === '' ? 'Không để trống tên mặt hàng sản phẩm' : ''
        }
        fullWidth
      />

      <TextField
        type='number'
        name='price'
        label='Giá sản phẩm'
        placeholder='Nhập giá sản phẩm'
        value={price.toString()}
        onChange={(e) => setPrice(parseInt(e.target.value))}
        error={price === 0 ? 'Không để trống giá mặt hàng sản phẩm' : ''}
      />

      <TextField
        label='Mô tả'
        name='desctiption'
        placeholder='Nhập mô tả'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />

      <div className='m-2'>
        <p className='text-sm font-medium'>Xem trước ảnh</p>
        <div className='flex gap-2 w-full h-40 overflow-hidden rounded-lg border border-dashed border-gray-400'>
          {preview.map(
            (image, index) =>
              isValidImageSrc(image) && (
                <Image
                  key={index}
                  src={image}
                  width={160}
                  height={160}
                  alt='Preview'
                  className='object-cover rounded-lg'
                />
              )
          )}
        </div>
      </div>

      <TextField
        label='Ảnh mặt hàng sản phẩm'
        name='product-item-image'
        type='file'
        accept='image/*'
        multiple
        onChange={handleSelectImage}
      />
    </Modal>
  );
}
