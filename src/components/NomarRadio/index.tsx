import React, { FC, useState, useEffect } from 'react';
import Field from '../Field';
import Title from '../Title';
import NomarRadioGroup from './radioGroup';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { INomarRadioProps } from './interface';
import './index.less';

const prefixCls = 'alitajs-dform-radio';

const DformRadio: FC<INomarRadioProps> = (props) => {
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    coverStyle,
    fieldProps,
    required = false,
    allowUnChecked = true,
    rules = [],
    title,
    data = [],
    positionType = 'horizontal',
    hasStar = true,
    radioType = 'horizontal',
    onChange,
    disabled = false,
    alias = {
      label: 'label',
      value: 'value',
    },
    hidden = false,
    className = '',
    labelNumber = 7,
    defaultValue,
    subTitle = '',
    extra,
    formFlag = true,
  } = props;

  let isVertical = positionType === 'vertical';
  const { label = 'label', value = 'value' } = alias;

  useEffect(() => {
    const newData = (data || []).map((item) => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

  if (radioType === 'vertical') {
    isVertical = true;
  }

  const radioChange = (e: string | number | undefined) => {
    if (onChange) onChange(e);
  };

  const showFiled = () => {
    return (
      <NomarRadioGroup
        value={defaultValue}
        allowUnChecked={allowUnChecked}
        data={aliasData}
        positionType={positionType}
        radioType={radioType}
        onChange={radioChange}
        coverStyle={coverStyle}
        disabled={disabled}
        className={className}
        labelNumber={labelNumber}
        formFlag={formFlag}
      >
        <HorizontalTitle
          required={required}
          hasStar={hasStar}
          title={title}
          labelNumber={labelNumber}
          isVertical={isVertical}
          fieldProps={fieldProps}
        />
      </NomarRadioGroup>
    );
  };

  return (
    <Title independentProps={props} formFlag={formFlag} type="radio">
      <div className={`${prefixCls}-field`}>
        <Field
          title={title}
          required={required}
          rules={rules}
          name={fieldProps}
          initialValue={defaultValue}
          formFlag={formFlag}
          params={{
            hidden,
          }}
          type="radio"
        >
          {showFiled()}
        </Field>
      </div>
    </Title>
  );
};

DformRadio.displayName = 'dformRadio';
export default DformRadio;
