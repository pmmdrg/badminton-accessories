'use client';

import React, { useState } from 'react';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { EmailRegex } from '@/lib/constants';
import useAuth from '@/hooks/useAuth';

export default function ForgotPasswordPage() {
  const { requestChangePassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    let newError = '';

    if (!email) newError = 'Vui lòng nhập email';
    else if (!EmailRegex.test(email)) newError = 'Email không hợp lệ';

    setError(newError);

    return !newError;
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    requestChangePassword.mutate({
      email,
    });
  };

  return (
    <form
      onSubmit={handleRequestReset}
      className='w-full max-w-sm bg-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-lg border border-white/30 shadow-lg'
    >
      <h1 className='text-2xl md:text-3xl font-semibold text-center mb-8 text-white'>
        Badminton Accessories Shop
      </h1>

      <p className='font-medium'>
        Nhập email của tài khoản bạn muốn đổi mật khẩu, chúng tôi sẽ gửi một
        link để bạn đổi mật khẩu.
      </p>

      <TextField
        name='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        errorColor='text-gray-200'
        className='w-full text-black my-4'
      />

      <Button
        type='submit'
        variant='primary'
        fullWidth
        shadow
        loading={requestChangePassword.isPending}
      >
        Yêu cầu đổi mật khẩu
      </Button>
    </form>
  );
}
