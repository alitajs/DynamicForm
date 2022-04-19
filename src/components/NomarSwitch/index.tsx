import React, { FC } from 'react';
import { Switch } from 'antd-mobile-v2';
import { allPrefixCls } from '../../const/index';
import Field from '../Field';
import Title from '../Title';
import { INomarSwitchProps } from './interface';
import './index.less';

const DformSwitch: FC<INomarSwitchProps> = (props) => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules = [],
    placeholder,
    hasStar = true,
    hidden = false,
    className = '',
    defaultValue = false,
    titleProps,
    formFlag = false,
    ...otherProps
  } = props;
  return (
    <Title independentProps={props} formFlag={formFlag} {...titleProps}>
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
            rules={[...(rules || []), { required, message: `请选择${title}` }]}
            initialValue={defaultValue}
            formFlag={formFlag}
            params={{
              hidden,
            }}
          >
            <Switch checked={defaultValue} {...otherProps} />
          </Field>
        </div>
      )}
    </Title>
  );
};

DformSwitch.displayName = 'dformSwitch';
export default DformSwitch;
