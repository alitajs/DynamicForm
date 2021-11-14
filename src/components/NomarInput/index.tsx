import React, { FC } from 'react';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import { StringAndUdfEvent, ClickEvent } from '../../PropsType';
import InputItem from '../InputItem';
import Field from '../Field';
import Title from '../Title';
import { TextItem } from '../..';
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
  maxLine?: number;
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
    formFlag = false,
    placeholder = '',
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
        placeholder={placeholder}
        extra={extra}
        coverStyle={{
          color: '#999',
          ...coverStyle,
        }}
        isVertical={isVertical}
        labelNumber={labelNumber}
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
        rules={[{ required, message: `请输入${title}` }, ...(rules || [])]}
        initialValue={defaultValue}
        formFlag={formFlag}
      >
        {editable && !disabled ? showFiled() : showTextFiled()}
      </Field>
    </Title>
  );
};

DformInput.displayName = 'dformInput';

export default DformInput;
