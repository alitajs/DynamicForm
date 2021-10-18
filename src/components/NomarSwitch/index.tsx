import React, { FC } from 'react';
import { Switch } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import { SwitchPropsType } from 'antd-mobile/es/switch/PropsType';
import { allPrefixCls } from '../../const/index';
import Field from '../Field';
import Title from '../Title';
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
  defaultValue?: boolean;
  titleProps?: any;
  formFlag?: boolean;
}

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
    <Title
      independentProps={props}
      formFlag={formFlag}
      {...titleProps}
    >
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
            rules={[{ required, message: `请选择${title}` }, ...rules]}
            initialValue={defaultValue}
            formFlag={formFlag}
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
