import React, { FC, useState, useEffect } from 'react';
import MultiplePickerGroup from './multiplePickerGroup';
import { IMultiplePickerProps } from './interface';
import Field from '../Field';
import Title from '../Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { allPrefixCls } from '../../const/index';
import './index.less';

const MultiplePicker: FC<IMultiplePickerProps> = (props) => {
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    fieldProps,
    rules = [],
    required = false,
    title,
    hasStar = true,
    onChange,
    data = [],
    positionType,
    alias = {
      label: 'label',
      value: 'value',
    },
    defaultValue,
    hidden = false,
    labelNumber = 7,
  } = props;
  const { label = 'label', value = 'value' } = alias;

  const isVertical = positionType === 'vertical';

  useEffect(() => {
    const newData = data.map((item: any) => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

  const fieldChange = (
    values: (string | number)[] | undefined,
    flag?: string,
  ) => {
    if (flag === 'init') return;
    if (onChange) onChange(values || []);
  };

  return (
    <Title type="multiplePicker" independentProps={props}>
      <Field
        title={title}
        required={required}
        rules={rules}
        name={fieldProps}
        initialValue={defaultValue}
        params={{
          hidden,
        }}
        type="multiplePicker"
      >
        <MultiplePickerGroup {...props} data={aliasData} onChange={fieldChange}>
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
            isVertical={isVertical}
            fieldProps={fieldProps}
          />
        </MultiplePickerGroup>
      </Field>
    </Title>
  );
};

MultiplePicker.displayName = 'multiplePicker';
export default MultiplePicker;
