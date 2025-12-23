'use client';

import { SelectStringProps, SelectNumberProps } from '@/types/selectProps';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Button from './button';
import { Spinner } from './spinner';

export function SelectString({
  label,
  value,
  onChange,
  options,
  className = '',
}: SelectStringProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options?.find((opt) => opt.value === value)?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative w-56 ${className}`}>
      <p className='block text-sm text-gray-700 mb-1 font-medium'>{label}</p>

      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 shadow-sm'
      >
        <span>{selectedLabel}</span>

        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className='absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-y-scroll max-h-52'
          >
            {options ? (
              options.map((opt, i) => (
                <div key={opt.value}>
                  <Button
                    variant='ghost'
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'
                  >
                    {opt.label}
                  </Button>

                  {i < options.length - 1 && (
                    <div className='h-px bg-gray-200 mx-2' />
                  )}
                </div>
              ))
            ) : (
              <Spinner />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SelectNumber({
  label,
  value,
  onChange,
  options,
  className = '',
}: SelectNumberProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options?.find((opt) => opt.value === value)?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative w-56 ${className}`}>
      <p className='block text-sm text-gray-700 mb-1 font-medium'>{label}</p>

      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 shadow-sm'
      >
        <span>{selectedLabel}</span>

        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className='absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-y-scroll max-h-52'
          >
            {options ? (
              options.map((opt, i) => (
                <div key={opt.value}>
                  <Button
                    variant='ghost'
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'
                  >
                    {opt.label}
                  </Button>

                  {i < options.length - 1 && (
                    <div className='h-px bg-gray-200 mx-2' />
                  )}
                </div>
              ))
            ) : (
              <Spinner />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
