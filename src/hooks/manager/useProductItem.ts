'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteProductItem,
  getAllActiveProductItemManager,
  getAllInactiveProductItemManager,
  getAllProductItemManager,
  getProductItemByIdManager,
  getProductItemByNameManager,
  restoreProductItem,
  updateProductItem,
} from '@/services/manager/productItemService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useProductItemManager(id?: string, name?: string) {
  const { addToast } = useToast();

  const getAll = useQuery({
    queryKey: ['manager-product-items'],
    queryFn: getAllProductItemManager,
  });

  const getAllActive = useQuery({
    queryKey: ['manager-active-product-items'],
    queryFn: getAllActiveProductItemManager,
  });

  const getAllInactive = useQuery({
    queryKey: ['manager-inactive-product-items'],
    queryFn: getAllInactiveProductItemManager,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getProductItemByIdManager(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameProductItem', name],
    queryFn: () => getProductItemByNameManager(name || ''),
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
        imageProductItem?: string;
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
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo mặt hàng sản phẩm mới, vui lòng đợi',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
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
