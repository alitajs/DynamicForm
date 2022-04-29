import { Rule } from 'rc-field-form/es/interface';
import { InputItemPropsType } from 'antd-mobile-v2/es/input-item/PropsType';

export interface IExtraInputProps {
  fieldProps: string;
  fieldProps2?: string;
  required?: boolean;
  rules?: Rule[];
  title: string;
  coverStyle?: React.CSSProperties;
  extraType?: 'input' | 'select';
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  firstProps?: InputItemPropsType;
  secondProps?: any;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  disabled?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  labelNumber?: number;
}
