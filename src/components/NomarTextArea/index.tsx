import React, { FC } from 'react';
import { TextareaItem, List } from 'antd-mobile';
import { TextAreaItemPropsType } from 'antd-mobile/es/textarea-item/PropsType';
import { Field } from 'rc-field-form';

import styles from '../../styles/index.less';

export interface INomarTextAreaProps extends TextAreaItemPropsType {
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  placeholder?: string;
  positionType?: 'vertical' | 'horizontal';
}

const NomarTextArea: FC<INomarTextAreaProps> = props => {
  const {
    coverStyle,
    required = false,
    fieldProps,
    rules,
    rows = 3,
    title,
    positionType = 'horizontal',
    ...otherProps
  } = props;

  if (positionType === 'vertical') {
    return (
      <div className={styles.textAreaVerticalStyle}>
        <p>
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps} className={styles.titleStyle}>
            {title}
          </span>
        </p>
        <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
          <TextareaItem {...otherProps} style={coverStyle} rows={rows} />
        </Field>
      </div>
    );
  }

  return (
    <List.Item
      style={{
        position: 'relative',
      }}
      className={styles.textAreaStyle}
    >
      {required && (
        <span
          className={styles.redStar}
          style={{
            position: 'absolute',
            top: '14px',
            zIndex: 2,
          }}
        >
          *
        </span>
      )}
      <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
        <TextareaItem {...otherProps} title={title} style={coverStyle} rows={rows} />
      </Field>
    </List.Item>
  );
};

export default NomarTextArea;
