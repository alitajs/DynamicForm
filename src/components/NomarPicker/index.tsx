import React, { FC } from 'react';
import { Picker, List } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';
import { Field } from 'rc-field-form';

import styles from '../../styles/index.module.less';

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
    ...otherProps
  } = props;

  if (positionType === 'vertical') {
    return (
      <div className={styles.nomarPickerVerticalStyle}>
        <p className={styles.titleFontSize}>
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps} className={styles.titleColor}>
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
          <div className={styles.titleFontSize}>
            {required && <span className={styles.redStar}>*</span>}
            <span id={fieldProps} className={styles.titleColor}>
              {title}
            </span>
          </div>
        </List.Item>
      </Picker>
    </Field>
  );
};

export default NomarPicker;
