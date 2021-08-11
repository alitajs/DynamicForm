import React, { FC, useState, useEffect } from 'react';
import MultiplePickerGroup from './multiplePickerGroup';
import { IMultiplePickerProps } from './interface';
import Field from '../Field';
import { allPrefixCls } from '../../const/index';
import './index.less';

const MultiplePicker: FC<IMultiplePickerProps> = (props) => {
  const [initValue, setInitValue] = useState<string | undefined>();
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    fieldProps,
    rules,
    required = false,
    title,
    hasStar = true,
    onChange,
    data = [],
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

  const fieldChange = (
    values: (string | number)[] | undefined,
    flag: string,
  ) => {
    if (flag === 'init') return;
    if (onChange) onChange(values || []);
  };

  return (
    <Field
      name={fieldProps}
      rules={rules || [{ required, message: `请选择${title}` }]}
      shouldUpdate={(prevValue: any, nextValue: any) => {
        if (nextValue && nextValue[fieldProps]) {
          setInitValue(JSON.stringify(nextValue[fieldProps]));
        } else {
          setInitValue(undefined);
        }
        return prevValue !== nextValue;
      }}
    >
      <MultiplePickerGroup
        {...props}
        data={aliasData}
        initValue={initValue}
        onChange={fieldChange}
      >
        <div className={`${allPrefixCls}-title`}>
          {required && hasStar && (
            <div className={`${allPrefixCls}-redStar`}>*</div>
          )}
          <div>{title}</div>
        </div>
      </MultiplePickerGroup>
    </Field>
  );
};

export default MultiplePicker;
