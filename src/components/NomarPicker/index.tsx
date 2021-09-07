import React, { FC, useState, useEffect } from 'react';
import PickerGroup from './NomarPickerGroup';
import { INomarPickerProps } from './interface';
import { allPrefixCls } from '../../const/index';
import Field from '../Field';

const DformPicker: FC<INomarPickerProps> = (props) => {
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    fieldProps,
    rules,
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
  } = props;

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

  return (
    <Field
      name={fieldProps}
      rules={rules || [{ required, message: `请选择${title}` }]}
      shouldUpdate={(prevValue: any, nextValue: any) => {
        return prevValue !== nextValue;
      }}
      initialValue={defaultValue}
    >
      <PickerGroup {...props} onChange={fieldChange} data={aliasData}>
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

DformPicker.displayName = 'dformPicker';
export default DformPicker;
