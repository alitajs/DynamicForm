import { Rule } from 'rc-field-form/es/interface';

export interface IDataItem {
  label: string;
  value: string;
  flag?: boolean;
}

export interface IMultiplePickerProps {
  data: IDataItem[];
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: (string | number)[]) => void;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  hidden?: boolean;
  placeholder?: string;
  initValue?: (string | number)[];
  disabled?: boolean;
  maxValueLength?: number;
  labelNumber?: number;
  onClick?: () => void;
}
