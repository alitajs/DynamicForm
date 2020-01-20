import React, { FC } from 'react';
import { Field } from 'rc-field-form';
import { List } from 'antd-mobile';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio/interface';

import styles from '../../styles/index.less';

interface radioItem {
  label: string;
  value: string;
}

export interface INomarRadioProps extends RadioGroupProps {
  fieldProps: string;
  title: string;
  rules?: [];
  required?: boolean;
  placeholder?: string;
  data?: radioItem[];
  radioType?: 'horizontal' | 'vertical';
  coverStyle?: React.CSSProperties;
}

const NomarRadio: FC<INomarRadioProps> = props => {
  const {
    coverStyle,
    fieldProps,
    required = false,
    rules,
    title,
    placeholder,
    data,
    radioType = 'horizontal',
    ...otherProps
  } = props;

  const RadioGroup = () => {
    return (
      <Radio.Group className={styles.fixRadioStyle} style={coverStyle} {...otherProps}>
        {data.map(item => (
          <Radio key={item.label} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    );
  };

  if (radioType === 'vertical') {
    return (
      <div className={styles.fixRadioVerticalStyle} key={fieldProps} style={coverStyle}>
        <p>
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps}>{title}</span>
        </p>
        {
          <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
            {RadioGroup()}
          </Field>
        }
      </div>
    );
  }

  return (
    <List.Item
      key={fieldProps}
      style={coverStyle}
      extra={
        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          {RadioGroup()}
        </Field>
      }
    >
      {required && <span className={styles.redStar}>*</span>}
      {title}
    </List.Item>
  );
};

export default NomarRadio;
