import React, { FC } from 'react';
import { TextareaItem, List } from 'antd-mobile';
import { TextAreaItemPropsType } from 'antd-mobile/es/textarea-item/PropsType';
import { Field } from 'rc-field-form';

import styles from '../../styles/index.less';

export interface INomarTextAreaProps extends TextAreaItemPropsType {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  placeholder?: string;
}

const NomarTextArea: FC<INomarTextAreaProps> = props => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    rows = 3,
    ...otherProps
  } = props;
  return (
    <List.Item
      style={{
        position: 'relative',
      }}
    >
      {required && (
        <span
          className={styles.redStar}
          style={{
            position: 'absolute',
            top: '0',
            zIndex: 2,
          }}
        >
          *
        </span>
      )}
      <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
        <TextareaItem {...otherProps} style={coverStyle} rows={rows} />
      </Field>
    </List.Item>
  );
};

export default NomarTextArea;
