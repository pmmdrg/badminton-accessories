'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createProductItem,
  deleteProductItem,
  getAllActiveProductItemAdmin,
  getAllProductItemAdmin,
  getAllInactiveProductItemAdmin,
  getProductItemByIdAdmin,
  getProductItemByNameAdmin,
  restoreProductItem,
  updateProductItem,
} from '@/services/admin/productItemService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useProductItemAdmin(id?: string, name?: string) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createProductItem,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo mặt hàng sản phẩm mới',
      });
    },
  });

  const getAll = useQuery({
    queryKey: ['admin-product-items'],
    queryFn: getAllProductItemAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-product-items'],
    queryFn: getAllActiveProductItemAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-product-items'],
    queryFn: getAllInactiveProductItemAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getProductItemByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameProductItem', name],
    queryFn: () => getProductItemByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        productId?: string;
        sizeId?: string;
        colorId?: string;
        nameProductItem?: string;
        imageProductItem?: string[];
        description?: string;
        price?: number;
        quantity?: number;
      };
    }) => updateProductItem(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa mặt hàng sản phẩm',
      });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteProductItem(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá mặt hàng sản phẩm',
      });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreProductItem(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục mặt hàng sản phẩm',
      });
    },
  });

  return {
    add,
    getAll,
    getAllActive,
    getAllInactive,
    getById,
    getByName,
    edit,
    remove,
    restore,
  };
}
