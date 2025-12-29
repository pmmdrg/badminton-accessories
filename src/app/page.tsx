'use client';

import Carousel from '@/components/custom/carousel';
import Section from '@/components/custom/section';
import { Spinner } from '@/components/custom/spinner';
import { useProductClient } from '@/hooks/client/useProduct';
import { Product } from '@/models/product';
import Card from '@/components/custom/card';
import { useBrandClient } from '@/hooks/client/useBrand';
import { useCateClient } from '@/hooks/client/useCate';
import { Brand } from '@/models/brand';
import { Cate } from '@/models/cate';

export default function Homepage() {
  const products = useProductClient();
  const brands = useBrandClient();
  const cates = useCateClient();

  const productsReversed = products.getAll.data?.data
    ? [...products.getAll.data.data].reverse()
    : [];

  const banners = [
    'https://cdn.shopvnb.com/uploads/images/tin_tuc/hinh-anh-vot-cau-long-1-1687828854.webp',

    'https://thethaodonga.com/wp-content/uploads/2022/06/hinh-anh-cau-long-dep-2.png',

    'https://us.yonex.com/cdn/shop/files/CLP_Badminton_ProdWall_Hero.jpg',

    'https://cdn.britannica.com/44/256944-050-8D414329/PV-Sindhu-2020-Tokyo-Olympics.jpg',

    'https://www.racquetpoint.com/cdn/shop/articles/badminton-the-ultimate-guide-to-the-racquet-sport-460186.jpg',
  ];

  if (
    products.getAll.isLoading ||
    brands.getAll.isLoading ||
    cates.getAll.isLoading
  )
    return (
      <div className='flex justify-center h-screen'>
        <Spinner />
      </div>
    );

  return (
    <>
      <Carousel images={banners} />

      <Section title='Sản phẩm mới'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {productsReversed.slice(0, 5).map((product: Product) => (
            <Card
              key={product._id}
              title={product.nameProduct}
              description={product.description}
              image={product.imageProduct}
            />
          ))}
        </div>
      </Section>

      <Section title='Thương hiệu'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {brands.getAll.data?.data?.slice(0, 5).map((brand: Brand) => (
            <Card
              key={brand._id}
              title={brand.nameBrand}
              description={brand.description}
              image={brand.imageBrand}
            />
          ))}
        </div>
      </Section>

      <Section title='Danh mục'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {cates.getAll.data?.data?.slice(0, 5).map((cate: Cate) => (
            <Card
              key={cate._id}
              title={cate.nameCate}
              description={cate.description}
              image={cate.imageCate}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
