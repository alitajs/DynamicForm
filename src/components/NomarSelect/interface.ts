import { Rule } from 'rc-field-form/es/interface';
import { PickerData } from 'antd-mobile-v2/lib/picker/PropsType';
import { PickerPropsType } from 'antd-mobile-v2/es/picker/PropsType';
import { IAliasProps, BaseComponentProps } from '../../PropsType';

type SelectType = Omit<PickerPropsType, 'extra' | 'onChange' | 'value'> &
  BaseComponentProps;

export interface INomarSelectProps extends SelectType {
  cols?: number;
  type?: string;
  data: PickerData[] | any;
  placeholder?: string;
  onClick?: (val: string | number | undefined) => void;
  extra?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  onChange?: (event: (string | number)[]) => void;
  labelNumber?: number;
  alias?: IAliasProps;
  defaultValue?: any;
  maxLine?: number | undefined;
  arrow?: boolean;
}
