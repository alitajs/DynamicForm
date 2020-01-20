import React, { FC } from 'react';
import { InputItem, Picker, List } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';
import { Field } from 'rc-field-form';
import { NomarInput } from '../';

import styles from '../../styles/index.less';

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
  data?: PickerPropsType['data'];
}

const ExtraInput: FC<IExtraInputProps> = props => {
  const {
    inputType = 'text',
    fieldProps2,
    title,
    required,
    rules,
    coverStyle,
    placeholder2,
    extraType = 'input',
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
        <InputItem
          {...otherProps}
          type={inputType}
          style={{ textAlign: 'right', ...coverStyle }}
          placeholder={placeholder2}
        />
      </Field>
    );
  };

  return (
    <div className={styles.extraInputStyle}>
      <div
        className={styles.beginExtraInputStyle}
        style={{ width: extraType === 'input' ? '65%' : '70%' }}
      >
        <NomarInput {...props} extra="" />
      </div>
      {extraType === 'input' && <div className={styles.line}>——</div>}
      <div className={styles.endExtraInputStyle}>{extraDiv()}</div>
    </div>
  );
};

export default ExtraInput;
