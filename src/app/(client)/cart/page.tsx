'use client';
import CartTile from './cartTile';
import Button from '@/components/custom/button';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/client/useCart';
import { CartItem } from '@/models/cartItem';
import { useCartItem } from '@/hooks/client/useCartItem';
import { Spinner } from '@/components/custom/spinner';
import { SelectString, SelectNumber } from '@/components/custom/select';
import { useGHN } from '@/hooks/useGHN';
import { normalizedSelectOptions } from '@/lib/utils';
import { useState } from 'react';
import { COUNTRY_CODE } from '@/lib/constants';
import TextField from '@/components/custom/textfield';

export default function CartPage() {
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { getProvince, getDistrict, getWard } = useGHN(province, district);
  const { getByUserId, totalFee } = useCart(
    district,
    ward,
    address,
    phoneNumber
  );
  const { edit, remove } = useCartItem();
  const router = useRouter();

  const provinceOptions = getProvince.data?.data
    ? [
        { label: 'Tỉnh/Thành phố', value: 0 },
        ...getProvince.data.data.map(
          (p: { ProvinceName: string; ProvinceID: number }) =>
            normalizedSelectOptions(p.ProvinceName, p.ProvinceID)
        ),
      ]
    : [{ label: 'Tỉnh/Thành phố', value: 0 }];

  const districtOptions = getDistrict.data?.data
    ? [
        { label: 'Quận/Huyện', value: 0 },
        ...getDistrict.data.data.map(
          (d: { DistrictName: string; DistrictID: number }) =>
            normalizedSelectOptions(d.DistrictName, d.DistrictID)
        ),
      ]
    : [{ label: 'Quận/Huyện', value: 0 }];

  const wardOptions = getWard.data?.data
    ? [
        { label: 'Phường/Xã', value: '' },
        ...getWard.data.data.map((w: { WardName: string; WardCode: string }) =>
          normalizedSelectOptions(w.WardName, w.WardCode)
        ),
      ]
    : [{ label: 'Phường/Xã', value: '' }];

  const handleQuantityChange = (id: string, newQty: number) => {
    edit.mutate({ id, payload: { quantity: newQty } });
  };

  const handleRemove = (id: string) => {
    remove.mutate(id);
  };

  if (getByUserId.isLoading) return <Spinner />;

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='max-w-5xl px-20 m-10 flex flex-col gap-6 border-r-2 border-r-rose-700'>
        <div className='flex flex-col gap-4'>
          {getByUserId.data?.data?.items?.length > 0 ? (
            getByUserId.data.data.items.map((item: CartItem) => (
              <CartTile
                key={item._id}
                cartItem={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <div className='min-w-md h-32 flex items-center justify-center border rounded-2xl px-2'>
              Chưa có sản phẩm trong giỏ hàng, hãy thêm sản phẩm vào giỏ hàng
            </div>
          )}
        </div>

        <div className='mt-6 p-6 border rounded-2xl shadow-sm flex flex-col bg-gray-50'>
          <div className='flex justify-between'>
            <span className='text-xl'>Tiền hàng:</span>
            {totalFee.data && (
              <span className='text-2xl font-bold text-rose-700'>
                {totalFee.data.data?.totalCart?.toLocaleString(COUNTRY_CODE.VN)}
                ₫
              </span>
            )}
          </div>

          <div className='flex justify-between'>
            <span className='text-xl'>Phí ship:</span>
            {totalFee.data && (
              <span className='text-2xl font-bold text-rose-700'>
                {totalFee.data.data?.shippingFee?.toLocaleString(
                  COUNTRY_CODE.VN
                )}
                ₫
              </span>
            )}
          </div>

          <div className='h-0.5 bg-rose-400 my-2'></div>

          <div className='flex justify-between'>
            <span className='text-xl font-semibold'>Tổng cộng:</span>
            {totalFee.data && (
              <span className='text-2xl font-bold text-rose-700'>
                {totalFee.data.data?.totalCartOrder?.toLocaleString(
                  COUNTRY_CODE.VN
                )}
                ₫
              </span>
            )}
          </div>

          <Button
            onClick={() =>
              router.push(
                `/checkout?district=${district}&ward=${ward}&address=${encodeURIComponent(
                  address
                )}&phone=${phoneNumber}`
              )
            }
            className='mt-2 self-end'
            disabled={!totalFee.isSuccess}
          >
            Đặt hàng
          </Button>
        </div>
      </div>

      <div className='px-10'>
        <p className='font-semibold my-4'>
          Vui lòng chọn địa chỉ để tính phí ship và tổng tiền hàng
        </p>
        <div className='flex flex-col gap-4'>
          <SelectNumber
            label='Tỉnh/Thành phố'
            value={province}
            onChange={(value) => {
              setDistrict(0);
              setWard('');
              setProvince(value);
            }}
            options={provinceOptions}
            className='ml-2'
          />
          <SelectNumber
            label='Quận/Huyện'
            value={district}
            onChange={(value) => {
              setWard('');
              setDistrict(value);
            }}
            options={districtOptions}
            className='ml-2'
          />
          <SelectString
            label='Phường/Xã'
            value={ward}
            onChange={(value) => {
              setWard(value + '');
            }}
            options={wardOptions}
            className='ml-2'
          />

          <TextField
            name='address'
            label='Địa chỉ cụ thể (số nhà, tên đường, ...)'
            placeholder='Nhập địa chỉ'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={address === '' ? 'Vui lòng nhập địa chỉ để đặt hàng' : ''}
          />

          <TextField
            name='phone-number'
            label='Số điện thoại'
            placeholder='Nhập số điện thoại'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={
              phoneNumber === ''
                ? 'Vui lòng nhập số điện thoại để đặt hàng'
                : ''
            }
          />
        </div>
      </div>
    </div>
  );
}
