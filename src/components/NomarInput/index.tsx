import React, { FC } from 'react';
import { StringAndUdfEvent } from '../../PropsType';
import InputItem from '../InputItem';
import Field from '../Field';
import Title from '../Title';
import { TextItem } from '../..';
import { allPrefixCls } from '../../const';
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
    titleProps,
    formFlag = false,
    placeholder,
    maxLine,
    onClick,
    labelNumber = 5,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

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
        disabled={disabled}
        maxLine={maxLine}
        fieldProps={fieldProps}
        className={className}
        ellipsis={false}
        arrow={false}
      >
        <div className={`${allPrefixCls}-title`}>
          {required && hasStar && (
            <div className={`${allPrefixCls}-redStar`}>*</div>
          )}
          <div>{title}</div>
        </div>
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
        disabled={disabled}
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
        <div className={`${allPrefixCls}-title`}>
          {required && hasStar && (
            <div className={`${allPrefixCls}-redStar`}>*</div>
          )}
          <div>{title}</div>
        </div>
      </InputItem>
    );
  };

  return (
    <Title independentProps={props} formFlag={formFlag} {...titleProps}>
      <Field
        name={fieldProps}
        rules={[...(rules || []), { required, message: `请输入${title}` }]}
        initialValue={defaultValue}
        formFlag={formFlag}
        params={{
          hidden,
        }}
      >
        {editable && !disabled ? showFiled() : showTextFiled()}
      </Field>
    </Title>
  );
};

DformInput.displayName = 'dformInput';

export default DformInput;
