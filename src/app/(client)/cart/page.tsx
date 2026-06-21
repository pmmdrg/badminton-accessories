'use client';
import CartTile from './cartTile';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/client/useCart';
import { CartItem } from '@/models/cartItem';
import { useCartItem } from '@/hooks/client/useCartItem';
import { Spinner } from '@/components/spinner';
import { COUNTRY_CODE } from '@/lib/constants';
import { useUserClient } from '@/hooks/client/useUser';

export default function CartPage() {
  const { getInfo } = useUserClient();
  const { getByUserId, totalFee } = useCart();
  const { edit, remove } = useCartItem();
  const router = useRouter();

  const handleQuantityChange = (id: string, newQty: number) => {
    edit.mutate({ id, payload: { quantity: newQty } });
  };

  const handleRemove = (id: string) => {
    remove.mutate(id);
  };

  if (getByUserId.isLoading) return <Spinner />;

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='max-w-5xl px-20 m-10 flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          {getByUserId.data?.data?.items?.length > 0 ? (
            getByUserId.data.data.items.map((item: CartItem) => (
              <CartTile
                key={item.id}
                cartItem={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <div className='text-gray-500 h-32 flex items-center justify-center bg-gradient-to-br from-white/20 via-gray-200 to-gray-300 border border-white/30 backdrop-blur-md rounded-2xl shadow-xl px-2'>
              Chưa có sản phẩm trong giỏ hàng, hãy thêm sản phẩm vào giỏ hàng.
            </div>
          )}
        </div>

        <div className='mt-6 p-6 bg-gradient-to-br from-white/20 via-gray-200 to-gray-300 border border-white/30 backdrop-blur-md rounded-2xl shadow-xl flex flex-col'>
          <div className='flex justify-between'>
            <span className='text-xl font-semibold'>Tiền Hàng:</span>
            {totalFee.data && (
              <span className='text-2xl font-bold text-rose-700'>
                {totalFee.data.data?.totalCart?.toLocaleString(COUNTRY_CODE.VN)}
                ₫
              </span>
            )}
          </div>

          <div className='flex justify-between'>
            <span className='text-xl font-semibold'>Phí Ship:</span>
            {totalFee.data && (
              <span className='text-2xl font-bold text-rose-700'>
                {totalFee.data.data?.shippingFee?.toLocaleString(
                  COUNTRY_CODE.VN,
                )}
                ₫
              </span>
            )}
          </div>

          <p className='mt-4 text-sm text-gray-500'>
            {`* Lưu ý: Để đặt hàng, bạn cần có địa chỉ giao hàng. Nếu chưa thiết
            lập, vui lòng chọn Hồ Sơ -> Địa Chỉ để thiết lập địa chỉ.`}
          </p>

          <div className='h-0.5 bg-rose-400 my-2' />

          <div className='flex justify-between'>
            <span className='text-xl font-semibold'>Tổng Cộng:</span>
            {totalFee.data && (
              <span className='text-2xl font-bold text-rose-700'>
                {totalFee.data.data?.totalCartOrder?.toLocaleString(
                  COUNTRY_CODE.VN,
                )}
                ₫
              </span>
            )}
          </div>

          <Button
            onClick={() => router.push('/checkout')}
            className='mt-2 self-end'
            disabled={
              !totalFee.isSuccess ||
              !getInfo.data?.data?.to_address ||
              !getInfo.data?.data?.to_province ||
              !getInfo.data?.data?.to_district ||
              !getInfo.data?.data?.to_ward
            }
          >
            Đặt Hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
