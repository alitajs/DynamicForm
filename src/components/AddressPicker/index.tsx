import React, { FC, useState } from 'react';
import Field from '../Field';
import Title from '../Title';
import AddressPickerGroup from './AddressPickerGroup';
import { IAddressPickerProps, valueProps } from './interface';
import { allPrefixCls } from '../../const/index';
import './index.less';

const AddressPicker: FC<IAddressPickerProps> = (props) => {
  const {
    fieldProps,
    rules = [],
    required = false,
    title,
    hasStar = true,
    positionType = 'horizontal',
    extra,
    onChange,
    defaultValue,
    titleProps,
    formFlag = false
  } = props;

  const isVertical = positionType === 'vertical';

  const fieldChange = (val: valueProps | undefined) => {
    if (onChange) onChange(val);
  };

  return (
    <Title {...titleProps}>
      <Field
        name={fieldProps}
        rules={[{ required, message: `请选择${title}` }, ...rules]}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          return prevValue !== nextValue;
        }}
        initialValue={defaultValue}
        formFlag={formFlag}
      >
        <AddressPickerGroup
          {...props}
          extra={isVertical ? '' : extra}
          onChange={fieldChange}
        >
          <div className={`${allPrefixCls}-title`}>
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
          </div>
        </AddressPickerGroup>
      </Field>
    </Title>
  );
};

AddressPicker.displayName = 'addressPicker';
export default AddressPicker;
