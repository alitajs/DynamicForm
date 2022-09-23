import React, { FC, useState, useContext, useMemo } from 'react';
import Field from '../Field';
import {
  CardContext,
  CardContextProps,
  DformContext,
  DformContextProps,
} from '../../baseComponents/Context';
import Title from '../../baseComponents/Title';
import AddressPickerGroup from './AddressPickerGroup';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { IAddressPickerProps, valueProps } from './interface';
import './index.less';

const AddressPicker: FC<IAddressPickerProps> = (props) => {
  const {
    fieldProps,
    fieldName,
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

  const fieldKey = fieldName || fieldProps;

  const { cDisabled } = useContext<CardContextProps>(CardContext);

  const [mregedDisabled, setMregedDisabled] = useState<boolean>(
    disabled || cDisabled,
  );
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const isVertical = positionType === 'vertical';

  useMemo(() => {
    if (cDisabled) return;
    if (changeForm[fieldKey]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldKey]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldKey], disabled, cDisabled]);

  const fieldChange = (val: valueProps | undefined) => {
    if (onChange) onChange(val);
  };

  const showAddressPickerFiled = () => {
    return (
      <AddressPickerGroup
        value={defaultValue}
        {...props}
        fieldProps={fieldKey}
        disabled={mregedDisabled}
        extra={extra}
        onChange={fieldChange}
      >
        <HorizontalTitle
          required={required}
          hasStar={hasStar}
          title={title}
          labelNumber={labelNumber}
          isVertical={isVertical}
          fieldProps={fieldKey}
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
        name={fieldKey}
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
