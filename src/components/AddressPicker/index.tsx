import React, { FC, useState } from 'react';
import Field from '../Field';
import AddressPickerGroup from './AddressPickerGroup';
import { IAddressPickerProps, valueProps } from './interface';
import { allPrefixCls } from '../../const/index';
import './index.less';

const AddressPicker: FC<IAddressPickerProps> = (props) => {
  const [initValue, setInitValue] = useState<string | undefined>();

  const {
    fieldProps,
    rules,
    required = false,
    title,
    hasStar = true,
    positionType = 'horizontal',
    extra,
    onChange,
  } = props;

  const isVertical = positionType === 'vertical';

  const fieldChange = (
    val: valueProps | undefined,
    flag: 'change' | 'init',
  ) => {
    if (flag === 'change' && onChange) onChange(val);
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
      <AddressPickerGroup
        {...props}
        extra={isVertical ? '' : extra}
        initValue={initValue}
        onChange={fieldChange}
      >
        <div className={`${allPrefixCls}-title`}>
          {required && hasStar && (
            <div className={`${allPrefixCls}-redStar`}>*</div>
          )}
          <div>{title}</div>
        </div>
      </AddressPickerGroup>
    </Field>
  );
};

export default AddressPicker;
