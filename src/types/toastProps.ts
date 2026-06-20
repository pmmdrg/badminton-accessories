import { TOAST_TYPE } from '@/lib/constants';

export interface ToastProps {
  id: string;
  message: string;
  type: TOAST_TYPE;
}
