'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSizeType,
  deleteSizeType,
  getAllActiveSizeTypeAdmin,
  getAllSizeTypeAdmin,
  getAllInactiveSizeTypeAdmin,
  getSizeTypeByIdAdmin,
  getSizeTypeByNameAdmin,
  restoreSizeType,
  updateSizeType,
} from '@/services/admin/sizeTypeService';
import { useToast } from '@/components/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export function useSizeTypeAdmin(id?: string, name?: string) {
  const { addToast, updateToast } = useToast();
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: createSizeType,
    onSuccess: (_, __, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo loại kích thước mới',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-size-types'] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang tạo loại kích thước mới, vui lòng đợi',
      });

      return { toastId };
    },
    onError: (err: AxiosError<ApiError>, _, ctx) => {
      updateToast(ctx!.toastId, {
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  const getAll = useQuery({
    queryKey: ['admin-size-types'],
    queryFn: getAllSizeTypeAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-size-types'],
    queryFn: getAllActiveSizeTypeAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-size-types'],
    queryFn: getAllInactiveSizeTypeAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getSizeTypeByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameSizeType', name],
    queryFn: () => getSizeTypeByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        nameSizeType?: string;
        description?: string;
      };
    }) => updateSizeType(id, payload),
    onSuccess: (_, variables, ctx) => {
      updateToast(ctx.toastId, {
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa loại kích thước',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-size-types'] });
      queryClient.invalidateQueries({ queryKey: ['id', variables.id] });
    },
    onMutate: () => {
      const toastId = addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang chỉnh sửa loại kích thước, vui lòng đợi',
      });

      return { toastId };
    },
    onError: (err: AxiosError<ApiError>, _, ctx) => {
      updateToast(ctx!.toastId, {
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteSizeType(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá loại kích thước',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-size-types'] });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreSizeType(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục loại kích thước',
      });

      queryClient.invalidateQueries({ queryKey: ['admin-size-types'] });
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
