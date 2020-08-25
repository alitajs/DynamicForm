export interface IInputItemProps {
  isVertical?: boolean;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  onClick?: () => void;
  labelNumber?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  coverStyle?: React.CSSProperties;
  disabled?: boolean;
}
