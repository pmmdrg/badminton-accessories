import Modal from '@/components/custom/modal';
import { Spinner } from '@/components/custom/spinner';
import { useOrderAdmin } from '@/hooks/admin/useOrder';
import { COUNTRY_CODE } from '@/lib/constants';
import { capitalizeFirst } from '@/lib/utils';
import { DetailOrder } from '@/models/detailOrder';

export default function DetailOrderModal({
  orderId,
  isOpen,
  setIsOpen,
}: {
  orderId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { getDetail } = useOrderAdmin(orderId);

  console.log(getDetail.data?.data[0]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      onConfirm={() => {
        setIsOpen(false);
      }}
      title='Chi Tiết Đơn Hàng'
    >
      {getDetail.isLoading ? (
        <Spinner />
      ) : (
        <div className='px-5'>
          <div className='flex gap-40'>
            <div className='flex gap-2'>
              <p className='font-medium'>Người đặt hàng:</p>
              {getDetail.data?.data[0].fullname}
            </div>

            <div className='flex gap-2'>
              <p className='font-medium'>SĐT:</p>
              {getDetail.data?.data[0].phonenumber}
            </div>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Số lượng sản phẩm:</p>
            {getDetail.data?.data[0].totalQuantity}
          </div>

          <div className='flex gap-40 my-4'>
            <div className='flex gap-2'>
              <p className='font-medium'>Giá trị giỏ hàng:</p>

              <p className='text-rose-600 font-bold'>
                {getDetail.data?.data[0].totalCart?.toLocaleString(
                  COUNTRY_CODE.VN
                )}
                ₫
              </p>
            </div>

            <div className='flex gap-2'>
              <p className='font-medium'>Phí ship:</p>

              <p className='text-rose-600 font-bold'>
                {getDetail.data?.data[0].shippingFee.toLocaleString(
                  COUNTRY_CODE.VN
                )}
                ₫
              </p>
            </div>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Tổng giá trị đơn hàng:</p>

            <p className='text-rose-600 font-bold'>
              {getDetail.data?.data[0].totalCartOrder.toLocaleString(
                COUNTRY_CODE.VN
              )}
              ₫
            </p>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Địa chỉ đặt hàng:</p>{' '}
            {getDetail.data?.data[0].address}
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Trạng thái đơn hàng:</p>
            {capitalizeFirst(getDetail.data?.data[0].status)}
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Phương thức thanh toán:</p>
            {getDetail.data?.data[0].namePayment}
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Ngày đặt hàng:</p>
            <p>
              {new Date(getDetail.data?.data[0].created_at).toLocaleDateString(
                COUNTRY_CODE.VN
              )}
            </p>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Ngày vận chuyển:</p>
            <p>
              {new Date(
                getDetail.data?.data[0].delivered_at
              ).toLocaleDateString(COUNTRY_CODE.VN)}
            </p>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Ngày hoàn tất đơn hàng:</p>
            <p>
              {new Date(
                getDetail.data?.data[0].completed_at
              ).toLocaleDateString(COUNTRY_CODE.VN)}
            </p>
          </div>

          {getDetail.data?.data[0].orderdetail.map((detail: DetailOrder) => (
            <>
              <div className='h-px bg-black' />
              <div className='my-4 flex gap-2'>
                <p className='font-medium'>Tên mặt hàng:</p>
                <p>{detail.nameProductItem}</p>
              </div>
              <div className='my-4 flex gap-2'>
                <p className='font-medium'>Đơn giá:</p>
                <p className='text-rose-600 font-bold'>
                  {detail.price.toLocaleString(COUNTRY_CODE.VN)}₫
                </p>
              </div>
              <div className='my-4 flex gap-2'>
                <p className='font-medium'>Số lượng:</p>
                <p>{detail.quantity}</p>
              </div>
              <div className='my-4 flex gap-2'>
                <p className='font-medium'>Tổng giá trị mặt hàng:</p>
                <p className='text-rose-600 font-bold'>
                  {detail.totalPriceCartItem.toLocaleString(COUNTRY_CODE.VN)}₫
                </p>
              </div>
            </>
          ))}
        </div>
      )}
    </Modal>
  );
}
