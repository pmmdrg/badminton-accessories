'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createBrand,
  deleteBrand,
  getAllActiveBrandAdmin,
  getAllBrandAdmin,
  getAllInactiveBrandAdmin,
  getBrandByIdAdmin,
  getBrandByNameAdmin,
  restoreBrand,
  updateBrand,
} from '@/services/admin/brandService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useBrandAdmin(id?: string, name?: string) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo thương hiệu mới',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-brands'] });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo thương hiệu mới, vui lòng đợi',
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
    queryKey: ['admin-brands'],
    queryFn: getAllBrandAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-brands'],
    queryFn: getAllActiveBrandAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-brands'],
    queryFn: getAllInactiveBrandAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getBrandByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameBrand', name],
    queryFn: () => getBrandByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        nameBrand?: string;
        imageBrand?: string;
        country?: string;
        description?: string;
      };
    }) => updateBrand(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa thương hiệu',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-brands'] });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa thương hiệu, vui lòng đợi',
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
    mutationFn: (id: string) => deleteBrand(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá thương hiệu',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-brands'] });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreBrand(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục thương hiệu',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-brands'] });
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
