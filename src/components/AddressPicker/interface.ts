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
  onChange?: (currentActiveLink: (string | number)[]) => void;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  hidden?: boolean;
  placeholder?: string;
  extra?: string | React.ReactNode;
  disabled?: boolean;
}
