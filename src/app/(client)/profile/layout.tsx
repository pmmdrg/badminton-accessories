'use client';

import clsx from 'clsx';

interface ProfileLayoutProps {
  children: React.ReactNode;
  active?: 'profile' | 'orders';
}

export default function ProfileLayout({
  children,
  active = 'profile',
}: ProfileLayoutProps) {
  return (
    <div className='w-full min-h-screen px-4 md:px-10 py-10'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex gap-8'>
          <aside className='w-64 shrink-0'>
            <h2 className='text-lg font-semibold mb-4'>Hồ sơ người dùng</h2>

            <nav className='flex flex-col gap-2'>
              <button
                className={clsx(
                  'text-left px-3 py-2 rounded-md transition',
                  active === 'profile'
                    ? 'bg-rose-100 text-rose-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                )}
              >
                Thông tin cá nhân
              </button>

              <button
                className={clsx(
                  'text-left px-3 py-2 rounded-md transition',
                  active === 'orders'
                    ? 'bg-rose-100 text-rose-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                )}
              >
                Lịch sử đơn hàng
              </button>
            </nav>
          </aside>

          <div className='w-px bg-rose-700' />

          <main className='flex-1'>{children}</main>
        </div>
      </div>
    </div>
  );
}
