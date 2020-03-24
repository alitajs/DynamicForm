import React, { FC } from 'react';
import { Rule } from 'rc-field-form/es/interface';

export interface IAddressPickerGroupProps {
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
  extra?: string | React.ReactNode;
  disabled?: boolean;
}

const AddressPickerGroup: FC<IAddressPickerGroupProps> = props => {
  return <div>1</div>;
};

export default AddressPickerGroup;
