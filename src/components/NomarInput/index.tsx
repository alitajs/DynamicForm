import React, { FC } from 'react';
import { InputItemPropsType } from 'antd-mobile-v2/es/input-item/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import { DformContext } from '../../baseComponents/DynamicForm';
import { StringAndUdfEvent, ClickEvent } from '../../PropsType';
import InputItem from '../../baseComponents/InputItem';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import TextItem from '../../baseComponents/TextItem';
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
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
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
        <HorizontalTitle
          required={required}
          hasStar={hasStar}
          title={title}
          isVertical={isVertical}
          labelNumber={labelNumber}
        />
      </TextItem>
    );
  };

  const showFiled = ({ isPc }: { isPc: boolean }) => {
    return (
      <InputItem
        {...otherProps}
        labelNumber={labelNumber > 7 ? 7 : labelNumber}
        onClick={onClick}
        placeholder={placeholder}
        fieldProps={fieldProps}
        extra={isVertical && !isPc ? '' : extra}
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
        <HorizontalTitle
          required={required}
          hasStar={hasStar}
          title={title}
          labelNumber={labelNumber}
          isVertical={isVertical}
        />
      </InputItem>
    );
  };

  return (
    <Title independentProps={props} formFlag={formFlag} {...titleProps}>
      <DformContext.Consumer>
        {({ isPc }: any) => {
          return (
            <Field
              name={fieldProps}
              rules={[
                { required, message: `请输入${title}` },
                ...(rules || []),
              ]}
              initialValue={defaultValue}
              formFlag={formFlag}
            >
              {(editable && !disabled) || isPc
                ? showFiled({ isPc })
                : showTextFiled()}
            </Field>
          );
        }}
      </DformContext.Consumer>
    </Title>
  );
};

DformInput.displayName = 'dformInput';

export default DformInput;
