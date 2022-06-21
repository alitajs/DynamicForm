import { Rule } from 'rc-field-form/es/interface';
import React from 'react';
import { IAliasProps, BaseComponentProps } from '../../PropsType';

export interface IModalData {
  [key: string]: string | number;
}

export interface IAddressPickerProps extends BaseComponentProps {
  onChange?: (currentActiveLink: any) => void;
  placeholder?: string;
  extra?: string | React.ReactNode;
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
  onChangeVerifies?: (value: any) => boolean;
}

export interface valueProps {
  label: (string | number)[];
  value: (string | number)[];
}
