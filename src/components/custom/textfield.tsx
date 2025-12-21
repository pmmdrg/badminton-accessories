'use client';

import { TextFieldProps } from '@/types/textfieldProps';
import clsx from 'clsx';

export default function TextField({
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  errorColor,
  startIcon,
  endIcon,
  size = 'md',
  borderColor = 'border-gray-300',
  iconColor = 'text-gray-600',
  type = 'text',
  accept,
  fullWidth,
  multiple,
  className,
}: TextFieldProps) {
  const sizeClasses = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-5',
  };

  return (
    <div className='flex flex-col items-start w-auto m-2'>
      {label && (
        <label className='mb-1 text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div
        className={clsx(
          'flex items-center rounded-lg border transition-colors duration-200',
          'hover:border-rose-400',
          'focus-within:border-rose-700',
          'bg-white',
          borderColor,
          error && 'border-red-500',
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          className
        )}
      >
        {startIcon && (
          <span
            className={clsx(
              'mr-2 flex items-center',
              iconColor,
              'hover:text-rose-200 focus-within:text-rose-700 transition-colors'
            )}
          >
            {startIcon}
          </span>
        )}
        <input
          name={name}
          type={type}
          className='flex-1 outline-none bg-transparent placeholder-gray-400'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          accept={type === 'file' ? accept : undefined}
          multiple={type === 'file' && multiple}
        />
        {endIcon && (
          <span
            className={clsx(
              'ml-2 flex items-center',
              iconColor,
              'hover:text-rose-200 focus-within:text-rose-700 transition-colors'
            )}
          >
            {endIcon}
          </span>
        )}
      </div>
      {error && (
        <p
          className={clsx(
            'mt-1',
            'text-sm',
            errorColor ?? 'text-red-600',
            'self-start'
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}
