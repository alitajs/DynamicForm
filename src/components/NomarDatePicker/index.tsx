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
    subTitle,
    hidden = false,
    disabled = false,
    extra,
    onChange,
  } = props;

  const isVertical = positionType === 'vertical';

  const fileChange = (e: any) => {
    if (onChange) onChange(e);
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
          <div
            className={classnames({
              [`alitajs-dform${isVertical ? '-vertical' : ''}-date-picker`]:
                true,
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
            >
              <DatePickerGroup
                {...props}
                onChange={fileChange}
                initValue={initValue}
              >
                <div className={`${allPrefixCls}-title`}>
                  {required && hasStar && (
                    <div className={`${allPrefixCls}-redStar`}>*</div>
                  )}
                  <div>{title}</div>
                </div>
              </DatePickerGroup>
              {/* <DatePicker
                {...otherProps}
                mode={modeType}
                title={title}
                disabled={disabled}
                format={(value) => changeDateFormat(value, modeType)}
              >
                <List.Item arrow="horizontal">
                  {required && hasStar && (
                    <span className="alitajs-dform-redStar">*</span>
                  )}
                  <span className="alitajs-dform-title">{title}</span>
                </List.Item>
              </DatePicker> */}
            </Field>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default NomarDatePicker;
