'use client';

import { useState } from 'react';
import { Spinner } from '@/components/custom/spinner';
import TextField from '@/components/custom/textfield';
import Button from '@/components/custom/button';
import { COUNTRY_CODE, STATUS } from '@/lib/constants';
import Pagination from '@/components/custom/pagination';
import { useSupplierAdmin } from '@/hooks/admin/useSupplier';
import { Supplier } from '@/models/supplier';
import EditSupplierModal from './editSupplierModal';
import AddSupplierModal from './addSupplierModal';
import { capitalizeFirst } from '@/lib/utils';

export default function AdminSupplierPage() {
  const { getAll, add, edit, remove, restore } = useSupplierAdmin();
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const filteredSuppliers = getAll.data?.data?.filter((s: Supplier) =>
    s.nameSupplier.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredSuppliers || []).length / 20);

  const handleConfirmAdd = async (supplierName: string, address: string) => {
    add.mutate({
      nameSupplier: supplierName,
      address,
    });
  };

  const handleConfirmEdit = async (supplierName: string, address: string) => {
    edit.mutate({
      id: selectedId,
      payload: {
        nameSupplier: supplierName,
        address,
      },
    });

    setSelectedId('');
  };

  if (getAll.isLoading) return <Spinner />;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Nhà Cung Cấp</h1>

      <div className='flex items-center justify-between mb-4'>
        <TextField
          name='search-supplier'
          type='text'
          placeholder='Tìm kiếm nhà cung cấp...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='info' onClick={() => setIsOpenAdd(true)}>
          Thêm nhà cung cấp
        </Button>
        <AddSupplierModal
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
          onConfirm={handleConfirmAdd}
        />
        <EditSupplierModal
          supplierId={selectedId}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          onConfirm={handleConfirmEdit}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Nhà Cung Cấp</th>
              <th className='px-4 py-2 text-left'>Địa Chỉ</th>
              <th className='px-4 py-2 text-left'>Trạng Thái</th>
              <th className='px-4 py-2 text-left'>Ngày Tạo</th>
              <th className='px-4 py-2 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredSuppliers?.map((supplier: Supplier) => (
              <tr key={supplier._id}>
                <td className='px-4 py-2'>{supplier.nameSupplier}</td>

                <td className='px-4 py-2 text-rose-700 font-semibold'>
                  {supplier.address}
                </td>

                <td className='px-4 py-2'>
                  {capitalizeFirst(supplier.status)}
                </td>
                <td className='px-4 py-2'>
                  {new Date(supplier.created_at).toLocaleDateString(
                    COUNTRY_CODE.VN
                  )}
                </td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='info'
                      className='px-2 py-1'
                      onClick={() => {
                        setSelectedId(supplier._id);
                        setIsOpenEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {supplier.status === STATUS.ACTIVE ? (
                      <Button
                        variant='danger'
                        className='px-2 py-1'
                        onClick={() => remove.mutate(supplier._id)}
                      >
                        Xoá
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='px-2 py-1'
                        onClick={() => restore.mutate(supplier._id)}
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
