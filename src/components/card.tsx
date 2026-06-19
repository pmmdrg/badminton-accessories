'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { placeholderImage } from '@/assets/images';
import { isValidImageSrc } from '@/lib/utils';
import { CardProps } from '@/types/cardProps';

export default function Card({ title, description, image }: CardProps) {
  const router = useRouter();

  return (
    <div
      className='group cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:scale-[1.03] hover:shadow-md'
      onClick={() => router.push(`/product`)}
    >
      <div className='relative w-full h-56 md:h-64 overflow-hidden rounded-t-xl'>
        <Image
          src={image && isValidImageSrc(image) ? image : placeholderImage}
          alt={title}
          fill
          className={clsx(
            image && isValidImageSrc(image) ? 'object-cover' : 'object-contain',
            'transition-transform duration-500 group-hover:scale-105'
          )}
          sizes='(max-width: 768px) 100vw, 25vw'
        />
      </div>

      <div className='p-4 flex flex-col gap-2'>
        <h3 className='text-gray-800 font-medium text-base line-clamp-2'>
          {title}
        </h3>

        <p className='line-clamp-3 text-gray-500'>{description}</p>
      </div>
    </div>
  );
}
