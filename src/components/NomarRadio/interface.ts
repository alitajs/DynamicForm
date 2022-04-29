import { Rule } from 'rc-field-form/es/interface';
import { IAliasProps } from '../../PropsType';

export interface RadioItem {
  [key: string]: string | number;
}

export interface INomarRadioProps {
  fieldProps: string;
  title: string;
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
  data?: RadioItem[] | [];
  positionType?: 'horizontal' | 'vertical';
  coverStyle?: React.CSSProperties;
  hasStar?: boolean;
  radioType?: 'horizontal' | 'vertical';
  subTitle?: string | React.ReactNode;
  onChange?: (currentActiveLink: string | number | undefined) => void;
  hidden?: boolean;
  disabled?: boolean;
  alias?: IAliasProps;
  className?: string;
  allowUnChecked?: boolean;
  labelNumber?: number;
  extra?: string | React.ReactNode;
  defaultValue?: string;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
}
