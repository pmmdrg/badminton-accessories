import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import {
  FaceSmileIcon,
  CameraIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-rose-800 text-white py-10 px-6 md:px-16'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div>
          <h2 className='text-xl font-semibold mb-3'>
            Badminton Accessories Shop
          </h2>

          <p className='text-sm text-white mb-4'>
            Chuyên cung cấp phụ kiện cầu lông chất lượng cao – từ vợt, giày,
            balo đến phụ kiện luyện tập. Cam kết hàng chính hãng, dịch vụ tận
            tâm.
          </p>

          <p className='text-xs text-white'>
            © 2025{' '}
            <span className='font-medium'>Badminton Accessories Shop</span>. All
            rights reserved.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-3'>Điều hướng</h3>

          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/' className='hover:text-gray-300 transition'>
                Trang chủ
              </Link>
            </li>

            <li>
              <Link href='/about' className='hover:text-gray-300 transition'>
                Về chúng tôi
              </Link>
            </li>

            <li>
              <Link href='/product' className='hover:text-gray-300 transition'>
                Sản phẩm
              </Link>
            </li>

            <li>
              <Link href='/cart' className='hover:text-gray-300 transition'>
                Giỏ hàng
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-3'>Liên hệ</h3>

          <ul className='space-y-2 text-sm mb-4'>
            <li className='flex items-center gap-2'>
              <PhoneIcon className='h-4 w-4 text-white' />
              <span>0123 456 789</span>
            </li>

            <li className='flex items-center gap-2'>
              <EnvelopeIcon className='h-4 w-4 text-white' />

              <span>support@badmintonshop.vn</span>
            </li>

            <li className='flex items-center gap-2'>
              <MapPinIcon className='h-4 w-4 text-white' />

              <span>1 Võ Văn Ngân, phường Thủ Đức, TP.HCM</span>
            </li>
          </ul>

          <div className='flex items-center gap-4'>
            <a
              href='#'
              className='p-2 bg-rose-700 rounded-full hover:bg-rose-600 transition'
              aria-label='Facebook'
            >
              <FaceSmileIcon className='h-5 w-5 text-white' />
            </a>

            <a
              href='#'
              className='p-2 bg-rose-700 rounded-full hover:bg-rose-600 transition'
              aria-label='Instagram'
            >
              <CameraIcon className='h-5 w-5 text-white' />
            </a>

            <a
              href='#'
              className='p-2 bg-rose-700 rounded-full hover:bg-rose-600 transition'
              aria-label='YouTube'
            >
              <PlayCircleIcon className='h-5 w-5 text-white' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
