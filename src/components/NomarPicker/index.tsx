import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import {
  CardContext,
  CardContextProps,
  DformContext,
  DformContextProps,
} from '../../baseComponents/Context';
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
    fieldName,
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
  const { cDisabled } = useContext<CardContextProps>(CardContext);
  const [mregedDisabled, setMregedDisabled] = useState<boolean>(
    disabled || cDisabled,
  );
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const fieldKey = fieldName || fieldProps;

  const { label = 'label', value = 'value' } = alias;

  const isVertical = positionType === 'vertical';

  useMemo(() => {
    if (cDisabled) return;
    if (changeForm[fieldKey]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldKey]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldKey], disabled, cDisabled]);

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
        fieldProps={fieldKey}
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
        name={fieldKey}
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
