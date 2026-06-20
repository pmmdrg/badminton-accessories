'use client';

import { Spinner } from '@/components/spinner';

import { useStoreManager } from '@/hooks/manager/useStore';
import { STATUS } from '@/lib/constants';
import { capitalizeFirst, normalizedDate } from '@/lib/utils';
import clsx from 'clsx';

export default function ManagerUserPage() {
  const { getInfo } = useStoreManager();

  if (getInfo.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Thông Tin Cửa Hàng</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex gap-2 mb-2'>
        <p className='font-medium'>Mã cửa hàng:</p>
        <p>{getInfo.data?.data?.id}</p>
      </div>
      <div className='flex gap-2 mb-2'>
        <p className='font-medium'>Tên cửa hàng:</p>
        <p className='font-semibold text-rose-600'>
          {getInfo.data?.data?.nameStore}
        </p>
      </div>
      <div className='flex gap-2 mb-2'>
        <p className='font-medium'>Trạng thái:</p>
        <p
          className={clsx(
            getInfo.data?.data?.status === STATUS.ACTIVE
              ? 'text-green-600'
              : 'text-red-600',
            'font-bold',
          )}
        >
          {capitalizeFirst(getInfo.data?.data?.status)}
        </p>
      </div>
      <div className='flex gap-2 mb-2'>
        <p className='font-medium'>Ngày tạo thông tin:</p>
        <p className='font-semibold text-rose-600'>
          {normalizedDate(getInfo.data?.data?.created_at)}
        </p>
      </div>
      <div className='flex gap-2 mb-2'>
        <p className='font-medium'>Ngày cập nhật thông tin:</p>
        <p className='font-semibold text-rose-600'>
          {normalizedDate(getInfo.data?.data?.updated_at)}
        </p>
      </div>
      {getInfo.data?.data?.status === STATUS.ACTIVE ? (
        <div className='flex gap-2 mb-2'>
          <p className='font-medium'>Ngày kích hoạt:</p>
          <p className='font-semibold text-rose-600'>
            {normalizedDate(getInfo.data?.data?.activated_at)}
          </p>
        </div>
      ) : (
        <div className='flex gap-2 mb-2'>
          <p className='font-medium'>Ngày khoá:</p>
          <p className='font-semibold text-rose-600'>
            {normalizedDate(getInfo.data?.data?.inactivated_at)}
          </p>
        </div>
      )}
      <div className='flex gap-2 mb-2'>
        <p className='font-medium'>Địa chỉ cửa hàng:</p>
        <p>{getInfo.data?.data?.from_address}</p>
      </div>
      <div className='flex gap-2 mb-2'>
        <p className='font-medium'>Mã tỉnh/thành phố (cũ):</p>
        <p className='font-semibold text-rose-600'>
          {getInfo.data?.data?.from_province}
        </p>
      </div>
      <div className='flex gap-2 mb-2'>
        <p className='font-medium'>Mã quận/huyện (cũ):</p>
        <p className='font-semibold text-rose-600'>
          {getInfo.data?.data?.from_district}
        </p>
      </div>
      <div className='flex gap-2 mb-2'>
        <p className='font-medium'>Mã phường/xã (cũ):</p>
        <p className='font-semibold text-rose-600'>
          {getInfo.data?.data?.from_ward}
        </p>
      </div>
    </div>
  );
}
