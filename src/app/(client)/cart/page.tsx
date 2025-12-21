'use client';
import CartTile from './cartTile';
import Button from '@/components/custom/button';
import { useRouter } from 'next/navigation';
import { COUNTRY_CODE } from '@/lib/constants';
import { useCart } from '@/hooks/client/useCart';
import { CartItem } from '@/models/cartItem';
import { useCartItem } from '@/hooks/client/useCartItem';
import { Spinner } from '@/components/custom/spinner';
import { useAddressClient } from '@/hooks/client/useAddress';

export default function CartPage() {
  const { getProvince, getDistrict, getWard, getAllByUser } =
    useAddressClient();
  const { getByUserId, totalFee } = useCart();
  const { edit } = useCartItem();

  const router = useRouter();

  const handleQuantityChange = (id: string, newQty: number) => {
    edit.mutate({ id, payload: { quantity: newQty } });

    if (getAllByUser.data.data)
      totalFee.mutate({
        from_district_id: 1,
        from_ward_code: '',
        to_district_id: 2,
        to_ward_code: '',
        address: getAllByUser.data.data[0],
        phonenumber: '',
      });
  };

  const handleRemove = (id: string) => {
    edit.mutate({ id, payload: { quantity: 0 } });
  };

  if (getByUserId.isLoading) return <Spinner />;

  return (
    <div className='max-w-5xl mx-auto py-10 flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        {getByUserId.data.data.items.map((item: CartItem) => (
          <CartTile
            key={item._id}
            cartItem={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        ))}
      </div>

      <div className='mt-6 p-6 border rounded-2xl shadow-sm flex flex-col bg-gray-50'>
        <div className='flex justify-between'>
          <span className='text-xl'>Tiền hàng:</span>
          <span className='text-2xl font-bold text-rose-700'>
            {totalFee.data.data.totalCartOrder.toLocaleString(COUNTRY_CODE.VN)}₫
          </span>
        </div>

        <div className='flex justify-between'>
          <span className='text-xl'>Phí ship:</span>
          <span className='text-2xl font-bold text-rose-700'>
            {totalFee.data.data.shippingFee.toLocaleString(COUNTRY_CODE.VN)}₫
          </span>
        </div>

        <div className='h-0.5 bg-rose-400 my-2'></div>

        <div className='flex justify-between'>
          <span className='text-xl font-semibold'>Tổng cộng:</span>
          <span className='text-2xl font-bold text-rose-700'>
            {(
              totalFee.data.data.totalCartOrder + totalFee.data.data.shippingFee
            ).toLocaleString(COUNTRY_CODE.VN)}
            ₫
          </span>
        </div>

        <Button
          onClick={() => router.push('/checkout')}
          className='mt-2 self-end'
        >
          Đặt hàng
        </Button>
      </div>
    </div>
  );
}
