import React, { CSSProperties } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import { PropsType } from 'antd-mobile/es/date-picker/index';

export interface INomarDatePickerProps extends PropsType {
  modeType?: PropsType['mode'];
  fieldProps: string;
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
}

export interface INomarDatePickerGroupProps extends INomarDatePickerProps {
  onChange: (e: any) => void;
  initValue: Date | undefined;
  arrow?: boolean;
}
