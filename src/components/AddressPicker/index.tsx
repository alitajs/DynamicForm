import React, { FC, useState } from 'react';
import classnames from 'classnames';
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
    <div className={`${allPrefixCls}${isVertical ? '-vertical' : ''}-item`}>
      {!hidden && (
        <React.Fragment>
          {isVertical && (
            <div
              className={classnames({
                [`${allPrefixCls}-title`]: true,
                [`${allPrefixCls}-vertical-title`]: true,
              })}
            >
              {required && hasStar && (
                <div className={`${allPrefixCls}-redStar`}>*</div>
              )}
              <div>{title}</div>
              {subTitle}
              {extra !== '' && isVertical && (
                <div className={`${allPrefixCls}-extra`}>{extra}</div>
              )}
            </div>
          )}
          <Field
            name={fieldProps}
            rules={rules || [{ required, message: `请选择${title}` }]}
            shouldUpdate={(prevValue: any, nextValue: any) => {
              // if (nextValue && nextValue[fieldProps] && prevValue !== nextValue) {
              //   setInitValue(JSON.stringify(nextValue[fieldProps]));
              // } else {
              //   setInitValue(undefined);
              // }
              setInitValue(nextValue && nextValue[fieldProps as any]);
              return prevValue !== nextValue;
            }}
          >
            <AddressPickerGroup
              {...props}
              extra={isVertical ? '' : extra}
              initValue={initValue}
              onChange={fieldChange}
            />
          </Field>
        </React.Fragment>
      )}
    </div>
  );
};

export default AddressPicker;
