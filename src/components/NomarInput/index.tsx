import React, { FC } from 'react';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import { StringAndUdfEvent, ClickEvent } from '@/PropsType';
import { InputItem } from '..';
import Field from '../Field';
import { allPrefixCls } from '../../const/index';
import Title from '../Title';

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
  errorValue?: { [key: string]: string };
}

const NomarInput: FC<INomarInputProps> = (props) => {
  const {
    inputType = 'text',
    coverStyle,
    title = '',
    required = false,
    fieldProps,
    rules,
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
    errorValue,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  const inputOnBlur = (val: string | undefined) => {
    // window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
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
      error={errorValue}
      fieldProps={fieldProps}
    >
      <Field
        name={fieldProps}
        rules={rules || [{ required, message: `请输入${title}` }]}
        initialValue={defaultValue}
      >
        <InputItem
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
        >
          <div className={`${allPrefixCls}-title`}>
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
          </div>
        </InputItem>
      </Field>
    </Title>
  );
};

export default NomarInput;
