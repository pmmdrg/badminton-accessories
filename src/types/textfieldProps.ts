import { ReactNode } from 'react';

export interface TextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onChangeForMultiline?: React.ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
  errorColor?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  borderColor?: string;
  iconColor?: string;
  type?: string;
  fullWidth?: boolean;
  accept?: string;
  multiple?: boolean;
  className?: string;
  multiline?: number;
}
