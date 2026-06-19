'use client';

import Button from '@/components/button';
import useAuth from '@/hooks/useAuth';
import { ADMIN_ROUTES } from '@/lib/constants';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className='flex h-screen w-full'>
      <aside className='w-64 bg-gradient-to-b from-rose-800 via-rose-700 to-rose-500 text-white flex flex-col p-4'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>

        <nav className='flex flex-col space-y-1'>
          {ADMIN_ROUTES.map((route) => {
            const Icon = route.icon;

            return (
              <Link
                key={route.href}
                href={route.href}
                className={clsx(
                  'flex',
                  'items-center',
                  'gap-2',
                  'px-3',
                  'py-2',
                  'rounded-lg',
                  'hover:bg-white/30',
                  'transition',
                  'font-medium',
                  {
                    'bg-gradient-to-r from-white/20 to-white/30':
                      pathname === route.href,
                  },
                )}
              >
                {Icon && <Icon strokeWidth={2} className='h-5 w-5' />}
                {route.label}
              </Link>
            );
          })}

          <div className='border-t inset-0.5 border-white my-10' />

          <Button
            variant='primary'
            startIcon={<ArrowRightStartOnRectangleIcon className='h-5 w-5' />}
            onClick={() => logout.mutate()}
          >
            Đăng Xuất
          </Button>
        </nav>
      </aside>

      <main className='flex-1 bg-gray-50 p-6 overflow-y-auto'>{children}</main>
    </div>
  );
}
