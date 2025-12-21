'use client';

import Card from '@/components/custom/prodCard';
import Carousel from '@/components/custom/carousel';
import Section from '@/components/custom/section';
import { Spinner } from '@/components/custom/spinner';
import { useProductClient } from '@/hooks/client/useProduct';
import { Product } from '@/models/product';
import ProdCard from '@/components/custom/prodCard';

export default function Homepage() {
  const { getAll } = useProductClient();

  const productsReversed = getAll.data?.data
    ? [...getAll.data.data].reverse()
    : [];

  const banners = [
    'https://cdn.shopvnb.com/uploads/images/tin_tuc/hinh-anh-vot-cau-long-1-1687828854.webp',

    'https://thethaodonga.com/wp-content/uploads/2022/06/hinh-anh-cau-long-dep-2.png',

    'https://us.yonex.com/cdn/shop/files/CLP_Badminton_ProdWall_Hero.jpg',

    'https://cdn.britannica.com/44/256944-050-8D414329/PV-Sindhu-2020-Tokyo-Olympics.jpg',

    'https://www.racquetpoint.com/cdn/shop/articles/badminton-the-ultimate-guide-to-the-racquet-sport-460186.jpg',
  ];

  if (getAll.isLoading)
    return (
      <div className='flex justify-center h-screen'>
        <Spinner />
      </div>
    );

  return (
    <>
      <Carousel images={banners} />

      <Section title='Sản phẩm nổi bật'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {getAll.data?.data.slice(0, 5).map((product: Product) => (
            <ProdCard key={product._id} {...product} />
          ))}
        </div>
      </Section>

      <Section title='Sản phẩm mới'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {productsReversed.slice(0, 5).map((product: Product) => (
            <Card key={product._id} {...product} />
          ))}
        </div>
      </Section>

      <Section title='Xu hướng'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {getAll.data.data.map((product: Product) => (
            <ProdCard key={product._id} {...product} />
          ))}
        </div>
      </Section>
    </>
  );
}
