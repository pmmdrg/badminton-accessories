import Modal from '@/components/custom/modal';
import { Spinner } from '@/components/custom/spinner';
import { useOrderManager } from '@/hooks/manager/useOrder';
import { COUNTRY_CODE } from '@/lib/constants';
import { capitalizeFirst } from '@/lib/utils';

export default function DetailOrderModal({
  orderId,
  isOpen,
  setIsOpen,
}: {
  orderId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { getByOrderId } = useOrderManager(orderId);

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
      {getByOrderId.isLoading ? (
        <Spinner />
      ) : (
        <div className='px-5'>
          <div className='flex gap-40'>
            <div className='flex gap-2'>
              <p className='font-medium'>Người đặt hàng:</p>
              {getByOrderId.data?.data.fullname}
            </div>

            <div className='flex gap-2'>
              <p className='font-medium'>SĐT:</p>
              {getByOrderId.data?.data.phonenumber}
            </div>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Số lượng sản phẩm:</p>
            {getByOrderId.data?.data.totalQuantity}
          </div>

          <div className='flex gap-40 my-4'>
            <div className='flex gap-2'>
              <p className='font-medium'>Giá trị giỏ hàng:</p>

              <p className='text-rose-600 font-bold'>
                {getByOrderId.data?.data.totalCart.toLocaleString(
                  COUNTRY_CODE.VN
                )}
                ₫
              </p>
            </div>

            <div className='flex gap-2'>
              <p className='font-medium'>Phí ship:</p>

              <p className='text-rose-600 font-bold'>
                {getByOrderId.data?.data.shippingFee.toLocaleString(
                  COUNTRY_CODE.VN
                )}
                ₫
              </p>
            </div>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Tổng giá trị đơn hàng:</p>

            <p className='text-rose-600 font-bold'>
              {getByOrderId.data?.data.totalCartOrder.toLocaleString(
                COUNTRY_CODE.VN
              )}
              ₫
            </p>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Địa chỉ đặt hàng:</p>{' '}
            {getByOrderId.data?.data.address}
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Trạng thái đơn hàng:</p>
            {capitalizeFirst(getByOrderId.data?.data.status)}
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Phương thức thanh toán:</p>
            {getByOrderId.data?.data.namePayment}
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Ngày đặt hàng:</p>
            <p>
              {new Date(getByOrderId.data?.data.created_at).toLocaleDateString(
                COUNTRY_CODE.VN
              )}
            </p>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Ngày vận chuyển:</p>
            <p>
              {new Date(
                getByOrderId.data?.data.delivered_at
              ).toLocaleDateString(COUNTRY_CODE.VN)}
            </p>
          </div>

          <div className='my-4 flex gap-2'>
            <p className='font-medium'>Ngày hoàn tất đơn hàng:</p>
            <p>
              {new Date(
                getByOrderId.data?.data.completed_at
              ).toLocaleDateString(COUNTRY_CODE.VN)}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
