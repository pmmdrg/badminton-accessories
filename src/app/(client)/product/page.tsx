'use client';

import { useState } from 'react';
import Select from '@/components/custom/select';
import TextField from '@/components/custom/textfield';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Pagination from '@/components/custom/pagination';
import { Spinner } from '@/components/custom/spinner';
import { useBrandClient } from '@/hooks/client/useBrand';
import { useCateClient } from '@/hooks/client/useCate';
import { normalizedSelectOptions } from '@/lib/utils';
import { Brand } from '@/models/brand';
import { Cate } from '@/models/cate';
import { useProductItemClient } from '@/hooks/client/useProductItem';
import { ProductItem } from '@/models/productItem';
import ProdItemCard from '@/components/custom/prodItemCard';
import { useColorClient } from '@/hooks/client/useColor';
import { Color } from '@/models/color';

export default function ProductListPage() {
  const productItems = useProductItemClient();
  const brands = useBrandClient();
  const cates = useCateClient();
  const colors = useColorClient();

  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [color, setColor] = useState('');
  const [currPage, setCurrPage] = useState(1);

  const filteredProducts = productItems.getAll.data?.data?.filter(
    (pi: ProductItem) =>
      pi.nameProductItem.toLowerCase().includes(search.toLowerCase())
  );

  const brandOptions = brands.getAll.data?.data
    ? [
        { label: 'Tất cả', value: '' },
        ...brands.getAll.data.data.map((brand: Brand) =>
          normalizedSelectOptions(brand.nameBrand, brand._id)
        ),
      ]
    : [{ label: 'Tất cả', value: '' }];

  const cateOptions = cates.getAll.data?.data
    ? [
        { label: 'Tất cả', value: '' },
        ...cates.getAll.data.data.map((cate: Cate) =>
          normalizedSelectOptions(cate.nameCate, cate._id)
        ),
      ]
    : [{ label: 'Tất cả', value: '' }];

  const colorOptions = colors.getAll.data?.data
    ? [
        { label: 'Tất cả', value: '' },
        ...colors.getAll.data.data.map((color: Color) =>
          normalizedSelectOptions(color.description, color._id)
        ),
      ]
    : [{ label: 'Tất cả', value: '' }];

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

      <div className='max-w-5xl mx-auto rounded-2xl shadow-lg p-4 flex flex-wrap items-center justify-between gap-4'>
        <Select
          label='Thương Hiệu'
          value={brand}
          onChange={setBrand}
          options={brandOptions}
        />

        <Select
          label='Danh Mục'
          value={category}
          onChange={setCategory}
          options={cateOptions}
        />

        <Select
          label='Màu'
          value={color}
          onChange={setColor}
          options={colorOptions}
        />

        <Select
          label='Sắp Xếp Theo'
          value={sort}
          onChange={setSort}
          options={[
            { value: '', label: 'Mặc định' },
            { value: 'price-asc', label: 'Giá tăng dần' },
            { value: 'price-desc', label: 'Giá giảm dần' },
          ]}
        />
      </div>

      {productItems.getAll.isLoading ? (
        <Spinner size='lg' />
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-4 mx-4'>
          {filteredProducts.map((productItem: ProductItem) => (
            <ProdItemCard key={productItem._id} {...productItem} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currPage}
        totalPages={Math.ceil(
          (productItems.getAll.data?.data?.length ?? 0) / 20
        )}
        onPageChange={setCurrPage}
      />
    </div>
  );
}
