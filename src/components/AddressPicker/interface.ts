import { Rule } from 'rc-field-form/es/interface';

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
  initValue?: any;
  labelNumber?: number;
  coverStyle?: React.CSSProperties;
  onClick?: () => void;
  leftContent?: string | React.ReactNode;
  rightContent?: string | React.ReactNode;
  height?: number | string;
}
