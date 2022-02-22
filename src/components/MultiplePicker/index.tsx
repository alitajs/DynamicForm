import React, { FC, useState, useEffect } from 'react';
import MultiplePickerGroup from './multiplePickerGroup';
import { IMultiplePickerProps } from './interface';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
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
    titleProps,
    formFlag = false,
    labelNumber = 5,
    isPc,
    ...otherProps
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
    <Title
      title={title}
      positionType={positionType}
      independentProps={props}
      formFlag={formFlag}
      isPc={isPc}
      {...titleProps}
    >
      <Field
        name={fieldProps}
        rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
        initialValue={defaultValue}
        formFlag={formFlag}
      >
        <MultiplePickerGroup
          value={defaultValue}
          {...otherProps}
          data={aliasData}
          onChange={fieldChange}
          fieldProps={fieldProps}
          title={title}
          positionType={positionType}
          labelNumber={labelNumber}
        >
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
            isVertical={isVertical}
          />
        </MultiplePickerGroup>
      </Field>
    </Title>
  );
};

MultiplePicker.displayName = 'multiplePicker';
export default MultiplePicker;
