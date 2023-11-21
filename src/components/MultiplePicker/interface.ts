import { Rule } from 'rc-field-form/es/interface';
import React from 'react';
import { IAliasProps, BaseComponentProps } from '../../PropsType';

export interface IDataItem {
  [key: string]: string | number;
}

export interface ChangeValueLinks {
  value: string | number;
  isHas: Boolean;
}

export interface valueLink {
  value: string | number;
  linkList: Array<ChangeValueLinks>;
}
export interface IMultiplePickerProps extends BaseComponentProps {
  data: IDataItem[];
  onChange?: (currentActiveLink: (string | number)[]) => void;
  coverStyle?: React.CSSProperties;
  placeholder?: string;
  maxValueLength?: number;
  labelNumber?: number;
  onClick?: () => void;
  leftContent?: React.ReactNode | string;
  rightContent?: React.ReactNode | string;
  height?: number | string;
  alias?: IAliasProps;
  extra?: string | React.ReactNode;
  defaultValue?: (string | number)[] | undefined;
  clear?: boolean;
  arrow?: boolean;
  valueLinks?: Array<valueLink>;
}
