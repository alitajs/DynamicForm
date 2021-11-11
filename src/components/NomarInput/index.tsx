import React, { FC, useState, useEffect } from 'react';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import { StringAndUdfEvent, ClickEvent } from '../../PropsType';
import InputItem from '../InputItem';
import Field from '../Field';
import Title from '../Title';
import { allPrefixCls } from '../../const/index';

export interface INomarInputProps extends InputItemPropsType {
  inputType?: InputItemPropsType['type'];
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  onClick?: (e: ClickEvent) => void;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  className?: string;
  titleProps?: any;
  formFlag?: boolean;
}

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
    // onChange,
    formFlag = false,
    ...otherProps
  } = props;

  // const [value, setValue] = useState<string>('');

  const isVertical = positionType === 'vertical';

  // useEffect(() => {
  //   if (defaultValue) setValue(defaultValue);
  // }, [defaultValue]);

  const inputOnBlur = (val: string | undefined) => {
    // window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
  };

  // const fieldChange = (e: string) => {
  //   setValue(e);
  //   if (onChange) onChange(e);
  // };

  const showFiled = () => {
    return (
      <InputItem
        // value={value}
        {...otherProps}
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
        // onChange={fieldChange}
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
    <Title
      positionType={positionType}
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      extra={extra}
      {...titleProps}
    >
      <Field
        name={fieldProps}
        rules={[{ required, message: `请输入${title}` }, ...(rules || [])]}
        initialValue={defaultValue}
        formFlag={formFlag}
      >
        {showFiled()}
      </Field>
    </Title>
  );
};

DformInput.displayName = 'dformInput';

export default DformInput;
