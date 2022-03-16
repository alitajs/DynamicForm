import { Rule } from 'rc-field-form/es/interface';
import { PickerData } from 'antd-mobile-v2/lib/picker/PropsType';
import { IAliasProps } from '../../PropsType';
import { PickerPropsType } from 'antd-mobile-v2/es/picker/PropsType';

export interface INomarSelectProps
  extends Omit<PickerPropsType, 'extra' | 'onChange' | 'value'> {
  cols?: number;
  type?: string;
  data: PickerData[] | any;
  positionType?: 'vertical' | 'horizontal';
  title: string;
  fieldProps: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  onClick?: (val: string | number | undefined) => void;
  renderHeader?: string | number;
  className?: string;
  extra?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  onChange?: (event: (string | number)[]) => void;
  labelNumber?: number;
  alias?: IAliasProps;
  defaultValue?: any;
  titleProps?: any;
  maxLine?: number | undefined;
  formFlag?: boolean;
  renderFooter?: string | React.ReactNode;
}
