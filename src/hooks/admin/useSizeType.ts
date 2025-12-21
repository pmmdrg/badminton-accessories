'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useSizeTypeAdmin(id?: string, name?: string) {
  const { addToast } = useToast();

  const add = useMutation({
    mutationFn: createSizeType,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo loại kích thước mới',
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
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa loại kích thước',
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
    },
  });

  const restore = useMutation({
    mutationFn: (id: string) => restoreSizeType(id),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã khôi phục loại kích thước',
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
