import React, { FC, useState } from 'react';
import classnames from 'classnames';
import Field from '../Field';
import { allPrefixCls } from '../../const/index';
import DatePickerGroup from './DatePickerGroup';
import { INomarDatePickerProps } from './interface';

import './index.less';

const NomarDatePicker: FC<INomarDatePickerProps> = (props) => {
  const [initValue, setInitValue] = useState(undefined);
  const {
    fieldProps,
    required = false,
    title,
    rules,
    positionType = 'horizontal',
    hasStar = true,
    disabled = false,
    onChange,
    defaultValue,
  } = props;

  const isVertical = positionType === 'vertical';

  const fileChange = (e: any) => {
    if (onChange) onChange(e);
  };

  return (
    <div
      className={classnames({
        [`alitajs-dform${isVertical ? '-vertical' : ''}-date-picker`]: true,
        'alitajs-dform-disabled': disabled,
      })}
    >
      <Field
        name={fieldProps}
        rules={rules || [{ required, message: `请选择${title}` }]}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          setInitValue(nextValue && nextValue[fieldProps as any]);
          return prevValue !== nextValue;
        }}
        initialValue={defaultValue}
      >
        <DatePickerGroup {...props} onChange={fileChange}>
          <div className={`${allPrefixCls}-title`}>
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
          </div>
        </DatePickerGroup>
      </Field>
    </div>
  );
};

export default NomarDatePicker;
