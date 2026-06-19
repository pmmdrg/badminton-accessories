'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { isValidImageSrc } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';

export default function Carousel({
  images,
  background,
}: {
  images: string[];
  background?: string;
}) {
  return (
    <div className='w-full bg-black'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className='w-full h-[400px] md:h-[500px] lg:h-[600px]'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative w-full h-full flex items-center justify-center ${background}`}
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
