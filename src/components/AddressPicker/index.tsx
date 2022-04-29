import React, { FC } from 'react';
import Field from '../Field';
import Title from '../Title';
import AddressPickerGroup from './AddressPickerGroup';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { IAddressPickerProps, valueProps } from './interface';
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
    hidden = false,
    labelNumber = 7,
    boxStyle,
    titleStyle,
  } = props;

  const isVertical = positionType === 'vertical';

  const fieldChange = (val: valueProps | undefined) => {
    if (onChange) onChange(val);
  };

  const showAddressPickerFiled = () => {
    return (
      <AddressPickerGroup
        value={defaultValue}
        {...props}
        extra={isVertical ? '' : extra}
        onChange={fieldChange}
      >
        <HorizontalTitle
          required={required}
          hasStar={hasStar}
          title={title}
          labelNumber={labelNumber}
          isVertical={isVertical}
          fieldProps={fieldProps}
          titleStyle={titleStyle}
        />
      </AddressPickerGroup>
    );
  };

  return (
    <Title
      independentProps={props}
      type="addressPicker"
      style={boxStyle}
      titleStyle={titleStyle}
    >
      <Field
        title={title}
        required={required}
        rules={rules}
        name={fieldProps}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          return prevValue !== nextValue;
        }}
        initialValue={defaultValue}
        params={{
          hidden,
        }}
        type="addressPicker"
      >
        {showAddressPickerFiled()}
      </Field>
    </Title>
  );
};

AddressPicker.displayName = 'addressPicker';
export default AddressPicker;
