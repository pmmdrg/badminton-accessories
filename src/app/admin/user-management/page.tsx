'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useUserAdmin } from '@/hooks/admin/useUser';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { STATUS } from '@/lib/constants';
import { capitalizeFirst, isValidImageSrc, normalizedDate } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/custom/pagination';
import { User } from '@/models/user';
import AddManagerModal from './addManagerModal';
import useAuth from '@/hooks/useAuth';

export default function AdminUserPage() {
  const { getAll, lock, restore } = useUserAdmin();
  const { registerManager } = useAuth();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredUsers = getAll.data?.data?.filter(
    (u: User) =>
      u.fullname.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredUsers || []).length / 20);

  const validateForm = (
    username: string,
    fullname: string,
    email: string,
    password: string
  ) => {
    if (username === '' || fullname === '' || email === '' || password === '')
      return false;
    return true;
  };

  const handleConfirm = (
    username: string,
    fullname: string,
    email: string,
    password: string
  ) => {
    if (!validateForm) return;

    registerManager.mutate({ username, fullname, email, password });
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Người Dùng</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-user'
          type='text'
          placeholder='Tìm kiếm người dùng...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpen(true)}>
          Thêm người quản lý
        </Button>
        <AddManagerModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={handleConfirm}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Ảnh</th>
              <th className='px-4 py-2 text-left'>Họ Tên</th>
              <th className='px-4 py-2 text-left'>Username</th>
              <th className='px-4 py-2 text-left'>Email</th>
              <th className='px-4 py-2 text-left'>Ngày tạo</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Quyền</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredUsers?.map((user: User) => (
              <tr key={user._id}>
                <td className='px-4 py-2'>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={
                        user.avatar && isValidImageSrc(user.avatar)
                          ? user.avatar
                          : placeholderImage
                      }
                      alt={user.fullname}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                </td>
                <td className='px-4 py-2'>{user.fullname}</td>
                <td className='px-4 py-2'>{user.username}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {user.email}
                </td>
                <td className='px-4 py-2'>{normalizedDate(user.created_at)}</td>
                <td className='px-4 py-2'>{capitalizeFirst(user.status)}</td>
                <td className='px-4 py-2'>{capitalizeFirst(user.role)}</td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    {user.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => lock.mutate(user._id)}
                      >
                        Khoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(user._id)}
                      >
                        Khôi phục
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currPage}
        totalPages={totalPages}
        onPageChange={setCurrPage}
      />
    </div>
  );
}
