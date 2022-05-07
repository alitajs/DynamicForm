import React, { CSSProperties } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import { PropsType } from 'antd-mobile-v2/es/date-picker/index';
import { ErrorValueProps } from '../../PropsType';

export interface DateProps extends PropsType {
  defaultValue?: Date;
}

export interface INomarDatePickerProps extends PropsType {
  modeType?: PropsType['mode'];
  fieldProps: string;
  fieldProps2?: string;
  secondProps?: DateProps;
  required?: boolean;
  title: string;
  rules?: Rule[];
  placeholder?: string;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  labelNumber?: number;
  coverStyle?: CSSProperties;
  errorValue?: ErrorValueProps;
  defaultValue?: Date | undefined | string;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  boxStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  formFlag?: boolean;
}

export interface INomarDatePickerGroupProps extends INomarDatePickerProps {
  onChange: (e: any) => void;
  value?: Date | undefined;
  arrow?: boolean;
}
