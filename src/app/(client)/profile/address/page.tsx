'use client';

import { useGHN } from '@/hooks/useGHN';
import { normalizedSelectOptions } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { SelectNumber, SelectString } from '@/components/select';
import TextField from '@/components/textfield';
import { useUserClient } from '@/hooks/client/useUser';
import { Spinner } from '@/components/spinner';
import Button from '@/components/button';

export default function AddressPage() {
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');

  const { getProvince, getDistrict, getWard } = useGHN(province, district);
  const { getInfo, editAddress } = useUserClient();

  const isChangeAddress =
    getInfo.data?.data?.to_province !== province ||
    getInfo.data?.data?.to_district !== district ||
    getInfo.data?.data?.to_ward !== ward ||
    getInfo.data?.data?.to_address !== address;

  const provinceOptions = getProvince.data?.data
    ? [
        { label: 'Tỉnh/Thành Phố', value: 0 },
        ...getProvince.data.data.map(
          (p: { ProvinceName: string; ProvinceID: number }) =>
            normalizedSelectOptions(p.ProvinceName, p.ProvinceID),
        ),
      ]
    : [{ label: 'Tỉnh/Thành Phố', value: 0 }];

  const districtOptions = getDistrict.data?.data
    ? [
        { label: 'Quận/Huyện', value: 0 },
        ...getDistrict.data.data.map(
          (d: { DistrictName: string; DistrictID: number }) =>
            normalizedSelectOptions(d.DistrictName, d.DistrictID),
        ),
      ]
    : [{ label: 'Quận/Huyện', value: 0 }];

  const wardOptions = getWard.data?.data
    ? [
        { label: 'Phường/Xã', value: '' },
        ...getWard.data.data.map((w: { WardName: string; WardCode: string }) =>
          normalizedSelectOptions(w.WardName, w.WardCode),
        ),
      ]
    : [{ label: 'Phường/Xã', value: '' }];

  useEffect(() => {
    const addressInfo = getInfo.data?.data;

    if (addressInfo) {
      setProvince(addressInfo.to_province || 0);
      setDistrict(addressInfo.to_district || 0);
      setWard(addressInfo.to_ward || '');
      setAddress(addressInfo.to_address || '');
    }
  }, [getInfo.data]);

  if (getInfo.isLoading) return <Spinner />;

  return (
    <div className='max-w-5xl mx-auto px-6 py-10'>
      <h1 className='text-2xl font-bold mb-8'>Địa Chỉ</h1>

      <div className='flex gap-4 flex-wrap pl-2 pb-2'>
        <SelectNumber
          label='Tỉnh/Thành Phố'
          value={province}
          onChange={(value) => {
            setDistrict(0);
            setWard('');
            setProvince(value);
          }}
          options={provinceOptions}
        />
        <SelectNumber
          label='Quận/Huyện'
          value={district}
          onChange={(value) => {
            setWard('');
            setDistrict(value);
          }}
          options={districtOptions}
        />
        <SelectString
          label='Phường/Xã'
          value={ward}
          onChange={(value) => {
            setWard(value + '');
          }}
          options={wardOptions}
        />
      </div>
      <TextField
        name='address'
        label='Địa Chỉ Cụ Thể (Số Nhà, Tên Đường, ...)'
        placeholder='Nhập địa chỉ giao hàng'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={address === '' ? 'Vui lòng nhập địa chỉ giao hàng' : ''}
        fullWidth
      />
      <Button
        disabled={
          !isChangeAddress ||
          province === 0 ||
          district === 0 ||
          ward === '' ||
          address === ''
        }
        className='ml-2 mt-8'
        onClick={() => {
          editAddress.mutate({
            to_address: address,
            to_district: district,
            to_province: province,
            to_ward: ward,
          });
        }}
      >
        Cập Nhật Địa Chỉ Giao Hàng
      </Button>
    </div>
  );
}
