import React, { FC } from 'react';
import { InputItem } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { Field } from 'rc-field-form';

import styles from '../../styles/index.less';

export interface INomarInputProps extends InputItemPropsType {
  inputType?: InputItemPropsType['type'];
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  positionType?: 'vertical' | 'horizontal';
  titleFontSize?: string;
}

const NomarInput: FC<INomarInputProps> = props => {
  const {
    inputType = 'text',
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    positionType = 'horizontal',
    titleFontSize = '0.34rem',
    ...otherProps
  } = props;

  const onBlur = () => {
    window.scrollTo(0, 0);
  };

  if (positionType === 'vertical') {
    return (
      <div className={styles.nomarInputVerticalStyle}>
        <p style={{ fontSize: titleFontSize }}>
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps} className={styles.title}>
            {title}
          </span>
        </p>
        <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
          <InputItem
            onBlur={() => {
              onBlur();
            }}
            {...otherProps}
            type={inputType}
            style={{ ...coverStyle }}
          />
        </Field>
      </div>
    );
  }

  return (
    <div className={styles.fixNomarInputStyle}>
      <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
        <InputItem {...otherProps} type={inputType} style={{ textAlign: 'right', ...coverStyle }}>
          {required && (
            <span style={{ fontSize: titleFontSize }} className={styles.redStar}>
              *
            </span>
          )}
          <span style={{ fontSize: titleFontSize }} id={fieldProps}>
            {title}
          </span>
        </InputItem>
      </Field>
    </div>
  );
};

export default NomarInput;
