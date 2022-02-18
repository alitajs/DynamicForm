import { CSSProperties, ReactNode } from 'react';
import { Rule } from 'rc-field-form/es/interface';

export interface INomarTextAreaProps
  extends Omit<TextareaItemProps, 'onChange'> {
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  hasStar?: boolean;
  extra?: React.ReactNode | string;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  defaultValue?: string;
  errorValue?: any;
  titleProps?: any;
  formFlag?: boolean;
  title?: string | ReactNode;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  onChange?: (res: string) => void;
  isPc?: boolean;
}

export interface TextareaItemProps {
  className?: string;
  coverStyle?: CSSProperties;
  placeholder?: string;
  value?: string;
  onChange: (res: string) => void;
  rows?: number;
  id?: string;
  onFocus?: (e: string) => void;
  onBlur?: (e: string) => void;
  maxLength?: number;
  showCount?: boolean | ((length: number, maxLength?: number) => ReactNode);
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  editable?: boolean;
  positionType?: 'vertical' | 'horizontal';
  labelNumber?: number;
  autoSize?:
    | boolean
    | {
        minRows?: number;
        maxRows?: number;
      };
}
