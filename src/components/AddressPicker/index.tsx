import React, { FC, useState } from 'react';
import classnames from 'classnames';
import Field from '../Field';
import AddressPickerGroup from './AddressPickerGroup';
import { IAddressPickerProps, valueProps } from './interface';
import { allPrefixCls } from '../../const/index';
import Title from '../Title';
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
    subTitle,
    hidden = false,
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
    <Title
      positionType={positionType}
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      extra={extra}
    >
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
    </Title>
  );
};

export default AddressPicker;
