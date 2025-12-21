'use client';

import Button from '@/components/custom/button';
import useAuth from '@/hooks/useAuth';
import {
  ArchiveBoxIcon,
  ArrowRightStartOnRectangleIcon,
  InboxArrowDownIcon,
  InboxStackIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  Square3Stack3DIcon,
  TruckIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function ManagerLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className='flex h-screen w-full'>
      <aside className='w-64 bg-rose-600 text-white flex flex-col p-4 space-y-2'>
        <h1 className='text-2xl font-bold mb-4'>Manager Panel</h1>

        <nav className='flex flex-col space-y-1'>
          <Link
            href='/manager/product-management'
            className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500 transition font-medium'
          >
            <InboxStackIcon strokeWidth={2} className='h-5 w-5' /> Sản phẩm
          </Link>

          <Link
            href='/manager/product-item-management'
            className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500 transition font-medium'
          >
            <Square3Stack3DIcon strokeWidth={2} className='h-5 w-5' /> Mặt hàng
            sản phẩm
          </Link>

          <Link
            href='/manager/user-management'
            className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500 transition font-medium'
          >
            <UserIcon strokeWidth={2} className='h-5 w-5' /> Người dùng
          </Link>

          <Link
            href='/manager/brand-management'
            className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500 transition font-medium'
          >
            <RectangleGroupIcon strokeWidth={2} className='h-5 w-5' /> Thương
            hiệu
          </Link>

          <Link
            href='/manager/category-management'
            className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500 transition font-medium'
          >
            <RectangleStackIcon strokeWidth={2} className='h-5 w-5' /> Danh mục
          </Link>

          <Link
            href='/manager/order-management'
            className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500 transition font-medium'
          >
            <ArchiveBoxIcon strokeWidth={2} className='h-5 w-5' /> Đơn hàng
          </Link>

          <Link
            href='/manager/supplier-management'
            className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500 transition font-medium'
          >
            <UserGroupIcon strokeWidth={2} className='h-5 w-5' /> Nhà cung cấp
          </Link>

          <Link
            href='/manager/import-management'
            className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500 transition font-medium'
          >
            <TruckIcon strokeWidth={2} className='h-5 w-5' /> Nhập hàng
          </Link>

          <Link
            href='/manager/import-detail-management'
            className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500 transition font-medium'
          >
            <InboxArrowDownIcon strokeWidth={2} className='h-5 w-5' /> Chi tiết
            nhập hàng
          </Link>

          <div className='border-t inset-0.5 border-white my-10' />

          <Button
            variant='primary'
            startIcon={<ArrowRightStartOnRectangleIcon className='h-5 w-5' />}
            onClick={() => logout.mutate()}
          >
            Đăng xuất
          </Button>
        </nav>
      </aside>

      <main className='flex-1 bg-gray-50 p-6 overflow-y-auto'>{children}</main>
    </div>
  );
}
