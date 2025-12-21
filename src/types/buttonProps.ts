import { ButtonSize, ButtonVariant } from './buttonStyles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  color?: string;
}
