import { SwitchPropsType } from 'antd-mobile-v2/es/switch/PropsType';
import { BaseComponentProps } from '../../PropsType';

type SwitchType = SwitchPropsType & BaseComponentProps;
export interface INomarSwitchProps extends SwitchType {
  coverStyle?: React.CSSProperties;
  placeholder?: string;
  defaultValue?: boolean;
  labelNumber?: number;
}
