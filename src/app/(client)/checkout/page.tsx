'use client';

import Select from '@/components/custom/select';
import Image from 'next/image';
import { useState } from 'react';
import products from '@/mock/products.json';
import { placeholderImage } from '@/assets/images';
import Button from '@/components/custom/button';
import { COUNTRY_CODE } from '@/lib/constants';

export default function CheckoutPage() {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const shipFee = 200000;
  const total = products.slice(0, 5).reduce((sum, i) => {
    return sum + i.price * i.quantity;
  }, 0);

  return (
    <div className='min-h-screen w-full bg-gray-100 py-12 px-6 flex justify-center'>
      <div className='w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-8'>
        <h1 className='text-3xl font-bold mb-6'>Tổng Hợp Đơn Hàng</h1>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Chọn địa chỉ giao hàng</h2>
          <Select
            label='Địa chỉ'
            value={address}
            options={[
              { label: 'Địa chỉ 1: 123 Phố A, Quận B', value: 'address-1' },
              { label: 'Địa chỉ 2: 456 Phố C, Quận D', value: 'address-2' },
              { label: 'Chọn địa chỉ giao hàng', value: '' },
            ]}
            onChange={setAddress}
            className='w-full border border-gray-300 rounded-lg p-3'
          />
        </div>

        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Sản phẩm đã chọn</h2>
          {products.slice(0, 5).map((product) => {
            return (
              <div
                key={product.id}
                className='border border-gray-200 rounded-lg p-4 space-y-4'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='relative w-20 h-20 rounded-lg overflow-hidden'>
                      <Image
                        src={
                          product.imageUrl && product.imageUrl.length !== 0
                            ? product.imageUrl
                            : placeholderImage
                        }
                        alt='Sản phẩm'
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div>
                      <p className='font-semibold'>{product.name}</p>
                      <p className='text-gray-500'>
                        Số lượng: {product.quantity}
                      </p>
                    </div>
                  </div>
                  <p className='font-semibold'>
                    {(product.price * product.quantity).toLocaleString(
                      COUNTRY_CODE.VN
                    )}
                    ₫
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className='flex justify-between items-center text-lg'>
          <span>Tiền hàng:</span>
          <span>{total.toLocaleString(COUNTRY_CODE.VN)}₫</span>
        </div>

        <div className='flex justify-between items-center text-lg'>
          <span>Phí ship:</span>
          <span>{shipFee.toLocaleString(COUNTRY_CODE.VN)}₫</span>
        </div>

        <div className='flex justify-between items-center text-xl font-bold'>
          <span>Tổng tiền:</span>
          <span>{(total + shipFee).toLocaleString(COUNTRY_CODE.VN)}₫</span>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Phương thức thanh toán</h2>
          <Select
            label='Chọn phương thức thanh toán'
            value={paymentMethod}
            options={[
              { label: 'Thanh toán khi nhận hàng (COD)', value: '' },
              { label: 'Chuyển khoản ngân hàng', value: 'banking' },
              { label: 'Ví điện tử', value: 'e-wallet' },
            ]}
            onChange={setPaymentMethod}
            className='w-full border border-gray-300 rounded-lg p-3'
          />
        </div>

        <Button className='w-full font-bold py-3'>Thanh Toán Đơn Hàng</Button>
      </div>
    </div>
  );
}
