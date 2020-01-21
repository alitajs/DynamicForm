import React, { FC } from 'react';
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
          <DatePicker
            {...otherProps}
            mode={modeType}
            minDate={minDate}
            maxDate={maxDate}
            title={title}
            format={value => changeDateFormat(value, modeType)}
          >
            <List.Item arrow="horizontal">
              {required && <span className={styles.redStar}>*</span>}
              <span id={fieldProps}>{title}</span>
              <span id={fieldProps2}></span>
            </List.Item>
          </DatePicker>
        </Field>
      </div>
      <div className={styles.line}>——</div>
      <div className={styles.endDatePickerStyle}>
        <Field name={fieldProps2} rules={rules || [{ required, message: `请选择${title}` }]}>
          <DatePicker
            {...otherProps}
            mode={modeType}
            minDate={minDate}
            maxDate={maxDate}
            title={title}
            format={value => changeDateFormat(value, modeType)}
          >
            <List.Item arrow="horizontal"></List.Item>
          </DatePicker>
        </Field>
      </div>
    </div>
  );
};

export default RangeDatePicker;
