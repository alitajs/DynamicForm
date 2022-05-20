import { InputItemPropsType } from 'antd-mobile-v2/es/input-item/PropsType';
import { BaseComponentProps } from '../../PropsType';

export interface IExtraInputProps extends BaseComponentProps {
  fieldProps2: string;
  coverStyle?: React.CSSProperties;
  extraType?: 'input' | 'select';
  firstProps?: InputItemPropsType;
  secondProps?: any;
  labelNumber?: number;
}
