import { TOAST_TYPE } from '@/lib/constants';

export interface ToastProps {
  id: number;
  message: string;
  type: TOAST_TYPE;
}
