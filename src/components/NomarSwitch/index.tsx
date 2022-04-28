import React, { FC } from 'react';
import { Switch } from 'antd-mobile-v2';
import { allPrefixCls } from '../../const';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
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
    formFlag = true,
    labelNumber = 7,
    ...otherProps
  } = props;
  return (
    <Title independentProps={props} formFlag={formFlag} type="switch">
      {!hidden && (
        <div className={`${allPrefixCls}-switch`}>
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
            isVertical={false}
            fieldProps={fieldProps}
          />
          <Field
            type="switch"
            title={title}
            required={required}
            rules={rules}
            name={fieldProps}
            valuePropName="checked"
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
