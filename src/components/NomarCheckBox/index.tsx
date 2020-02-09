import React, { FC } from 'react';
import { Field } from 'rc-field-form';
import { Checkbox, List } from 'antd';
import styles from '../../styles/index.less';
import { CheckboxGroupProps } from 'antd/lib/checkbox/index';

interface INomarCheckBoxProps extends CheckboxGroupProps {
  title: string;
  rules?: [];
  required?: boolean;
  data?: any;
  fieldProps: string;
  titleFontSize?: string;
}

const NomarCheckBox: FC<INomarCheckBoxProps> = props => {
  const {
    fieldProps,
    title,
    rules,
    required = false,
    data = [],
    titleFontSize = '0.34rem',
    ...otherProps
  } = props;

  return (
    <div className={styles.nomarCheckBoxStyle}>
      <p style={{ fontSize: titleFontSize }}>
        {required && <span className={styles.redStar}>*</span>}
        <span id={fieldProps}>{title}</span>
      </p>
      <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
        <Checkbox.Group style={{ width: '100%' }} {...otherProps}>
          <div className={styles.itemStyle}>
            {[...data].map(item => {
              return (
                <List.Item key={item.value}>
                  <Checkbox value={item.value}>{item.label}</Checkbox>
                </List.Item>
              );
            })}
          </div>
        </Checkbox.Group>
      </Field>
    </div>
  );
};

export default NomarCheckBox;
