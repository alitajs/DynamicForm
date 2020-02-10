import React, { FC } from 'react';
import { InputItem, Picker, List } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { Field } from 'rc-field-form';
import { NomarInput } from '../';
import styles from '../../styles/index.module.less';

export interface IExtraInputProps extends InputItemPropsType {
  inputType?: InputItemPropsType['type'];
  fieldProps: string;
  fieldProps2?: string;
  placeholder2?: string;
  required?: boolean;
  rules?: [];
  title: string;
  coverStyle?: React.CSSProperties;
  extraType?: 'input' | 'select';
  positionType?: 'vertical' | 'horizontal';
  data?: any;
}

const ExtraInput: FC<IExtraInputProps> = props => {
  const {
    inputType = 'text',
    fieldProps,
    fieldProps2,
    title,
    required,
    rules,
    coverStyle,
    placeholder2,
    extraType = 'input',
    positionType = 'horizontal',
    data,
    ...otherProps
  } = props;

  const extraDiv = () => {
    if (extraType === 'select') {
      return (
        <Field name={fieldProps2} rules={rules || [{ required, message: `请输入${title}` }]}>
          <Picker style={coverStyle} title={title} data={data} cascade={false} extra={placeholder2}>
            <List.Item arrow="horizontal"></List.Item>
          </Picker>
        </Field>
      );
    }

    return (
      <Field name={fieldProps2} rules={rules || [{ required, message: `请输入${title}` }]}>
        <InputItem {...otherProps} type={inputType} style={{ textAlign: 'right', ...coverStyle }} />
      </Field>
    );
  };

  if (positionType === 'vertical') {
    return (
      <div className={styles.extraInputVerticalStyle}>
        <p>
          {required && <span className={styles.redStar}>*</span>}
          <span id={fieldProps} className={styles.title}>
            {title}
          </span>
        </p>
        <div className={styles.extraInputContentStyle}>
          <div
            className={styles.beginVerticalExtraInputStyle}
            style={{ width: extraType === 'input' ? '44%' : '49%' }}
          >
            <NomarInput
              {...otherProps}
              required={required}
              rules={rules}
              coverStyle={{ textAlign: 'left', ...coverStyle }}
              fieldProps={fieldProps}
              extra=""
            />
          </div>
          {extraType === 'input' && <div className={styles.line}>——</div>}
          <div className={styles.endVerticalExtraInputStyle}>{extraDiv()}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.extraInputStyle}>
      <div
        className={styles.beginExtraInputStyle}
        style={{ width: extraType === 'input' ? '65%' : '70%' }}
      >
        <NomarInput
          {...otherProps}
          title={title}
          required={required}
          rules={rules}
          coverStyle={coverStyle}
          fieldProps={fieldProps}
          extra=""
        />
      </div>
      {extraType === 'input' && <div className={styles.line}>——</div>}
      <div className={styles.endExtraInputStyle}>{extraDiv()}</div>
    </div>
  );
};

export default ExtraInput;
