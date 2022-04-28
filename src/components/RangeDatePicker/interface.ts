import { PropsType } from 'antd-mobile-v2/es/date-picker/index';
import { INomarDatePickerProps } from '../NomarDatePicker/interface';

export interface DateProps extends PropsType {
  defaultValue?: Date;
}

export interface IRangeDatePickerProps extends INomarDatePickerProps {
  fieldProps2: string;
  placeholder2?: string;
  minDate?: Date;
  maxDate?: Date;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  secondProps?: DateProps;
  firstProps?: DateProps;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  formFlag?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
}
