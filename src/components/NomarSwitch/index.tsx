import React, { FC } from 'react';
import { Switch, List } from 'antd-mobile';
import { SwitchPropsType } from 'antd-mobile/es/switch/PropsType';
import { Field } from 'rc-field-form';

import styles from '../../styles/index.less';

export interface INomarSwitchProps extends SwitchPropsType {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  placeholder?: string;
  titleFontSize?: string;
}

const NomarSwitch: FC<INomarSwitchProps> = props => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    placeholder,
    titleFontSize = '0.34rem',
    ...otherProps
  } = props;
  return (
    <List.Item
      key={fieldProps}
      style={coverStyle}
      extra={
        <Field
          name={fieldProps}
          valuePropName="checked"
          rules={rules || [{ required, message: `请输入${title}` }]}
        >
          <Switch {...otherProps} />
        </Field>
      }
    >
      {required && (
        <span style={{ fontSize: titleFontSize }} className={styles.redStar}>
          *
        </span>
      )}
      <span style={{ fontSize: titleFontSize }} id={fieldProps}>
        {title}
      </span>
    </List.Item>
  );
};

export default NomarSwitch;
