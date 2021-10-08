import { Rule } from 'rc-field-form/es/interface';
import { IAliasProps } from '../../PropsType';

export interface IDataItem {
  [key: string]: string | number;
}

export interface INomarPickerProps {
  data: IDataItem[];
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: string | number) => void;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  hidden?: boolean;
  placeholder?: string;
  initValue?: string | number;
  disabled?: boolean;
  labelNumber?: number;
  onClick?: (val: string | number | undefined) => void;
  alias?: IAliasProps;
  extra?: string | React.ReactNode;
  className?: string;
  defaultValue?: string;
  titleProps?: any;
  clear?: boolean;
}
