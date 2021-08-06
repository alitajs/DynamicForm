import React, { FC, useState } from 'react';
import { DatePicker, List } from 'antd-mobile';
import classnames from 'classnames';
import { PropsType } from 'antd-mobile/es/date-picker/index';
import Field from '../Field';
import { INomarDatePickerProps } from '../NomarDatePicker/interface';
import { changeDateFormat } from '../../utils';

import './index.less';

export interface IRangeDatePickerProps extends INomarDatePickerProps {
  fieldProps2?: string;
  placeholder2?: string;
  minDate?: Date;
  maxDate?: Date;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  secondProps?: PropsType;
  firstProps?: PropsType;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
}

const RangeDatePicker: FC<IRangeDatePickerProps> = (props) => {
  const [beginDate, setBeginDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const {
    fieldProps,
    fieldProps2,
    placeholder = '开始时间',
    placeholder2 = '结束时间',
    required = false,
    modeType = 'date',
    rules,
    title,
    minDate,
    maxDate,
    positionType = 'vertical',
    hasStar = true,
    secondProps,
    firstProps,
    subTitle,
    hidden = false,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <>
      {!hidden && (
        <React.Fragment>
          {isVertical && (
            <div className="alitajs-dform-vertical-title">
              {required && hasStar && (
                <span className="alitajs-dform-redStar">*</span>
              )}
              <span className="alitajs-dform-title">{title}</span>
              {subTitle}
            </div>
          )}
          <div
            className={classnames({
              'alitajs-dform-range-horizontal': !isVertical,
              'alitajs-dform-range-date-picker': true,
            })}
            style={{
              justifyContent: isVertical ? 'space-between' : 'center',
              width: isVertical ? '' : '100%',
            }}
          >
            <div
              className={`alitajs-dform-begin${
                isVertical ? '-vertical' : ''
              }-picker`}
            >
              <Field
                name={fieldProps}
                rules={rules || [{ required, message: `请选择${title}` }]}
                shouldUpdate={(prevValue: any, nextValue: any) => {
                  setBeginDate(nextValue && nextValue[fieldProps as any]);
                  return prevValue !== nextValue;
                }}
              >
                <DatePicker
                  {...otherProps}
                  {...firstProps}
                  mode={modeType}
                  extra={placeholder}
                  minDate={minDate}
                  maxDate={endDate || maxDate}
                  title={title}
                  format={(value) => changeDateFormat(value, modeType)}
                  onChange={(e) => {
                    setBeginDate(e);
                    firstProps?.onChange && firstProps?.onChange(e);
                  }}
                >
                  <List.Item>
                    {required && hasStar && (
                      <span className="alitajs-dform-redStar">*</span>
                    )}
                    <span className="alitajs-dform-title">{title}</span>
                    <span id={fieldProps2}></span>
                  </List.Item>
                </DatePicker>
              </Field>
            </div>
            <div className="alitajs-dform-line">~</div>
            <div
              className={`alitajs-dform-end${
                isVertical ? '-vertical' : ''
              }-picker`}
            >
              <Field
                name={fieldProps2}
                rules={rules || [{ required, message: `请选择${title}` }]}
                shouldUpdate={(prevValue: any, nextValue: any) => {
                  setEndDate(nextValue && nextValue[fieldProps2 as any]);
                  return prevValue !== nextValue;
                }}
              >
                <DatePicker
                  {...otherProps}
                  {...secondProps}
                  extra={placeholder2}
                  mode={modeType}
                  minDate={beginDate || minDate}
                  maxDate={maxDate}
                  title={title}
                  format={(value) => changeDateFormat(value, modeType)}
                  onChange={(e) => {
                    setEndDate(e);
                    secondProps &&
                      secondProps?.onChange &&
                      secondProps?.onChange(e);
                  }}
                >
                  <List.Item arrow="horizontal"></List.Item>
                </DatePicker>
              </Field>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default RangeDatePicker;
