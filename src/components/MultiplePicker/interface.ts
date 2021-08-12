import { Rule } from 'rc-field-form/es/interface';
import React from 'react';
import { IAliasProps } from '../DynamicForm';
import { ErrorValueProps } from '../../PropsType';

export interface IDataItem {
  [key: string]: string | number;
}

export interface IMultiplePickerProps {
  data: IDataItem[];
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: (string | number)[]) => void;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  hidden?: boolean;
  placeholder?: string;
  initValue?: string | undefined;
  disabled?: boolean;
  maxValueLength?: number;
  labelNumber?: number;
  onClick?: () => void;
  leftContent?: React.ReactNode | string;
  rightContent?: React.ReactNode | string;
  height?: number | string;
  alias?: IAliasProps;
  className?: string;
  extra?: string | React.ReactNode;
}
