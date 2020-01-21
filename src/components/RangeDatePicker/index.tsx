import React, { FC, useState, useEffect } from 'react';
import { DatePicker, List } from 'antd-mobile';
import { Field } from 'rc-field-form';
import { INomarDatePickerProps } from '../NomarDatePicker';
import { changeDateFormat } from '../../utils';

import styles from '../../styles/index.less';

export interface IRangeDatePickerProps extends INomarDatePickerProps {
  fieldProps2?: string;
  minDate?: Date;
  maxDate?: Date;
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
    ...otherProps
  } = props;

  return (
    <div className={styles.rangeDatePickerStyle}>
      <div className={styles.beginDatePickerStyle}>
        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          {form => {
            setBeginDate(form.value)
            return (
              <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
                <DatePicker
                  {...otherProps}
                  mode={modeType}
                  minDate={minDate}
                  maxDate={endDate || maxDate}
                  title={title}
                  format={value => changeDateFormat(value, modeType)}
                  onChange={e => { setBeginDate(e) }}
                >
                  <List.Item arrow="horizontal">
                    {required && <span className={styles.redStar}>*</span>}
                    <span id={fieldProps}>{title}</span>
                    <span id={fieldProps2}></span>
                  </List.Item>
                </DatePicker>
              </Field>
            );
          }}
        </Field>
      </div>
      <div className={styles.line}>——</div>
      <div className={styles.endDatePickerStyle}>
        <Field name={fieldProps2} rules={rules || [{ required, message: `请选择${title}` }]}>
          {form => {
            setEndDate(form.value)
            return (
              <Field name={fieldProps2} rules={rules || [{ required, message: `请选择${title}` }]}>
                <DatePicker
                  {...otherProps}
                  mode={modeType}
                  minDate={beginDate || minDate}
                  maxDate={maxDate}
                  title={title}
                  format={value => changeDateFormat(value, modeType)}
                  onChange={e => { setEndDate(e) }}
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
