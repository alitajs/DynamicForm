import { Rule } from 'rc-field-form/es/interface';
import { IAliasProps } from '../../DynamicForm';

export interface IDataItem {
  label: string;
  value: string;
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
}
