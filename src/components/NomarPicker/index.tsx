import React, { FC, useState, useEffect } from 'react';
import PickerGroup from './NomarPickerGroup';
import { INomarPickerProps } from './interface';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';

const DformPicker: FC<INomarPickerProps> = (props) => {
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    positionType = 'horizontal',
    hidden = false,
    subTitle = '',
    extra,
    fieldProps,
    rules = [],
    required = false,
    title,
    hasStar = true,
    onChange,
    data,
    alias = {
      label: 'label',
      value: 'value',
    },
    defaultValue,
    formFlag = false,
    labelNumber = 5,
    isPc,
    titleProps,
  } = props;

  const isVertical = positionType === 'vertical';

  const { label = 'label', value = 'value' } = alias;

  useEffect(() => {
    const newData = data.map((item: any) => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

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
        />
      </PickerGroup>
    );
  };
  return (
    <Title
      positionType={positionType}
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      extra={extra}
      isPc={isPc}
      {...titleProps}
    >
      <Field
        name={fieldProps}
        rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
        initialValue={defaultValue}
        formFlag={formFlag}
      >
        {showFiled()}
      </Field>
    </Title>
  );
};

DformPicker.displayName = 'dformPicker';
export default DformPicker;
