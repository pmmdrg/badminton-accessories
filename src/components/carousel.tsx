'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { isValidImageSrc } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import clsx from 'clsx';

export default function Carousel({
  images,
  background,
}: {
  images: string[];
  background?: string;
}) {
  return (
    <div
      className={clsx(
        'w-full',
        background
          ? `${background}`
          : 'bg-gradient-to-br from-gray-500/20 via-gray-200 to-gray-300',
      )}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className='w-full h-[500px] md:h-[600px] lg:h-[700px]'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative w-full h-full flex items-center justify-center`}
            >
              <Image
                fill
                src={isValidImageSrc(image) ? image : placeholderImage}
                alt={`Image ${index}`}
                className='max-w-full max-h-full object-contain'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
