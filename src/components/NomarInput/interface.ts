import React from 'react';
import { InputItemPropsType } from 'antd-mobile-v2/es/input-item/PropsType';
import { ClickEvent, BaseComponentProps } from '../../PropsType';

export type InputType =
  | React.InputHTMLAttributes<HTMLInputElement> &
      InputItemPropsType &
      BaseComponentProps;

export interface INomarInputProps extends InputType {
  inputType?: InputItemPropsType['type'];
  coverStyle?: React.CSSProperties;
  onClick?: (e: ClickEvent) => void;
  maxLine?: number;
}
