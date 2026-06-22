'use client';

import Carousel from '@/components/carousel';
import Section from '@/components/section';
import { Spinner } from '@/components/spinner';
import { useProductClient } from '@/hooks/client/useProduct';
import { Product } from '@/models/product';
import Card from '@/components/card';
import { useBrandClient } from '@/hooks/client/useBrand';
import { useCateClient } from '@/hooks/client/useCate';
import { Brand } from '@/models/brand';
import { Cate } from '@/models/cate';
import { carouselBannerImages } from '@/assets/images';

export default function Homepage() {
  const products = useProductClient();
  const brands = useBrandClient();
  const cates = useCateClient();

  const productsReversed = products.getAll.data?.data
    ? [...products.getAll.data.data].reverse()
    : [];

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
    <div className='px-10 mt-4'>
      <div className='rounded-2xl overflow-hidden shadow-lg bg-white/5 backdrop-blur-md'>
        <Carousel images={carouselBannerImages} />
      </div>

      <Section title='Sản phẩm mới'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {productsReversed.slice(0, 5).map((product: Product) => (
            <Card
              key={product.id}
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
              key={brand.id}
              title={brand.nameBrand}
              description={brand.description}
              image={brand.imageBrand}
              queryParams={`brand=${brand.id}`}
            />
          ))}
        </div>
      </Section>

      <Section title='Danh mục'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {cates.getAll.data?.data?.slice(0, 5).map((cate: Cate) => (
            <Card
              key={cate.id}
              title={cate.nameCate}
              description={cate.description}
              image={cate.imageCate}
              queryParams={`category=${cate.id}`}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
