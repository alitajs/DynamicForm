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
  positionType?: 'vertical' | 'horizontal';
  titleFontSize?: string;
}

const NomarDatePicker: FC<INomarDatePickerProps> = props => {
  const {
    fieldProps,
    required = false,
    title,
    rules,
    modeType = 'date',
    positionType = 'horizontal',
    titleFontSize = '0.34rem',
    ...otherProps
  } = props;

  if (positionType === 'vertical') {
    return (
      <div className={styles.nomarDatePickerVerticalStyle}>
        <p style={{ fontSize: titleFontSize }}>
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps} className={styles.title}>
            {title}
          </span>
        </p>
        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          <DatePicker
            {...otherProps}
            mode={modeType}
            title={title}
            format={value => changeDateFormat(value, modeType)}
          >
            <List.Item arrow="horizontal" />
          </DatePicker>
        </Field>
      </div>
    );
  }

  return (
    <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
      <DatePicker
        {...otherProps}
        mode={modeType}
        title={title}
        format={value => changeDateFormat(value, modeType)}
      >
        <List.Item arrow="horizontal">
          {required && (
            <span style={{ fontSize: titleFontSize }} className={styles.redStar}>
              *
            </span>
          )}
          <span style={{ fontSize: titleFontSize }} id={fieldProps}>
            {title}
          </span>
        </List.Item>
      </DatePicker>
    </Field>
  );
};

export default NomarDatePicker;
