import { PropsType } from 'antd-mobile-v2/es/date-picker/index';
import { INomarDatePickerProps } from '../NomarDatePicker/interface';

export interface DateProps extends PropsType {
  defaultValue?: Date | string;
}

export interface IRangeDatePickerProps extends INomarDatePickerProps {
  fieldProps2: string;
  placeholder2?: string;
  minDate?: Date;
  maxDate?: Date;
  positionType?: 'vertical' | 'horizontal';
  secondProps?: DateProps;
  firstProps?: DateProps;
}
