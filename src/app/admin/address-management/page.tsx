'use client';

import { useState } from 'react';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import { COUNTRY_CODE } from '@/lib/constants';
import Pagination from '@/components/custom/pagination';
import { Address } from '@/models/address';
import { capitalizeFirst } from '@/lib/utils';
import { useAddressAdmin } from '@/hooks/admin/useAddress';

export default function AdminAddressPage() {
  const { getAll } = useAddressAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredAddresss = getAll.data?.data?.filter((a: Address) =>
    a.address.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredAddresss || []).length / 20);

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Địa Chỉ</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-address'
          type='text'
          placeholder='Tìm kiếm địa chỉ...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Địa Chỉ</th>
              <th className='px-4 py-2 text-left'>SĐT</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredAddresss?.map((address: Address) => (
              <tr key={address._id}>
                <td className='px-4 py-2'>{address.address}</td>
                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {address.phone}
                </td>
                <td className='px-4 py-2'>{capitalizeFirst(address.status)}</td>
                <td className='px-4 py-2'>
                  {new Date(address.created_at).toLocaleDateString(
                    COUNTRY_CODE.VN
                  )}
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
