'use client';

import React, { useState } from 'react';
import TextField from '@/components/textfield';
import Button from '@/components/button';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { EmailRegex, TOAST_TYPE } from '@/lib/constants';
import useAuth from '@/hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import { useToast } from '@/components/toast';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { addToast } = useToast();

  const validateForm = () => {
    const newError = { email: '', password: '' };

    if (!email) newError.email = 'Vui lòng nhập email';
    else if (!EmailRegex.test(email)) newError.email = 'Email không hợp lệ';

    if (!password) newError.password = 'Vui lòng nhập mật khẩu';
    else if (password.length < 6)
      newError.password = 'Mật khẩu phải có ít nhất 6 ký tự';

    setError(newError);

    return !newError.email && !newError.password;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    login.mutate({
      email,
      password,
    });
  };

  return (
    <form
      onSubmit={handleLogin}
      className='w-full max-w-sm bg-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-lg border border-white/30 shadow-lg'
    >
      <h1 className='text-2xl md:text-3xl font-semibold text-center mb-8 text-white'>
        Badminton Accessories Shop
      </h1>

      <TextField
        name='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error.email}
        errorColor='text-gray-200'
        className='w-full text-black'
      />

      <TextField
        name='password'
        placeholder='Mật khẩu'
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={error.password}
        errorColor='text-gray-200'
        endIcon={
          <button type='button' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeSlashIcon className='w-5 h-5' />
            ) : (
              <EyeIcon className='w-5 h-5' />
            )}
          </button>
        }
        className='w-full text-black'
      />

      <div className='flex justify-end mt-2 mb-5'>
        <Link href='/forgot-password' className='hover:underline font-semibold'>
          Quên mật khẩu?
        </Link>
      </div>

      <Button
        type='submit'
        variant='primary'
        fullWidth
        shadow
        loading={login.isPending}
        className='mb-4'
      >
        Đăng nhập
      </Button>

      <GoogleLogin
        shape='pill'
        onSuccess={(credentialRes) => {
          console.log(credentialRes.credential);
        }}
        onError={() => {
          addToast({
            message: 'Đăng nhập thất bại, vui lòng thử lại sau.',
            type: TOAST_TYPE.ERROR,
          });
        }}
      />

      <div className='flex justify-center mt-5 gap-1'>
        <p>Chưa có tài khoản?</p>
        <Link href='/register' className='hover:underline font-semibold'>
          Đăng ký
        </Link>
      </div>

      <div className='flex justify-center mt-2'>
        <Link href='/' className='hover:underline font-semibold'>
          Quay về Trang chủ
        </Link>
      </div>
    </form>
  );
}
