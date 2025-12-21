import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { TOAST_TYPE } from '@/lib/constants';
import Button from './button';
import { ToastProps } from '@/types/toastProps';

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);

  if (!ctx) throw new Error('useToast must be used inside ToastProvider');

  return ctx;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(
    (toast: Omit<ToastProps, 'id'>) => {
      const id = Date.now();

      setToasts([
        ...toasts,
        {
          ...toast,
          id,
        },
      ]);

      return id;
    },
    [toasts]
  );

  const removeToast = useCallback(
    (id: number) => {
      setToasts(toasts.filter((toast) => toast.id !== id));
    },
    [toasts]
  );

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => removeToast(toast.id), 5000);

      return () => clearTimeout(timer);
    });
  }, [toasts, removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default function ToastList() {
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 5000)
    );

    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className='fixed bottom-5 left-5 flex flex-col gap-3 z-50'>
      <AnimatePresence>
        {toasts.map((toast) => {
          const icon =
            toast.type === TOAST_TYPE.INFO ? (
              <InformationCircleIcon className='w-5 h-5 text-blue-700' />
            ) : toast.type === TOAST_TYPE.ERROR ? (
              <XCircleIcon className='w-5 h-5 text-red-700' />
            ) : (
              <CheckCircleIcon className='w-5 h-5 text-emerald-700' />
            );

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className='bg-white shadow-xl p-3 rounded-2xl flex items-center gap-3 min-w-[240px]'
            >
              {icon}
              <span className='flex-1 text-sm'>{toast.message}</span>
              <Button variant='ghost' onClick={() => removeToast(toast.id)}>
                <XMarkIcon className='w-4 h-4' />
              </Button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
