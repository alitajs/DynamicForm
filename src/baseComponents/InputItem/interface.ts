import {
  InputEventHandler,
  StringAndUdfEvent,
  StringEvent,
} from '../../PropsType';

export interface IInputItemProps {
  children?: any;
  fieldProps: string;
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
  unit?: string;
  min?: string | number;
  max?: string | number;
  type?:
    | 'text'
    | 'bankCard'
    | 'phone'
    | 'password'
    | 'number'
    | 'digit'
    | 'money';
}
