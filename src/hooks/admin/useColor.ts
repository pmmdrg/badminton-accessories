'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createColor,
  deleteColor,
  getAllActiveColorAdmin,
  getAllColorAdmin,
  getAllInactiveColorAdmin,
  getColorByIdAdmin,
  getColorByNameAdmin,
  restoreColor,
  updateColor,
} from '@/services/admin/colorService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useColorAdmin(id?: string, name?: string) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createColor,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo màu mới',
      });
    },
  });

  const getAll = useQuery({
    queryKey: ['admin-colors'],
    queryFn: getAllColorAdmin,
  });

  const getAllActive = useQuery({
    queryKey: ['admin-active-colors'],
    queryFn: getAllActiveColorAdmin,
  });

  const getAllInactive = useQuery({
    queryKey: ['admin-inactive-colors'],
    queryFn: getAllInactiveColorAdmin,
  });

  const getById = useQuery({
    queryKey: ['id', id],
    queryFn: () => getColorByIdAdmin(id || ''),
    enabled: !!id,
  });

  const getByName = useQuery({
    queryKey: ['nameColor', name],
    queryFn: () => getColorByNameAdmin(name || ''),
    enabled: !!name,
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        nameColor?: string;
        description?: string;
      };
    }) => updateColor(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa màu',
      });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteColor(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã xoá màu',
      });
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreColor(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục màu',
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
