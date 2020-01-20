import React, { FC } from 'react';
import { Picker, List } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';
import { Field } from 'rc-field-form';

import styles from '../../styles/index.less';

export interface INomarPickerProps extends Omit<PickerPropsType, 'data'> {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  placeholder?: PickerPropsType['extra'];
  data?: PickerPropsType['data'];
}

const NomarPicker: FC<INomarPickerProps> = props => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    placeholder,
    ...otherProps
  } = props;
  return (
    <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
      <Picker {...otherProps} style={coverStyle} cascade={false} extra={placeholder}>
        <List.Item arrow="horizontal">
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps}>{title}</span>
        </List.Item>
      </Picker>
    </Field>
  );
};

export default NomarPicker;
