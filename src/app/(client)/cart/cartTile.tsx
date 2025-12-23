'use client';
import { placeholderImage } from '@/assets/images';
import Button from '@/components/custom/button';
import { useCart } from '@/hooks/client/useCart';
import { COUNTRY_CODE } from '@/lib/constants';
import { isValidImageSrc } from '@/lib/utils';
import { CartTileProps } from '@/types/cartTileProps';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

export default function CartTile({
  cartItem,
  onQuantityChange,
  onRemove,
}: CartTileProps) {
  const [isChecked, setIsChecked] = useState(cartItem.status === 'tick');
  const { tick, untick } = useCart();

  const increase = () => {
    onQuantityChange(cartItem._id, cartItem.quantity + 1);
  };

  const decrease = () => {
    onQuantityChange(cartItem._id, cartItem.quantity - 1);
  };

  const handleTick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsChecked(true);
      tick.mutate(cartItem._id);
    } else {
      setIsChecked(false);
      untick.mutate(cartItem._id);
    }
  };

  return (
    <div className='flex items-center gap-4 p-4 border rounded-2xl shadow-sm w-full'>
      <input
        name={cartItem.nameProductItem}
        type='checkbox'
        checked={isChecked}
        onChange={handleTick}
        className='size-5 accent-rose-700'
      />

      <div className='relative w-20 h-20 md:h-20 overflow-hidden rounded-xl'>
        <Image
          src={
            cartItem.imageProductItem &&
            isValidImageSrc(cartItem.imageProductItem)
              ? cartItem.imageProductItem
              : placeholderImage
          }
          alt={cartItem.nameProductItem}
          fill
          sizes='(max-width: 768px) 100vw, 25vw'
          className={clsx(
            cartItem.imageProductItem &&
              isValidImageSrc(cartItem.imageProductItem)
              ? 'object-cover'
              : 'object-contain',
            'transition-transform duration-500 group-hover:scale-105'
          )}
        />
      </div>

      <div className='flex flex-col flex-1 min-w-0'>
        <Link
          href={`/product/${cartItem.productItemId}`}
          className='font-semibold text-lg text-blue-600 hover:underline truncate'
        >
          {cartItem.nameProductItem}
        </Link>

        <p className='text-gray-700 font-medium mt-1'>
          {cartItem.price.toLocaleString(COUNTRY_CODE.VN)} đ
        </p>

        <div className='flex items-center gap-3 mt-2'>
          <Button onClick={decrease} className='p-0'>
            <MinusIcon className='h-5 w-5' />
          </Button>
          <span className='min-w-[24px] text-center'>{cartItem.quantity}</span>
          <Button onClick={increase}>
            <PlusIcon className='h-5 w-5' />
          </Button>
        </div>
      </div>

      <div className='flex flex-col items-end gap-3 min-w-[120px]'>
        <p className='font-semibold'>
          {(cartItem.price * cartItem.quantity).toLocaleString(COUNTRY_CODE.VN)}{' '}
          đ
        </p>

        <Button variant='ghost' onClick={() => onRemove(cartItem._id)}>
          Xoá
        </Button>
      </div>
    </div>
  );
}
