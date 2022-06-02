import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import Field from '../Field';
import Title from '../../baseComponents/Title';
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
    boxStyle,
    titleStyle,
    formFlag = true,
  } = props;

  const [mregedDisabled, setMregedDisabled] = useState<boolean>(disabled);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  let isVertical = positionType === 'vertical';
  const { label = 'label', value = 'value' } = alias;

  useMemo(() => {
    if (changeForm[fieldProps]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldProps]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldProps], disabled]);

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
        disabled={mregedDisabled}
        className={className}
        labelNumber={labelNumber}
      >
        <HorizontalTitle
          required={required}
          hasStar={hasStar}
          title={title}
          labelNumber={labelNumber}
          isVertical={isVertical}
          fieldProps={fieldProps}
          titleStyle={titleStyle}
        />
      </NomarRadioGroup>
    );
  };

  return (
    <Title
      independentProps={props}
      type="radio"
      style={boxStyle}
      titleStyle={titleStyle}
    >
      <div className={`${prefixCls}-field`}>
        <Field
          title={title}
          required={required}
          rules={rules}
          name={fieldProps}
          initialValue={defaultValue}
          params={{
            hidden,
            formFlag,
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
