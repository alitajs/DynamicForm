import React, { FC, useState, useEffect } from 'react';
import PickerGroup from './NomarPickerGroup';
import { INomarPickerProps } from './interface';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import Field from '../Field';
import Title from '../Title';

const DformPicker: FC<INomarPickerProps> = (props) => {
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    positionType = 'horizontal',
    hidden = false,
    // subTitle = '',
    // extra,
    fieldProps,
    rules = [],
    required = false,
    title,
    hasStar = true,
    onChange,
    data = [],
    alias = {
      label: 'label',
      value: 'value',
    },
    defaultValue,
    formFlag = true,
    labelNumber = 7,
  } = props;

  const { label = 'label', value = 'value' } = alias;

  const isVertical = positionType === 'vertical';

  useEffect(() => {
    const newData = (data || []).map((item: any) => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [JSON.stringify(data)]);

  const fieldChange = (values: any) => {
    if (onChange) onChange(values);
  };

  const showFiled = () => {
    return (
      <PickerGroup
        value={defaultValue}
        {...props}
        onChange={fieldChange}
        data={aliasData}
      >
        <HorizontalTitle
          required={required}
          hasStar={hasStar}
          title={title}
          labelNumber={labelNumber}
          isVertical={isVertical}
          fieldProps={fieldProps}
        />
      </PickerGroup>
    );
  };
  return (
    <Title independentProps={props} formFlag={formFlag} type="picker">
      <Field
        title={title}
        required={required}
        rules={rules}
        name={fieldProps}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          return prevValue !== nextValue;
        }}
        initialValue={defaultValue}
        formFlag={formFlag}
        params={{
          hidden,
        }}
        type="picker"
      >
        {showFiled()}
      </Field>
    </Title>
  );
};

DformPicker.displayName = 'dformPicker';
export default DformPicker;
