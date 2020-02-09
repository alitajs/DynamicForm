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
  value?: PickerPropsType['value'];
  positionType?: 'vertical' | 'horizontal';
  titleFontSize?: string;
}

const NomarPicker: FC<INomarPickerProps> = props => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    placeholder,
    data = [] as any,
    positionType = 'horizontal',
    titleFontSize = '0.34rem',
    ...otherProps
  } = props;

  if (positionType === 'vertical') {
    return (
      <div className={styles.nomarPickerVerticalStyle}>
        <p style={{ fontSize: titleFontSize }}>
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps} className={styles.title}>
            {title}
          </span>
        </p>
        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          <Picker
            {...otherProps}
            style={coverStyle}
            cascade={false}
            extra={placeholder}
            data={data}
            title={title}
          >
            <List.Item arrow="horizontal"></List.Item>
          </Picker>
        </Field>
      </div>
    );
  }

  return (
    <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
      <Picker
        {...otherProps}
        style={coverStyle}
        cascade={false}
        extra={placeholder}
        data={data}
        title={title}
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
      </Picker>
    </Field>
  );
};

export default NomarPicker;
