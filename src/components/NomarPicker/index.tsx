import React, { FC, useState, useEffect } from 'react';
import PickerGroup from './NomarPickerGroup';
import { INomarPickerProps } from './interface';
import { allPrefixCls } from '../../const/index';
import Field from '../Field';

const NomarPicker: FC<INomarPickerProps> = (props) => {
  const [initValue, setInitValue] = useState(undefined);
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    fieldProps,
    rules,
    required = false,
    title,
    hasStar = true,
    positionType = 'horizontal',
    onChange,
    data,
    alias = {
      label: 'label',
      value: 'value',
    },
  } = props;

  const { label = 'label', value = 'value' } = alias;

  useEffect(() => {
    const newData = data.map((item: any) => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

  const fieldChange = (values: any, flag: string) => {
    if (flag === 'init') return;
    if (onChange && values !== initValue) onChange(values);
  };
  return (
    <Field
      name={fieldProps}
      rules={rules || [{ required, message: `请选择${title}` }]}
      shouldUpdate={(prevValue: any, nextValue: any) => {
        setInitValue(nextValue && nextValue[fieldProps as any]);
        return prevValue !== nextValue;
      }}
    >
      <PickerGroup
        {...props}
        initValue={initValue}
        onChange={fieldChange}
        data={aliasData}
      >
        <div className={`${allPrefixCls}-title`}>
          {required && hasStar && (
            <div className={`${allPrefixCls}-redStar`}>*</div>
          )}
          <div>{title}</div>
        </div>
      </PickerGroup>
    </Field>
  );
};

export default NomarPicker;
