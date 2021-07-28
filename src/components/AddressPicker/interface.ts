import { Rule } from 'rc-field-form/es/interface';
import { IAliasProps } from '../../DynamicForm';

export interface IModalData {
  label: string;
  value: string | number;
  flag?: boolean;
}

export interface IAddressPickerProps {
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: any) => void;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  placeholder?: string;
  extra?: string | React.ReactNode;
  disabled?: boolean;
  level: number;
  data?: IModalData[];
  onChangeLevel: (value: (string | number)[]) => void;
  placeholderList: string[];
  initValue?: string | undefined;
  labelNumber?: number;
  coverStyle?: React.CSSProperties;
  onClick?: () => void;
  leftContent?: string | React.ReactNode;
  rightContent?: string | React.ReactNode;
  height?: number | string;
  noData?: string | React.ReactNode;
  loading?: boolean;
  className?: string;
  alias?: IAliasProps;
  [key: string]: any;
}

export interface valueProps {
  label: (string | number)[];
  value: (string | number)[];
}
