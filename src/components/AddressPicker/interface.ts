import { Rule } from 'rc-field-form/es/interface';
import React from 'react';
import { IAliasProps } from '../../PropsType';

export interface IModalData {
  [key: string]: string | number;
}

export interface IAddressPickerProps {
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: any) => void;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  placeholder?: string;
  extra?: string | React.ReactNode;
  disabled?: boolean;
  // level: number;
  data?: IModalData[];
  onChangeLevel: (value: (string | number)[]) => void;
  placeholderList: string[];
  labelNumber?: number;
  coverStyle?: React.CSSProperties;
  onClick?: () => void;
  leftContent?: string | React.ReactNode;
  rightContent?: string | React.ReactNode;
  height?: number | string;
  noData?: string | React.ReactNode;
  loading?: boolean;
  className?: string;
  alias?: IAliasProps;
  defaultValue?: valueProps;
  titleProps?: any;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  boxStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
}

export interface valueProps {
  label: (string | number)[];
  value: (string | number)[];
}
