import { ModalProps } from '@/types/modalProps';
import { useEffect } from 'react';
import Button from './button';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />

      <div className='relative bg-white w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden animate-slide-up'>
        <div className='flex items-center justify-between p-4 border-b border-gray-400'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <Button variant='danger' onClick={onClose}>
            <XMarkIcon className='w-5 h-5' />
          </Button>
        </div>

        <div className='p-4'>{children}</div>

        <div className='flex justify-end gap-3 p-4 border-t border-gray-400'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button variant='success' className='px-4 py-2' onClick={onConfirm}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}
