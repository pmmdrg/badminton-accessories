import { ToastProps } from '@/types/toastProps';
import { createContext, useCallback, useContext, useState } from 'react';

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => string;
  updateToast: (id: string, payload: Partial<Omit<ToastProps, 'id'>>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);

  if (!ctx) throw new Error('useToast must be used inside ToastProvider');

  return ctx;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = Date.now().toString();

    setToasts((prevToasts) => [
      ...prevToasts,
      {
        ...toast,
        id,
      },
    ]);

    return id;
  }, []);

  const updateToast = useCallback(
    (id: string, payload: Partial<Omit<ToastProps, 'id'>>) => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, ...payload } : toast,
        ),
      );
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, updateToast, removeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}
