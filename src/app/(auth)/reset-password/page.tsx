'use client';

import React, { useState } from 'react';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { useSearchParams } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validateForm = () => {
    const newError = {
      password: '',
      confirmPassword: '',
    };

    if (!password) newError.password = 'Vui lòng nhập mật khẩu';
    else if (password.length < 6)
      newError.password = 'Mật khẩu phải có ít nhất 6 ký tự';

    if (!confirmPassword)
      newError.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    else if (confirmPassword !== password)
      newError.confirmPassword = 'Mật khẩu xác nhận cần khớp với mật khẩu';

    setError(newError);

    return !newError.password && !newError.confirmPassword;
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !token) return;

    resetPassword.mutate({
      token,
      payload: { password: password },
    });
  };

  return (
    <form
      onSubmit={handleReset}
      className='w-full max-w-sm bg-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-lg border border-white/30 shadow-lg'
    >
      <h1 className='text-2xl md:text-3xl font-semibold text-center mb-8 text-white'>
        Badminton Accessories Shop
      </h1>

      <p className='font-medium'>Nhập mật khẩu mới cho tài khoản của bạn.</p>

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

      <TextField
        name='confirm-password'
        placeholder='Xác nhận mật khẩu'
        type={showConfirm ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={error.confirmPassword}
        errorColor='text-gray-200'
        endIcon={
          <button type='button' onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? (
              <EyeSlashIcon className='w-5 h-5' />
            ) : (
              <EyeIcon className='w-5 h-5' />
            )}
          </button>
        }
        className='w-full text-black mb-2'
      />

      <Button
        type='submit'
        variant='primary'
        fullWidth
        shadow
        loading={resetPassword.isPending}
      >
        Đổi mật khẩu
      </Button>

      <div className='flex justify-center mt-2'>
        <Link href='/' className='hover:underline'>
          Quay về Trang chủ
        </Link>
      </div>
    </form>
  );
}
