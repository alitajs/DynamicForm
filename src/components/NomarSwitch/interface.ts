import { Rule } from 'rc-field-form/es/interface';
import { SwitchPropsType } from 'antd-mobile-v2/es/switch/PropsType';

export interface INomarSwitchProps extends SwitchPropsType {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: string;
  hasStar?: boolean;
  hidden?: boolean;
  className?: string;
  defaultValue?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  labelNumber?: number;
  boxStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
}
