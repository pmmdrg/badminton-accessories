export interface SelectStringProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  className?: string;
}

export interface SelectNumberProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  options?: { value: number; label: string }[];
  className?: string;
}
