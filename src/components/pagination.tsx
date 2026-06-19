'use client';

import { PaginationProps } from '@/types/paginationProps';
import Button from './button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxVisible = 5;
  const pages: number[] = [];

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className='flex items-center justify-center gap-2 my-8 flex-wrap'>
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={clsx([
          'px-3 py-1.5 text-sm font-medium transition',
          {
            'opacity-40': currentPage === 1,
            ' cursor-not-allowed': currentPage === 1,
            'hover:bg-rose-50': currentPage !== 1,
          },
        ])}
      >
        Trang đầu
      </Button>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 border border-rose-700 rounded-full transition
          ${
            currentPage === 1
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-rose-50'
          }
        `}
      >
        <ChevronLeftIcon className='w-5 h-5 text-white' />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'outline'}
          onClick={() => onPageChange(page)}
          className='w-9 h-9 rounded-full border border-rose-700 text-sm font-medium'
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 border border-rose-700 rounded-full transition
          ${
            currentPage === totalPages
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-rose-50'
          }
        `}
      >
        <ChevronRightIcon className='w-5 h-5 text-white' />
      </Button>

      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1.5 border border-rose-700 rounded-full text-sm font-medium transition
          ${
            currentPage === totalPages
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-rose-50'
          }
        `}
      >
        Trang cuối
      </Button>
    </div>
  );
}
