'use client';

import React, { useState } from 'react';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { EmailRegex } from '@/lib/constants';
import useAuth from '@/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

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

      <div className='flex justify-end my-2'>
        <Link href='/forgot-password' className='hover:underline'>
          Quên mật khẩu?
        </Link>
      </div>

      <Button
        type='submit'
        variant='primary'
        fullWidth
        shadow
        loading={login.isPending}
      >
        Đăng nhập
      </Button>

      <div className='flex justify-center mt-2'>
        <Link href='/register' className='hover:underline'>
          Chưa có tài khoản? Đăng ký
        </Link>
      </div>
    </form>
  );
}
