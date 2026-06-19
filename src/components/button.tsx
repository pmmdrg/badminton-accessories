'use client';

import clsx from 'clsx';
import { Spinner } from './spinner';
import { ButtonProps } from '@/types/buttonProps';
import { ButtonVariant } from '@/types/buttonStyles';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  rounded = false,
  shadow = false,
  onClick,
  className,
  ...props
}: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-700 hover:to-rose-800',
    secondary:
      'bg-gradient-to-r from-rose-100 to-rose-200 text-rose-800 hover:from-rose-200 hover:to-rose-300',
    outline: 'border border-rose-700 text-rose-700 hover:bg-rose-50',
    ghost: 'text-rose-700 hover:bg-rose-100',
    danger:
      'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800',
    info: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
    success:
      'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800',
  };

  const classes = clsx(
    baseStyle,
    sizeClasses[size],
    variantClasses[variant],
    {
      'w-full': fullWidth,
      'rounded-full': rounded,
      'rounded-md': !rounded,
      'shadow-md hover:shadow-lg': shadow,
      'opacity-50 cursor-not-allowed': disabled || loading,
    },
    className,
  );

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Spinner size={size} />
      ) : (
        <>
          {startIcon && <span className='mr-2'>{startIcon}</span>}
          {children}
          {endIcon && <span className='ml-2'>{endIcon}</span>}
        </>
      )}
    </button>
  );
}
