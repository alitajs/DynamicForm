import React, { FC, useState, useContext, useMemo } from 'react';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import { StringAndUdfEvent } from '../../PropsType';
import InputItem from '../../baseComponents/InputItem';
import Field from '../Field';
import Title from '../../baseComponents/Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import TextItem from '../../baseComponents/TextItem';
import { INomarInputProps } from './interface';

const DformInput: FC<INomarInputProps> = (props) => {
  const {
    inputType = 'text',
    coverStyle,
    title = '',
    required = false,
    fieldProps,
    rules = [],
    positionType = 'horizontal',
    hasStar = true,
    extra,
    subTitle,
    hidden = false,
    onBlur,
    editable = true,
    className = '',
    disabled = false,
    defaultValue,
    placeholder,
    maxLine,
    onClick,
    labelNumber = 7,
    boxStyle,
    titleStyle,
    formFlag = true,
    ...otherProps
  } = props;

  const [mregedDisabled, setMregedDisabled] = useState<boolean>(disabled);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const isVertical = positionType === 'vertical';

  useMemo(() => {
    if (changeForm[fieldProps]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldProps]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldProps], disabled]);

  const inputOnBlur = (val: string | undefined) => {
    if (onBlur) onBlur(val);
  };

  const showTextFiled = () => {
    return (
      <TextItem
        value={defaultValue}
        placeholder={placeholder}
        extra={extra}
        coverStyle={{
          color: '#999',
          ...coverStyle,
        }}
        isVertical={isVertical}
        labelNumber={labelNumber}
        // @ts-ignore
        onClick={onClick}
        disabled={mregedDisabled}
        maxLine={maxLine}
        fieldProps={fieldProps}
        className={className}
        ellipsis={false}
        arrow={false}
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
      </TextItem>
    );
  };

  const showFiled = () => {
    return (
      <InputItem
        value={defaultValue}
        {...otherProps}
        labelNumber={labelNumber > 7 ? 7 : labelNumber}
        onClick={onClick}
        placeholder={placeholder}
        fieldProps={fieldProps}
        extra={isVertical ? '' : extra}
        type={inputType}
        editable={editable}
        disabled={mregedDisabled}
        className={className}
        coverStyle={{
          textAlign: isVertical ? 'left' : 'right',
          ...coverStyle,
        }}
        onBlur={(val: StringAndUdfEvent) => {
          inputOnBlur(val);
        }}
        isVertical={isVertical}
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
      </InputItem>
    );
  };

  return (
    <Title
      independentProps={props}
      type="input"
      style={boxStyle}
      titleStyle={titleStyle}
    >
      <Field
        name={fieldProps}
        rules={rules}
        title={title}
        required={required}
        initialValue={defaultValue}
        params={{
          hidden,
          formFlag,
        }}
        type="input"
      >
        {editable && !mregedDisabled ? showFiled() : showTextFiled()}
      </Field>
    </Title>
  );
};

DformInput.displayName = 'dformInput';

export default DformInput;
