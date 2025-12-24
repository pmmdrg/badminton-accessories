'use client';

import React, { useState } from 'react';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { EmailRegex } from '@/lib/constants';
import useAuth from '@/hooks/useAuth';

export default function RegisterPage() {
  const { registerUser } = useAuth();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validateForm = () => {
    const newError = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!fullname) newError.fullname = 'Vui lòng nhập tên đầy đủ của bạn';

    if (!username) newError.username = 'Vui lòng nhập tên người dùng';
    else if (username.length < 3 || username.length > 20)
      newError.username =
        'Tên người dùng phải có ít nhất 3 ký tự và không quá 20 ký tự';

    if (!email) newError.email = 'Vui lòng nhập email';
    else if (!EmailRegex.test(email)) newError.email = 'Email không hợp lệ';

    if (!password) newError.password = 'Vui lòng nhập mật khẩu';
    else if (password.length < 6)
      newError.password = 'Mật khẩu phải có ít nhất 6 ký tự';

    if (!confirmPassword)
      newError.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    else if (confirmPassword !== password)
      newError.confirmPassword = 'Mật khẩu xác nhận cần khớp với mật khẩu';

    setError(newError);

    return (
      !newError.email &&
      !newError.password &&
      !newError.confirmPassword &&
      !newError.fullname &&
      !newError.username
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    registerUser.mutate({
      username,
      fullname,
      email,
      password,
    });
  };

  return (
    <form
      onSubmit={handleRegister}
      className='w-full max-w-sm bg-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-lg border border-white/30 shadow-lg'
    >
      <h1 className='text-2xl md:text-3xl font-semibold text-center mb-8 text-white'>
        Badminton Accessories Shop
      </h1>

      <TextField
        name='username'
        placeholder='Tên người dùng'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={error.username}
        errorColor='text-gray-200'
        className='w-full text-black'
      />

      <TextField
        name='fullname'
        placeholder='Họ và tên'
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        error={error.fullname}
        errorColor='text-gray-200'
        className='w-full text-black'
      />

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
        loading={registerUser.isPending}
      >
        Đăng ký
      </Button>

      <div className='flex justify-center mt-2'>
        <Link href='/login' className='hover:underline'>
          Đã có tài khoản? Đăng nhập
        </Link>
      </div>

      <div className='flex justify-center mt-2'>
        <Link href='/' className='hover:underline'>
          Quay về Trang chủ
        </Link>
      </div>
    </form>
  );
}
