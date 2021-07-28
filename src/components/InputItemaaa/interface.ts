import { InputEventHandler, StringAndUdfEvent, StringEvent } from '@/PropsType';

export interface IInputItemProps {
  isVertical?: boolean;
  value?: string;
  placeholder?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  labelNumber?: number;
  onChange?: (e: StringEvent) => void;
  coverStyle?: React.CSSProperties;
  disabled?: boolean;
  editable?: boolean;
  extra?: string | React.ReactNode;
  className?: string;
  onBlur?: InputEventHandler;
  type?:
    | 'text'
    | 'bankCard'
    | 'phone'
    | 'password'
    | 'number'
    | 'digit'
    | 'money';
}
