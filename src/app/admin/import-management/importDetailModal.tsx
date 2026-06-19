import Modal from '@/components/modal';
import { Spinner } from '@/components/spinner';
import { useImportDetailAdmin } from '@/hooks/admin/useImportDetail';
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
  const { getByImportId } = useImportDetailAdmin('', importId);

  console.log('getByImportId', getByImportId.data?.data);

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
                <div className='flex items-center mb-2 px-2'>
                  <p className='font-medium pr-8'>{index + 1}</p>
                  <p className='font-medium grow'>
                    {impDetail.nameProductItem}
                  </p>
                  <p className='font-medium pl-8'>{impDetail.quantity} cái</p>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </Modal>
  );
}
