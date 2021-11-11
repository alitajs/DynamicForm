import React, { FC, useState } from 'react';
import classnames from 'classnames';
import Field from '../Field';
import Title from '../Title';
import { allPrefixCls } from '../../const/index';
import DatePickerGroup from './DatePickerGroup';
import { INomarDatePickerProps } from './interface';

import './index.less';

const DformDatePicker: FC<INomarDatePickerProps> = (props) => {
  const {
    fieldProps,
    required = false,
    title,
    rules = [],
    positionType = 'horizontal',
    hasStar = true,
    disabled = false,
    onChange,
    defaultValue,
    titleProps,
    formFlag = false,
  } = props;

  const isVertical = positionType === 'vertical';

  const fileChange = (e: any) => {
    if (onChange) onChange(e);
  };

  return (
    <Title
      title={title}
      positionType={positionType}
      independentProps={props}
      formFlag={formFlag}
      {...titleProps}
    >
      <div
        className={classnames({
          [`alitajs-dform${isVertical ? '-vertical' : ''}-date-picker`]: true,
          'alitajs-dform-disabled': disabled,
        })}
      >
        <Field
          name={fieldProps}
          rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
          initialValue={defaultValue}
          formFlag={formFlag}
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
    </Title>
  );
};

DformDatePicker.displayName = 'dformDatePicker';
export default DformDatePicker;
