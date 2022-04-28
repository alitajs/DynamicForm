import { Rule } from 'rc-field-form/es/interface';
import { TextAreaItemPropsType } from 'antd-mobile-v2/es/textarea-item/PropsType';

export interface INomarTextAreaProps extends TextAreaItemPropsType {
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: string;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  extra?: React.ReactNode | string;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  defaultValue?: string;
  errorValue?: any;
  formFlag?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
}
