import { InputItemPropsType } from 'antd-mobile-v2/es/input-item/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import { ClickEvent } from '../../PropsType';

export interface INomarInputProps extends InputItemPropsType {
  inputType?: InputItemPropsType['type'];
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  onClick?: (e: ClickEvent) => void;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  className?: string;
  titleProps?: any;
  maxLine?: number;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  boxStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
}
