import React, { FC, useState, useContext, useMemo } from 'react';
import {
  CardContext,
  CardContextProps,
  DformContext,
  DformContextProps,
} from '../../baseComponents/Context';
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
    fieldName,
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
    disabled = false,
    ...otherProps
  } = props;

  const { cDisabled } = useContext<CardContextProps>(CardContext);
  const [mregedDisabled, setMregedDisabled] = useState<boolean>(
    disabled || cDisabled,
  );
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const fieldKey = fieldName || fieldProps;

  useMemo(() => {
    if (cDisabled) return;
    if (changeForm[fieldKey]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldKey]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldKey], disabled, cDisabled]);

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
            fieldProps={fieldKey}
            titleStyle={titleStyle}
          />
          <Field
            type="switch"
            title={title}
            required={required}
            rules={rules}
            name={fieldKey}
            valuePropName="checked"
            initialValue={defaultValue}
            params={{
              hidden,
              formFlag,
            }}
          >
            <Switch
              checked={defaultValue}
              {...otherProps}
              disabled={mregedDisabled}
            />
          </Field>
        </div>
      )}
    </Title>
  );
};

DformSwitch.displayName = 'dformSwitch';
export default DformSwitch;
