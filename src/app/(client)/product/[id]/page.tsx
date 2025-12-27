'use client';
import Button from '@/components/custom/button';
import Section from '@/components/custom/section';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductItemClient } from '@/hooks/client/useProductItem';
import { Spinner } from '@/components/custom/spinner';
import { ProductItem } from '@/models/productItem';
import ProdItemCard from '@/components/custom/prodItemCard';
import Carousel from '@/components/custom/carousel';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { COUNTRY_CODE } from '@/lib/constants';
import { useCartItem } from '@/hooks/client/useCartItem';
import { useCart } from '@/hooks/client/useCart';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [prod, setProd] = useState('');
  const { getByProductId, getById } = useProductItemClient(
    id,
    '',
    '',
    '',
    prod
  );
  const { getByUserId } = useCart();
  const { insert } = useCartItem();
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  const foundProductItem: ProductItem = getById.data?.data;
  const cartId = getByUserId.data?.data?._id;

  const handleAddToCart = () => {
    if (cartId && foundProductItem)
      insert.mutate({
        cartId,
        productItemId: id,
        nameProductItem: foundProductItem.nameProductItem,
        price: foundProductItem.price,
        imageProductItem: foundProductItem?.imageProductItem?.[0] || '',
        quantity,
      });
  };

  const handleBuyNow = () => {
    if (cartId && foundProductItem)
      insert.mutate({
        cartId,
        productItemId: id,
        nameProductItem: foundProductItem.nameProductItem,
        price: foundProductItem.price,
        imageProductItem: foundProductItem?.imageProductItem?.[0] || '',
        quantity,
      });

    router.push('/cart');
  };

  useEffect(() => {
    if (getById.data?.data) {
      setProd(getById.data.data?.productId);
    }
  }, [getById.data]);

  if (getById.isLoading)
    return (
      <div className='h-screen'>
        <Spinner />
      </div>
    );

  return (
    <div className='w-full px-4 md:px-40 py-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>
        <div className='rounded-2xl overflow-hidden shadow-lg bg-white/5 backdrop-blur-md'>
          <Carousel
            images={foundProductItem.imageProductItem || []}
            background='bg-gray-400'
          />
        </div>

        <div className='flex flex-col justify-center space-y-5'>
          <h1 className='text-3xl font-semibold text-gray-900'>
            {foundProductItem.nameProductItem}
          </h1>

          <p className='text-2xl text-rose-700 font-bold'>
            {foundProductItem.price.toLocaleString(COUNTRY_CODE.VN)}₫
          </p>

          <p>
            <span className='font-semibold text-gray-700 space-y-1'>
              Số lượng còn trong kho:
            </span>{' '}
            {foundProductItem.quantity}
          </p>

          <div className='flex items-center space-x-3'>
            <span className='font-semibold text-gray-800'>
              Số lượng muốn mua:
            </span>
            <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
              <button
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className='px-3 py-1 text-gray-600 hover:bg-gray-100'
              >
                <MinusIcon className='h-5 w-5 my-1' />
              </button>
              <span className='px-4'>{quantity}</span>
              <button
                onClick={() =>
                  setQuantity(Math.min(foundProductItem.quantity, quantity + 1))
                }
                className='px-3 py-1 text-gray-600 hover:bg-gray-100'
              >
                <PlusIcon className='h-5 w-5 my-1' />
              </button>
            </div>
          </div>

          <div className='flex flex-wrap gap-4 mt-4'>
            <Button
              variant='primary'
              className='px-6 py-3 font-semibold'
              disabled={quantity === 0}
              onClick={handleBuyNow}
            >
              Mua ngay
            </Button>
            <Button
              variant='outline'
              className='px-6 py-3 font-semibold'
              disabled={quantity === 0}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>

      <Section title='Chi tiết sản phẩm'>
        <p className='text-gray-700 leading-relaxed'>
          {foundProductItem.description}
        </p>
      </Section>

      <Section title='Sản phẩm liên quan' className='mt-14'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {getByProductId.data?.data
            ?.slice(0, 5)
            .map((prodItem: ProductItem) => (
              <ProdItemCard key={prodItem._id} {...prodItem} />
            ))}
        </div>
      </Section>
    </div>
  );
}
