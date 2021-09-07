export interface ITextItemProps {
  isVertical?: boolean;
  value?: string;
  placeholder?: string;
  onClick?: (val: string) => void;
  labelNumber?: number;
  coverStyle?: React.CSSProperties;
  extra?: string | React.ReactNode;
  disabled?: boolean;
  maxLine?: number;
  fieldProps?: string;
  className?: string;
  arrow?: boolean;
  ellipsis?: boolean;
}
