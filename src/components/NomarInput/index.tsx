import React, { FC } from 'react';
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
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  const inputOnBlur = (val: string | undefined) => {
    // window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
  };

  return (
    <Title {...titleProps}>
      <Field
        name={fieldProps}
        rules={[{ required, message: `请输入${title}` }, ...(rules || [])]}
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

DformInput.displayName = 'dformInput';

export default DformInput;
