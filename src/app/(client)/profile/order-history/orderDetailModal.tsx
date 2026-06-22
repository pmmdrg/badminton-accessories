import { placeholderImage } from '@/assets/images';
import Modal from '@/components/modal';
import { Spinner } from '@/components/spinner';
import { useOrderClient } from '@/hooks/client/useOrder';
import { COUNTRY_CODE } from '@/lib/constants';
import { isValidImageSrc } from '@/lib/utils';
import { DetailOrder } from '@/models/detailOrder';
import Image from 'next/image';

export default function DetailOrderModal({
  orderId,
  isOpen,
  setIsOpen,
}: {
  orderId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { getDetail } = useOrderClient(orderId);

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
          {getDetail.data?.data?.map((detail: DetailOrder, index: number) => (
            <div key={detail.id} className='flex gap-8 items-center'>
              <p className='text-lg font-semibold'>{index + 1}</p>
              <Image
                src={
                  isValidImageSrc(detail.imageProductItem)
                    ? detail.imageProductItem
                    : placeholderImage
                }
                alt={detail.nameProductItem}
                width={120}
                height={120}
                className='object-contain'
              />
              <div>
                <div className='my-4 flex gap-2'>
                  <p className='font-medium'>Tên Mặt Hàng:</p>
                  <p>{detail.nameProductItem}</p>
                </div>
                <div className='my-4 flex gap-2'>
                  <p className='font-medium'>Đơn Giá:</p>
                  <p className='text-rose-600 font-bold'>
                    {(detail.pricePromotion
                      ? detail.pricePromotion
                      : detail.price
                    )?.toLocaleString(COUNTRY_CODE.VN)}
                    ₫
                  </p>
                </div>
                <div className='my-4 flex gap-2'>
                  <p className='font-medium'>Số Lượng:</p>
                  <p>{detail.quantity}</p>
                </div>
                <div className='my-4 flex gap-2'>
                  <p className='font-medium'>Tổng Giá Trị Hàng:</p>
                  <p className='text-rose-600 font-bold'>
                    {detail.totalPriceOrderDetail?.toLocaleString(
                      COUNTRY_CODE.VN,
                    )}
                    ₫
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
