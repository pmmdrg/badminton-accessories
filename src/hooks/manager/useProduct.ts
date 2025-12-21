'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteProduct,
  getAllActiveProductManager,
  getAllProductManager,
  getAllInactiveProductManager,
  getProductByIdManager,
  getProductByNameManager,
  restoreProduct,
  updateProduct,
} from '@/services/manager/productService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useProductManager(id?: string, name?: string) {
  const { addToast } = useToast();

  const getAll = useQuery({
    queryKey: ['manager-product'],
    queryFn: getAllProductManager,
  });

  const getAllActive = useQuery({
    queryKey: ['manager-active-product'],
    queryFn: getAllActiveProductManager,
  });

  const getAllInactive = useQuery({
    queryKey: ['manager-inactive-product'],
    queryFn: getAllInactiveProductManager,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getProductByIdManager(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameProduct', name],
    queryFn: () => getProductByNameManager(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        brandId?: string;
        cateId?: string;
        sizeTypeId?: string;
        nameProduct?: string;
        imageProduct?: string;
        description?: string;
      };
    }) => updateProduct(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa sản phẩm',
      });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa sản phẩm, vui lòng đợi',
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
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá sản phẩm',
      });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreProduct(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục sản phẩm',
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
