import React, { FC } from 'react';
import { Switch, List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import { SwitchPropsType } from 'antd-mobile/es/switch/PropsType';
import Field from '../Field';

import '../../styles/index.less';

export interface INomarSwitchProps extends SwitchPropsType {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: string;
  hasStar?: boolean;
  hidden?: boolean;
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
    hidden = false,
    ...otherProps
  } = props;
  return (
    <React.Fragment>
      {!hidden && (
        <List.Item
          key={fieldProps}
          style={coverStyle}
          extra={
            <Field
              name={fieldProps}
              valuePropName="checked"
              rules={rules || [{ required, message: `请选择${title}` }]}
            >
              <Switch {...otherProps} />
            </Field>
          }
        >
          <div className="alitajs-dform-title-content">
            {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
            <span className="alitajs-dform-title">
              {title}
            </span>
          </div>
        </List.Item>
      )}
    </React.Fragment>
  );
};

export default NomarSwitch;
