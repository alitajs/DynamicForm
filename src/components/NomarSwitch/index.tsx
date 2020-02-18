import React, { FC } from 'react';
import { Switch, List } from 'antd-mobile';
import { SwitchPropsType } from 'antd-mobile/es/switch/PropsType';
import Field from '../Field';

import '../../styles/index.less';

export interface INomarSwitchProps extends SwitchPropsType {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  placeholder?: string;
  hasStar?: boolean;
}

const NomarSwitch: FC<INomarSwitchProps> = props => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    placeholder,
    hasStar = true,
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
      <div className='alitajs-dform-titleFontSize'>
        {required && hasStar && <span className='alitajs-dform-redStar'>*</span>}
        <span id={fieldProps} className='alitajs-dform-titleColor'>
          {title}
        </span>
      </div>
    </List.Item>
  );
};

export default NomarSwitch;
