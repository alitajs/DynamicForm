import React, { FC } from 'react';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import { Field } from 'rc-field-form';
import { DatePicker, List } from 'antd-mobile';
import { changeDateFormat } from '../../utils';

import styles from '../../styles/index.less';

export interface INomarDatePickerProps extends DatePickerPropsType {
  modeType?: DatePickerPropsType['mode'];
  fieldProps: string;
  required?: boolean;
  title: string;
  rules?: [];
  placeholder?: string;
}

const NomarDatePicker: FC<INomarDatePickerProps> = props => {
  const { fieldProps, required = false, title, rules, modeType = 'date', ...otherProps } = props;

  return (
    <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
      <DatePicker
        {...otherProps}
        mode={modeType}
        format={value => changeDateFormat(value, modeType)}
      >
        <List.Item arrow="horizontal">
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps}>{title}</span>
        </List.Item>
      </DatePicker>
    </Field>
  );
};

export default NomarDatePicker;
