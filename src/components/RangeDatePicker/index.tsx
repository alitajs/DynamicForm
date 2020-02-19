import React, { FC, useState } from 'react';
import { DatePicker, List } from 'antd-mobile';
import Field from '../Field';
import { INomarDatePickerProps } from '../NomarDatePicker';
import { changeDateFormat } from '../../utils';

import '../../styles/index.less';

export interface IRangeDatePickerProps extends INomarDatePickerProps {
  fieldProps2?: string;
  minDate?: Date;
  maxDate?: Date;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
}

const RangeDatePicker: FC<IRangeDatePickerProps> = props => {
  const [beginDate, setBeginDate] = useState();
  const [endDate, setEndDate] = useState();
  const {
    fieldProps,
    fieldProps2,
    required = false,
    modeType = 'date',
    rules = [],
    title,
    minDate,
    maxDate,
    positionType = 'horizontal',
    hasStar = true,
    ...otherProps
  } = props;

  if (positionType === 'vertical') {
    return (
      <div className="alitajs-dform-rangeDatePickerVerticalStyle">
        <p className="alitajs-dform-titleFontSize">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-titleColor">
            {title}
          </span>
        </p>
        <div className="alitajs-dform-rangeDatePickerVerticalContent">
          <div className="alitajs-dform-beginVerticalDatePickerStyle">
            <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
              {form => {
                setBeginDate(form.value);
                return (
                  <Field
                    name={fieldProps}
                    rules={rules || [{ required, message: `请选择${title}` }]}
                  >
                    <DatePicker
                      {...otherProps}
                      mode={modeType}
                      minDate={minDate}
                      maxDate={endDate || maxDate}
                      title={title}
                      format={value => changeDateFormat(value, modeType)}
                      onChange={e => {
                        setBeginDate(e);
                      }}
                    >
                      <List.Item arrow="horizontal">
                        <div className="alitajs-dform-titleFontSize">
                          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
                          <span id={fieldProps} className="alitajs-dform-titleColor">
                            {title}
                          </span>
                          <span id={fieldProps2}></span>
                        </div>
                      </List.Item>
                    </DatePicker>
                  </Field>
                );
              }}
            </Field>
          </div>
          <div className="alitajs-dform-line">——</div>
          <div className="alitajs-dform-endVerticalDatePickerStyle">
            <Field name={fieldProps2} rules={rules || [{ required, message: `请选择${title}` }]}>
              {form => {
                setEndDate(form.value);
                return (
                  <Field
                    name={fieldProps2}
                    rules={rules || [{ required, message: `请选择${title}` }]}
                  >
                    <DatePicker
                      {...otherProps}
                      mode={modeType}
                      minDate={beginDate || minDate}
                      maxDate={maxDate}
                      title={title}
                      format={value => changeDateFormat(value, modeType)}
                      onChange={e => {
                        setEndDate(e);
                      }}
                    >
                      <List.Item arrow="horizontal"></List.Item>
                    </DatePicker>
                  </Field>
                );
              }}
            </Field>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="alitajs-dform-rangeDatePickerStyle">
      <div className="alitajs-dform-beginDatePickerStyle">
        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          {form => {
            setBeginDate(form.value);
            return (
              <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
                <DatePicker
                  {...otherProps}
                  mode={modeType}
                  minDate={minDate}
                  maxDate={endDate || maxDate}
                  title={title}
                  format={value => changeDateFormat(value, modeType)}
                  onChange={e => {
                    setBeginDate(e);
                  }}
                >
                  <List.Item arrow="horizontal">
                    <div className="alitajs-dform-titleFontSize">
                      {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
                      <span id={fieldProps} className="alitajs-dform-titleColor">
                        {title}
                      </span>
                      <span id={fieldProps2}></span>
                    </div>
                  </List.Item>
                </DatePicker>
              </Field>
            );
          }}
        </Field>
      </div>
      <div className="alitajs-dform-line">——</div>
      <div className="alitajs-dform-endDatePickerStyle">
        <Field name={fieldProps2} rules={rules || [{ required, message: `请选择${title}` }]}>
          {form => {
            setEndDate(form.value);
            return (
              <Field name={fieldProps2} rules={rules || [{ required, message: `请选择${title}` }]}>
                <DatePicker
                  {...otherProps}
                  mode={modeType}
                  minDate={beginDate || minDate}
                  maxDate={maxDate}
                  title={title}
                  format={value => changeDateFormat(value, modeType)}
                  onChange={e => {
                    setEndDate(e);
                  }}
                >
                  <List.Item arrow="horizontal"></List.Item>
                </DatePicker>
              </Field>
            );
          }}
        </Field>
      </div>
    </div>
  );
};

export default RangeDatePicker;
