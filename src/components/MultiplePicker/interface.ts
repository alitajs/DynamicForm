import { Rule } from 'rc-field-form/es/interface';
import React from 'react';
import { IAliasProps } from '../../DynamicForm';

export interface IDataItem {
  label: string;
  value: string;
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
