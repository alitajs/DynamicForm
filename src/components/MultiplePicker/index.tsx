import React, { FC, useState, useEffect } from 'react';
import MultiplePickerGroup from './multiplePickerGroup';
import { IMultiplePickerProps } from './interface';
import Field from '../Field';
import Title from '../Title';
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
    alias = {
      label: 'label',
      value: 'value',
    },
    defaultValue,
    titleProps,
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
    flag?: string,
  ) => {
    if (flag === 'init') return;
    if (onChange) onChange(values || []);
  };

  return (
    <Title {...titleProps}>
      <Field
        name={fieldProps}
        rules={[{ required, message: `请选择${title}` }, ...rules]}
        initialValue={defaultValue}
      >
        <MultiplePickerGroup {...props} data={aliasData} onChange={fieldChange}>
          <div className={`${allPrefixCls}-title`}>
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
          </div>
        </MultiplePickerGroup>
      </Field>
    </Title>
  );
};

MultiplePicker.displayName = 'multiplePicker';
export default MultiplePicker;
