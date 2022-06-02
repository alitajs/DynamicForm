import React, { CSSProperties } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import { PropsType } from 'antd-mobile-v2/es/date-picker/index';
import { ErrorValueProps, BaseComponentProps } from '../../PropsType';

export interface DateProps extends PropsType {
  defaultValue?: Date;
}

export type DatePickerType = PropsType & BaseComponentProps;

export interface INomarDatePickerProps extends DatePickerType {
  modeType?: PropsType['mode'];
  fieldProps2?: string;
  secondProps?: DateProps;
  placeholder?: string;
  labelNumber?: number;
  coverStyle?: CSSProperties;
  errorValue?: ErrorValueProps;
  defaultValue?: Date | undefined | string;
}

export interface INomarDatePickerGroupProps extends INomarDatePickerProps {
  onChange: (e: any) => void;
  value?: Date | undefined;
  arrow?: boolean;
}
