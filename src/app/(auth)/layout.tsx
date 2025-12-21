import { loginBannerImage } from '@/assets/images';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-rose-700 text-white'>
      <div className='relative hidden md:block w-3/5 h-screen'>
        <Image
          src={loginBannerImage}
          alt='Login banner'
          fill
          className='object-cover'
          priority
        />
      </div>

      <div className='flex w-full md:w-2/5 items-center justify-center p-6 md:p-12 bg-gradient-to-br from-rose-400 to-rose-700'>
        {children}
      </div>
    </div>
  );
}
