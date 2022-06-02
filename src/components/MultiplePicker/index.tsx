import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import MultiplePickerGroup from './multiplePickerGroup';
import { IMultiplePickerProps } from './interface';
import Field from '../Field';
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
    hidden = false,
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
      type="multiplePicker"
      independentProps={props}
      style={boxStyle}
      titleStyle={titleStyle}
    >
      <Field
        title={title}
        required={required}
        rules={rules}
        name={fieldProps}
        initialValue={defaultValue}
        params={{
          hidden,
          formFlag,
        }}
        type="multiplePicker"
      >
        <MultiplePickerGroup
          {...props}
          disabled={mregedDisabled}
          data={aliasData}
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
        </MultiplePickerGroup>
      </Field>
    </Title>
  );
};

MultiplePicker.displayName = 'multiplePicker';
export default MultiplePicker;
