import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import PickerGroup from './NomarPickerGroup';
import { INomarPickerProps } from './interface';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import Field from '../Field';
import Title from '../../baseComponents/Title';

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
    labelNumber = 7,
    boxStyle,
    titleStyle,
    formFlag = true,
    disabled = false,
  } = props;
  const [mregedDisabled, setMregedDisabled] = useState<boolean>(disabled);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const { label = 'label', value = 'value' } = alias;

  const isVertical = positionType === 'vertical';

  useMemo(() => {
    if (changeForm[fieldProps]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldProps]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldProps], disabled]);

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
        disabled={mregedDisabled}
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
          titleStyle={titleStyle}
        />
      </PickerGroup>
    );
  };
  return (
    <Title
      independentProps={props}
      type="picker"
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
        type="picker"
      >
        {showFiled()}
      </Field>
    </Title>
  );
};

DformPicker.displayName = 'dformPicker';
export default DformPicker;
