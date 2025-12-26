'use client';
import { useQuery } from '@tanstack/react-query';
import {
  findAllProductItemActive,
  findProductItemByBrandId,
  findProductItemByCateId,
  findProductItemByColorId,
  findProductItemById,
  findProductItemByName,
  findProductItemByProductId,
  findProductItemBySizeId,
} from '@/services/client/productItemService';

export function useProductItemClient(
  id?: string,
  name?: string,
  brandId?: string,
  cateId?: string,
  productId?: string,
  sizeId?: string,
  colorId?: string
) {
  const getAll = useQuery({
    queryKey: ['product-items'],
    queryFn: findAllProductItemActive,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => findProductItemById(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameProductItem', name],
    queryFn: () => findProductItemByName(name || ''),
    enabled: !!name,
  });

  const getByBrandId = useQuery({
    queryKey: ['brand-id', brandId],
    queryFn: () => findProductItemByBrandId(brandId || ''),
    enabled: !!brandId,
  });

  const getByColorId = useQuery({
    queryKey: ['color-id', colorId],
    queryFn: () => findProductItemByColorId(colorId || ''),
    enabled: !!colorId,
  });

  const getByCateId = useQuery({
    queryKey: ['cate-id', cateId],
    queryFn: () => findProductItemByCateId(cateId || ''),
    enabled: !!cateId,
  });

  const getBySizeId = useQuery({
    queryKey: ['size-id', sizeId],
    queryFn: () => findProductItemBySizeId(sizeId || ''),
    enabled: !!sizeId,
  });

  const getByProductId = useQuery({
    queryKey: ['product-id', productId],
    queryFn: () => findProductItemByProductId(productId || ''),
    enabled: !!productId,
  });

  return {
    getAll,
    getById,
    getByName,
    getByBrandId,
    getByCateId,
    getBySizeId,
    getByProductId,
    getByColorId,
  };
}
