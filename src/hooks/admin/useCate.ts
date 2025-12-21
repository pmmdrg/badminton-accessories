'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createCate,
  deleteCate,
  getAllActiveCateAdmin,
  getAllCateAdmin,
  getAllInactiveCateAdmin,
  getCateByIdAdmin,
  getCateByNameAdmin,
  restoreCate,
  updateCate,
} from '@/services/admin/cateService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useCateAdmin(id?: string, name?: string) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createCate,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo danh mục mới',
      });
    },
  });

  const getAll = useQuery({
    queryKey: ['admin-cates'],
    queryFn: getAllCateAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-cates'],
    queryFn: getAllActiveCateAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-cates'],
    queryFn: getAllInactiveCateAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getCateByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameCate', name],
    queryFn: () => getCateByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        nameCate?: string;
        imageCate?: string;
        description?: string;
      };
    }) => updateCate(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa danh mục',
      });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteCate(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá danh mục',
      });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreCate(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục danh mục',
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
