'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSize,
  deleteSize,
  getAllActiveSizeAdmin,
  getAllSizeAdmin,
  getAllInactiveSizeAdmin,
  getSizeByIdAdmin,
  getSizeByNameAdmin,
  restoreSize,
  updateSize,
  getSizeBySizeTypeId,
  getSizeBySizeTypeName,
} from '@/services/admin/sizeService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useSizeAdmin(
  id?: string,
  name?: string,
  sizeTypeId?: string,
  sizeTypeName?: string
) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createSize,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo kích thước mới',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-sizes'] });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo kích thước mới, vui lòng đợi',
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
    queryKey: ['admin-sizes'],
    queryFn: getAllSizeAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-sizes'],
    queryFn: getAllActiveSizeAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-sizes'],
    queryFn: getAllInactiveSizeAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getSizeByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getBySizeTypeId = useQuery({
    queryKey: ['size-type-id', sizeTypeId],
    queryFn: () => getSizeBySizeTypeId(sizeTypeId || ''),
    enabled: !!sizeTypeId,
  });

  const getByName = useQuery({
    queryKey: ['nameSize', name],
    queryFn: () => getSizeByNameAdmin(name || ''),
    enabled: !!name,
  });

  const getBySizeTypeName = useQuery({
    queryKey: ['name-size-type', sizeTypeName],
    queryFn: () => getSizeBySizeTypeName(sizeTypeName || ''),
    enabled: !!sizeTypeName,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        nameSize?: string;
        sizeTypeId?: string;
        description?: string;
      };
    }) => updateSize(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa kích thước',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-sizes'] });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa kích thước, vui lòng đợi',
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
    mutationFn: (id: string) => deleteSize(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá kích thước',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-sizes'] });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreSize(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục kích thước',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-sizes'] });
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
    getBySizeTypeName,
    getBySizeTypeId,
  };
}
