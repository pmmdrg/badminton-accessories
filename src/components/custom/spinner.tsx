import React from 'react';
import clsx from 'clsx';

const colorClasses: Record<string, string> = {
  rose: 'border-rose-500',
  blue: 'border-blue-500',
  green: 'border-green-500',
  gray: 'border-gray-500',
};

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-[3px]',
};

export const Spinner = ({
  size = 'md',
  color = 'rose',
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}) => {
  return (
    <div className='flex items-center justify-center h-full w-auto'>
      <div
        className={clsx(
          'animate-spin rounded-full border-t-transparent',
          sizeClasses[size],
          colorClasses[color]
        )}
      />
    </div>
  );
};
