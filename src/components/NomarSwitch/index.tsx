import React, { FC } from 'react';
import { Switch } from 'antd-mobile/2x';
import { Rule } from 'rc-field-form/es/interface';
import { SwitchProps } from 'antd-mobile/es/components/switch/index';
import { allPrefixCls } from '../../const/index';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import './index.less';

export interface INomarSwitchProps extends SwitchProps {
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
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
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
            rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
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
