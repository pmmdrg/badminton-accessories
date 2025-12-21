'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createProduct,
  deleteProduct,
  getAllActiveProductAdmin,
  getAllProductAdmin,
  getAllInactiveProductAdmin,
  getProductByIdAdmin,
  getProductByNameAdmin,
  restoreProduct,
  updateProduct,
} from '@/services/admin/productService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useProductAdmin(id?: string, name?: string) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo sản phẩm mới',
      });
    },
  });

  const getAll = useQuery({
    queryKey: ['admin-product'],
    queryFn: getAllProductAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-product'],
    queryFn: getAllActiveProductAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-product'],
    queryFn: getAllInactiveProductAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getProductByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameProduct', name],
    queryFn: () => getProductByNameAdmin(name || ''),
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
