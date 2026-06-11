'use client';

import useAuth from '@/hooks/useAuth';
import { SENDBIRD_COLOR_SET, SENDBIRD_STRING_SET } from '@/lib/constants';
import dynamic from 'next/dynamic';

const SendbirdApp = dynamic(
  () => import('@sendbird/uikit-react').then((module) => module.App),
  { ssr: false },
);

export default function ManagerChatPage() {
  const { userId } = useAuth();
  const appId = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || '';

  return (
    <div className='h-full p-6'>
      <h1 className='text-2xl font-bold mb-4'>Chat</h1>

      {appId && userId ? (
        <div className='h-[calc(100vh-9rem)]'>
          <SendbirdApp
            appId={appId}
            userId={userId}
            colorSet={SENDBIRD_COLOR_SET}
            stringSet={SENDBIRD_STRING_SET}
          />
        </div>
      ) : (
        <div className='rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600'>
          Không thể kết nối đến Sendbird. Vui lòng kiểm tra phiên đăng nhập hoặc
          liên hệ quản trị viên.
        </div>
      )}
    </div>
  );
}
