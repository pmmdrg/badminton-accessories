'use client';

import { useState } from 'react';
import { SelectString } from '@/components/select';
import TextField from '@/components/textfield';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Pagination from '@/components/pagination';
import { Spinner } from '@/components/spinner';
import { useBrandClient } from '@/hooks/client/useBrand';
import { useCateClient } from '@/hooks/client/useCate';
import { normalizedSelectOptions } from '@/lib/utils';
import { Brand } from '@/models/brand';
import { Cate } from '@/models/cate';
import { useProductItemClient } from '@/hooks/client/useProductItem';
import { ProductItem } from '@/models/productItem';
import ProdItemCard from '@/components/prodItemCard';
import { useColorClient } from '@/hooks/client/useColor';
import { Color } from '@/models/color';

export default function ProductListPage() {
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [color, setColor] = useState('');
  const brands = useBrandClient();
  const cates = useCateClient();
  const colors = useColorClient();
  const productItems = useProductItemClient(
    '',
    search,
    brand,
    category,
    '',
    '',
    color,
  );

  const [currPage, setCurrPage] = useState(1);

  const filteredProducts: ProductItem[] = (
    brand !== ''
      ? productItems.getByBrandId
      : category !== ''
        ? productItems.getByCateId
        : color !== ''
          ? productItems.getByColorId
          : productItems.getAll
  ).data?.data?.filter((pi: ProductItem) =>
    pi.nameProductItem.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedProducts: () => ProductItem[] = () => {
    if (sort === 'asc') {
      return filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      return filteredProducts.sort((a, b) => b.price - a.price);
    } else {
      return filteredProducts;
    }
  };

  const brandOptions = brands.getAll.data?.data
    ? [
        { label: 'Tất Cả', value: '' },
        ...brands.getAll.data.data.map((brand: Brand) =>
          normalizedSelectOptions(brand.nameBrand, brand.id),
        ),
      ]
    : [{ label: 'Tất Cả', value: '' }];

  const cateOptions = cates.getAll.data?.data
    ? [
        { label: 'Tất Cả', value: '' },
        ...cates.getAll.data.data.map((cate: Cate) =>
          normalizedSelectOptions(cate.nameCate, cate.id),
        ),
      ]
    : [{ label: 'Tất Cả', value: '' }];

  const colorOptions = colors.getAll.data?.data
    ? [
        { label: 'Tất Cả', value: '' },
        ...colors.getAll.data.data.map((color: Color) =>
          normalizedSelectOptions(color.description, color.id),
        ),
      ]
    : [{ label: 'Tất Cả', value: '' }];

  return (
    <div className='min-h-screen'>
      <div className='flex justify-center'>
        <TextField
          name='search-product'
          placeholder='Tìm kiếm sản phẩm'
          endIcon={<MagnifyingGlassIcon className='w-6 h-6 text-gray-400' />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-sm sm:max-w-full mx-5'
        />
      </div>

      <div className='max-w-5xl mx-auto bg-gradient-to-br from-white/20 via-gray-200 to-gray-300 border border-white/30 backdrop-blur-md rounded-2xl shadow-xl p-4 flex flex-wrap items-center justify-between gap-4 my-2'>
        <SelectString
          label='Thương Hiệu'
          value={brand}
          onChange={(value) => {
            setCategory('');
            setColor('');
            setBrand(value);
          }}
          options={brandOptions}
        />

        <SelectString
          label='Danh Mục'
          value={category}
          onChange={(value) => {
            setColor('');
            setBrand('');
            setCategory(value);
          }}
          options={cateOptions}
        />

        <SelectString
          label='Màu'
          value={color}
          onChange={(value) => {
            setBrand('');
            setCategory('');
            setColor(value);
          }}
          options={colorOptions}
        />

        <SelectString
          label='Sắp Xếp Theo'
          value={sort}
          onChange={setSort}
          options={[
            { value: '', label: 'Mặc Định' },
            { value: 'asc', label: 'Giá Tăng Dần' },
            { value: 'desc', label: 'Giá Giảm Dần' },
          ]}
        />
      </div>

      {productItems.getAll.isLoading ? (
        <Spinner size='lg' />
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-4 mx-4'>
          {sortedProducts()?.map((productItem: ProductItem) => (
            <ProdItemCard key={productItem.id} {...productItem} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currPage}
        totalPages={Math.ceil((filteredProducts?.length ?? 0) / 20)}
        onPageChange={setCurrPage}
      />
    </div>
  );
}
