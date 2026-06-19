'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ListBulletIcon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useToast } from './toast';
import { TOAST_TYPE } from '@/lib/constants';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) setIsLogin(true);
    else setIsLogin(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }

      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='bg-rose-800 shadow-md sticky top-0 z-50'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3'>
        <Link href='/' className='text-2xl font-bold text-white'>
          Badminton Accessories Shop
        </Link>

        <nav className='hidden md:flex items-center space-x-6'>
          <Link href='/' className='text-white hover:text-rose-300'>
            Trang chủ
          </Link>

          <Link href='/product' className='text-white hover:text-rose-300'>
            Sản phẩm
          </Link>

          <Link href='/about' className='text-white hover:text-rose-300'>
            Về chúng tôi
          </Link>

          <button
            className='text-white hover:text-rose-300'
            onClick={() => {
              if (
                localStorage.getItem('access_token') &&
                localStorage.getItem('access_token') !== ''
              )
                router.push('/cart');
              else
                addToast({
                  type: TOAST_TYPE.INFO,
                  message: 'Vui lòng đăng nhập để xem giỏ hàng',
                });
            }}
          >
            <ShoppingCartIcon className='w-6 h-6 text-white hover:text-rose-300' />
          </button>

          <div className='relative flex items-center' ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className='focus:outline-none'
            >
              <UserIcon className='w-6 h-6 text-white hover:text-rose-300' />
            </button>

            {userMenuOpen && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className='absolute top-5 right-0 mt-2 w-40 bg-white border border-gray-400 rounded-lg shadow-lg py-2'
                >
                  {!isLogin ? (
                    <>
                      <Link
                        href='/login'
                        className='block px-4 py-2 text-gray-700 hover:bg-rose-100 hover:text-rose-700'
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        href='/register'
                        className='block px-4 py-2 text-gray-700 hover:bg-rose-100 hover:text-rose-700'
                      >
                        Đăng ký
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          router.push('/profile/personal-information');
                        }}
                        className='w-full text-left block px-4 py-2 text-gray-700 hover:bg-rose-100 hover:text-rose-700'
                      >
                        Hồ sơ
                      </button>
                      <button
                        className='w-full text-left block px-4 py-2 text-gray-700 hover:bg-rose-100 hover:text-rose-700'
                        onClick={() => logout.mutate()}
                      >
                        Đăng xuất
                      </button>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </nav>

        <button
          className='md:hidden focus:outline-none'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className='w-6 h-6 text-white' />
          ) : (
            <ListBulletIcon className='w-6 h-6 text-white' />
          )}
        </button>
      </div>

      {menuOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='md:hidden bg-white border-t border-gray-200'
            ref={menuRef}
          >
            <nav className='flex flex-col p-4 space-y-3'>
              <Link href='/' className='text-gray-700 hover:text-rose-700'>
                Trang chủ
              </Link>

              <Link
                href='/contact'
                className='text-gray-700 hover:text-rose-700'
              >
                Liên hệ
              </Link>

              <Link href='/about' className='text-gray-700 hover:text-rose-700'>
                Về chúng tôi
              </Link>

              <Link href='/cart' className='text-gray-700 hover:text-rose-700'>
                Giỏ hàng
              </Link>

              <div className='border-t pt-3 mt-2'>
                <Link
                  href='/login'
                  className='block text-gray-700 hover:text-rose-700'
                >
                  Đăng nhập
                </Link>

                <Link
                  href='/register'
                  className='block text-gray-700 hover:text-rose-700'
                >
                  Đăng ký
                </Link>
              </div>
            </nav>
          </motion.div>
        </AnimatePresence>
      )}
    </header>
  );
}
