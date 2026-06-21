'use client';

import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { placeholderImage } from '@/assets/images';
import { isValidImageSrc } from '@/lib/utils';
import { COUNTRY_CODE, TOAST_TYPE } from '@/lib/constants';
import { ProductItem } from '@/models/productItem';
import { useCartItem } from '@/hooks/client/useCartItem';
import { useCart } from '@/hooks/client/useCart';
import { useToast } from '@/providers/toastProvider';

export default function ProdItemCard({
  id,
  nameProductItem,
  imageProductItem,
  price,
  pricePromotion,
  quantity,
  description,
}: ProductItem) {
  const { getByUserId } = useCart();
  const { insert } = useCartItem();
  const router = useRouter();
  const { addToast } = useToast();

  const inStock = quantity > 0;
  const isDiscounting = pricePromotion !== null;

  const handleAddToCart = () => {
    if (getByUserId.data?.data?.id) {
      insert.mutate({
        cartId: getByUserId.data.data.id,
        productItemId: id,
        nameProductItem,
        price,
        pricePromotion,
        quantity: 1,
        imageProductItem:
          imageProductItem && imageProductItem.length > 0
            ? imageProductItem[0]
            : '',
      });
    } else {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Vui lòng đăng nhập để thêm vào giỏ hàng',
      });
    }
  };

  return (
    <div
      className='group cursor-pointer rounded-xl border border-gray-200 bg-gradient-to-br from-orange-300 to-blue-200 shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-md'
      onClick={() => router.push(`/product/${id}`)}
    >
      <div className='relative w-full h-56 md:h-64 overflow-hidden rounded-t-xl'>
        <Image
          src={
            imageProductItem && isValidImageSrc(imageProductItem[0])
              ? imageProductItem[0]
              : placeholderImage
          }
          alt={nameProductItem}
          fill
          className={clsx(
            imageProductItem && isValidImageSrc(imageProductItem[0])
              ? 'object-cover'
              : 'object-contain',
            'transition-transform duration-500 group-hover:scale-105',
          )}
          sizes='(max-width: 768px) 100vw, 25vw'
        />
        {!inStock && (
          <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
            <span className='text-white text-sm font-semibold uppercase tracking-wide'>
              Hết hàng
            </span>
          </div>
        )}
      </div>

      <div className='p-4 flex flex-col gap-2'>
        <h3 className='text-gray-800 font-medium text-base line-clamp-2'>
          {nameProductItem}
        </h3>

        <p className='line-clamp-3 text-gray-500'>{description}</p>

        <div className='flex items-center justify-between'>
          <div>
            <p
              className={clsx(
                isDiscounting ? 'text-gray-500 line-through' : 'text-rose-700',
                'font-semibold',
              )}
            >
              {price.toLocaleString(COUNTRY_CODE.VN)}₫
            </p>
            {isDiscounting && (
              <p className='text-rose-700 font-semibold'>
                {pricePromotion.toLocaleString(COUNTRY_CODE.VN)}₫
              </p>
            )}
          </div>
          <button
            className='p-3 rounded-2xl bg-rose-700 text-white hover:bg-rose-800 transition'
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={!inStock}
          >
            <ShoppingCartIcon className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  );
}
