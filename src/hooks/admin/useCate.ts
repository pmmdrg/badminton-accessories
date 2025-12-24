'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useCateAdmin(id?: string, name?: string) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createCate,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo danh mục mới',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-cates'] });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo danh mục mới, vui lòng đợi',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
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

      queryClient.invalidateQueries({ queryKey: ['admin-cates'] });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa danh mục, vui lòng đợi',
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
    mutationFn: (id: string) => deleteCate(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá danh mục',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-cates'] });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreCate(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục danh mục',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-cates'] });
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
