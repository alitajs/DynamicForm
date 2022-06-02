import { TextAreaItemPropsType } from 'antd-mobile-v2/es/textarea-item/PropsType';
import { BaseComponentProps } from '../../PropsType';

type TextAreaType = TextAreaItemPropsType & BaseComponentProps;
export interface INomarTextAreaProps extends TextAreaType {
  coverStyle?: React.CSSProperties;
  placeholder?: string;
  extra?: React.ReactNode | string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  defaultValue?: string;
  errorValue?: any;
}
