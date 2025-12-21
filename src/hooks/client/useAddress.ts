'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createAddress,
  getAllAddressByUser,
  updateAddress,
} from '@/services/client/addressService';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';

export function useAddressClient() {
  const { addToast } = useToast();

  const getAllByUser = useQuery({
    queryKey: ['address'],
    queryFn: getAllAddressByUser,
  });

  const add = useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã tạo địa chỉ mới',
      });
    },
  });

  const edit = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        address: string;
      };
    }) => updateAddress(id, payload),
    onSuccess: () => {
      addToast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Đã chỉnh sửa địa chỉ',
      });
    },
  });

  return {
    getAllByUser,
    add,
    edit,
  };
}
