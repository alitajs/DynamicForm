import React, { FC } from 'react';
import { Switch, List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import { SwitchPropsType } from 'antd-mobile/es/switch/PropsType';
import { allPrefixCls } from '../../const/index';
import Field from '../Field';
import './index.less';

export interface INomarSwitchProps extends SwitchPropsType {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: string;
  hasStar?: boolean;
  hidden?: boolean;
  className?: string;
}

const NomarSwitch: FC<INomarSwitchProps> = (props) => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    placeholder,
    hasStar = true,
    hidden = false,
    className = '',
    ...otherProps
  } = props;
  return (
    <div className={`${allPrefixCls}-item`}>
      {!hidden && (
        <div className={`${allPrefixCls}-switch`}>
          <div className={`${allPrefixCls}-title`}>
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
          </div>
          <Field
            name={fieldProps}
            valuePropName="checked"
            rules={rules || [{ required, message: `请选择${title}` }]}
          >
            <Switch {...otherProps} />
          </Field>
        </div>
      )}
    </div>
  );
};

export default NomarSwitch;
