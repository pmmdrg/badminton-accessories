import Modal from '@/components/custom/modal';
import { Spinner } from '@/components/custom/spinner';
import { useImportDetailManager } from '@/hooks/manager/useImportDetail';
import { ImportDetail } from '@/models/importDetail';

interface ImportDetailModalProps {
  importId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ImportModal({
  importId,
  isOpen,
  setIsOpen,
}: ImportDetailModalProps) {
  const { getByImportId } = useImportDetailManager('', importId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      onConfirm={() => {
        setIsOpen(false);
      }}
      title='Chi Tiết Nhập Hàng'
    >
      {getByImportId.isLoading ? (
        <Spinner />
      ) : (
        <div className='px-5'>
          {getByImportId.data?.data?.map(
            (impDetail: ImportDetail, index: number) => (
              <div key={impDetail.id} className='my-4'>
                {index !== 0 && <hr className='my-2 border-gray-300' />}
                <div className='flex gap-10 items-center mb-2 px-2'>
                  <p>{index + 1}</p>

                  <div className='flex gap-2'>
                    <p className='font-medium'>Tên sản phẩm:</p>
                    {impDetail.nameProductItem}
                  </div>

                  <div className='flex gap-2'>
                    <p className='font-medium'>Số lượng:</p>
                    {impDetail.quantity}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </Modal>
  );
}
