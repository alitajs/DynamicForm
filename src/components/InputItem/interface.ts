import { InputEventHandler, StringAndUdfEvent, StringEvent } from '@/PropsType';

export interface IInputItemProps {
  isVertical?: boolean;
  value?: string;
  placeholder?: string;
  editable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  labelNumber?: number;
  onChange?: (e: StringEvent) => void;
  coverStyle?: React.CSSProperties;
  disabled?: boolean;
  extra?: string | React.ReactNode;
  className?: string;
  onBlur?: InputEventHandler;
  onFocus?: InputEventHandler;
  clear?: boolean;
  maxLength?: number;
  type?:
    | 'text'
    | 'bankCard'
    | 'phone'
    | 'password'
    | 'number'
    | 'digit'
    | 'money';
}
