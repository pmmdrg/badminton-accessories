'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Spinner } from '@/components/spinner';
import TextField from '@/components/textfield';
import { capitalizeFirst, isValidImageSrc, normalizedDate } from '@/lib/utils';
import { placeholderImage } from '@/assets/images';
import Pagination from '@/components/pagination';
import { User } from '@/models/user';
import { useUserManager } from '@/hooks/manager/useUser';
import clsx from 'clsx';

export default function ManagerUserPage() {
  const { getAll } = useUserManager();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredUsers = getAll.data?.data?.filter(
    (u: User) =>
      u.fullname.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredUsers || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Danh Sách Người Dùng</h1>
      <hr className='my-8 border-gray-400' />
      <div className='flex items-center justify-between mb-8'>
        <TextField
          name='search-user'
          type='text'
          placeholder='Tìm kiếm người dùng...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredUsers?.map((user: User) => (
              <tr key={user.id}>
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
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {user.fullname}
                </td>
                <td className='px-4 py-2'>{user.username}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {user.email}
                </td>
                <td className='px-4 py-2'>{normalizedDate(user.created_at)}</td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    user.status === 'active'
                      ? 'text-green-600'
                      : 'text-red-600',
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(user.status)}
                </td>
                <td
                  className={clsx(
                    'px-4',
                    'py-2',
                    {
                      'text-green-600': user.role === 'admin',
                      'text-orange-600': user.role === 'manager',
                      'text-blue-600': user.role === 'user',
                    },
                    'font-bold',
                  )}
                >
                  {capitalizeFirst(user.role)}
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
