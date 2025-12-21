import { useEffect, useState } from 'react';

type ProgressProps = {
  value: number;
};

export function UploadProgress({ value }: ProgressProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (value > 0 && value < 100) {
      setVisible(true);
    }

    if (value === 100) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      <div className='h-1 bg-gray-200'>
        <div
          className='h-full bg-rose-700 transition-[width] duration-300'
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
