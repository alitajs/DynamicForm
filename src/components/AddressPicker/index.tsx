import React, { FC, useState, useContext, useMemo } from 'react';
import Field from '../Field';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import Title from '../../baseComponents/Title';
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
    formFlag = true,
    titleStyle,
    disabled = false,
  } = props;

  const [mregedDisabled, setMregedDisabled] = useState<boolean>(disabled);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const isVertical = positionType === 'vertical';

  useMemo(() => {
    if (changeForm[fieldProps]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldProps]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldProps], disabled]);

  const fieldChange = (val: valueProps | undefined) => {
    if (onChange) onChange(val);
  };

  const showAddressPickerFiled = () => {
    return (
      <AddressPickerGroup
        value={defaultValue}
        {...props}
        disabled={mregedDisabled}
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
          formFlag,
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
