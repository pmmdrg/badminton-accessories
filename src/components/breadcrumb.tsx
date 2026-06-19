'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { BreadcrumbProps } from '@/types/breadcrumbProps';

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className='w-full bg-white py-3'>
      <div className='max-w-7xl mx-auto px-4 flex flex-wrap items-center text-sm text-gray-500'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className='flex items-center'>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className='hover:text-gray-800 transition-colors'
                >
                  {item.label}
                </Link>
              ) : (
                <span className='font-medium text-gray-800'>{item.label}</span>
              )}

              {!isLast && (
                <ChevronRightIcon className='h-4 w-4 mx-2 text-gray-400 flex-shrink-0' />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
