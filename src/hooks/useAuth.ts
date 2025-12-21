'use client';

import { useMutation } from '@tanstack/react-query';
import {
  loginUser,
  logOut,
  signUpUser,
  signUpAdmin,
  signUpManager,
  requestResetPassword,
  changePassword,
} from '@/services/authService';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { DecodePayload } from '@/types/decodeAuthPayload';
import { useToast } from '@/components/custom/toast';
import { TOAST_TYPE } from '@/lib/constants';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/apiError';

export default function useAuth() {
  const router = useRouter();
  const { addToast } = useToast();

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.data?.access_token && data?.data?.refresh_token) {
        const decode = jwtDecode<DecodePayload>(data.data.access_token);

        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token);

        if (decode?.role === 'admin') router.replace('/admin/dashboard');
        else if (decode?.role === 'manager')
          router.replace('/manager/product-management');
        else router.replace('/');

        addToast({ message: 'Đăng nhập thành công', type: TOAST_TYPE.SUCCESS });
      }
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  const registerUser = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      if (data?.data?.access_token && data?.data?.refresh_token) {
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token);

        router.replace('/');

        addToast({
          message: 'Đăng ký tài khoản thành công',
          type: TOAST_TYPE.SUCCESS,
        });
      }
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang đăng ký tài khoản mới, vui lòng đợi',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  const registerAdmin = useMutation({
    mutationFn: signUpAdmin,
    onSuccess: (data) => {
      if (data?.data?.access_token && data?.data?.refresh_token) {
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token);

        router.replace('/admin/dashboard');

        addToast({
          message: 'Đăng ký tài khoản admin thành công',
          type: TOAST_TYPE.SUCCESS,
        });
      }
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang đăng ký tài khoản mới, vui lòng đợi',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  const registerManager = useMutation({
    mutationFn: signUpManager,
    onSuccess: () => {
      addToast({
        message: 'Đăng ký tài khoản quản lý thành công',
        type: TOAST_TYPE.SUCCESS,
      });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang đăng ký tài khoản mới, vui lòng đợi',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  const logout = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      localStorage.clear();

      router.replace('/login');

      addToast({
        message: 'Đã đăng xuất',
        type: TOAST_TYPE.SUCCESS,
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  const requestChangePassword = useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      addToast({
        message: 'Đã yêu cầu đổi mật khẩu',
        type: TOAST_TYPE.SUCCESS,
      });
    },
  });

  const resetPassword = useMutation({
    mutationFn: ({
      token,
      payload,
    }: {
      token: string;
      payload: { password: string };
    }) => changePassword(token, payload),
    onSuccess: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      router.replace('/login');

      addToast({
        message: 'Đã đổi mật khẩu, vui lòng đăng nhập lại',
        type: TOAST_TYPE.SUCCESS,
      });
    },
    onMutate: () => {
      addToast({
        type: TOAST_TYPE.INFO,
        message: 'Đang đổi mật khẩu, vui lòng đợi',
      });
    },
    onError: (err: AxiosError<ApiError>) => {
      addToast({
        type: TOAST_TYPE.ERROR,
        message: `Xảy ra lỗi: ${err.response?.data?.message}`,
      });
    },
  });

  return {
    login,
    registerUser,
    registerAdmin,
    registerManager,
    logout,
    resetPassword,
    requestChangePassword,
  };
}
