import React, { FC } from 'react';
import { Switch } from 'antd-mobile-v2';
import { allPrefixCls } from '../../const';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import Field from '../Field';
import Title from '../../baseComponents/Title';
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
    labelNumber = 7,
    boxStyle,
    titleStyle,
    formFlag = true,
    ...otherProps
  } = props;
  return (
    <Title
      independentProps={props}
      type="switch"
      style={boxStyle}
      titleStyle={titleStyle}
    >
      {!hidden && (
        <div className={`${allPrefixCls}-switch`}>
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
            isVertical={false}
            fieldProps={fieldProps}
            titleStyle={titleStyle}
          />
          <Field
            type="switch"
            title={title}
            required={required}
            rules={rules}
            name={fieldProps}
            valuePropName="checked"
            initialValue={defaultValue}
            params={{
              hidden,
              formFlag,
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
