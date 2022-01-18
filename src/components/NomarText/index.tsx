import React, { FC } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import TextItem from '../../baseComponents/TextItem';
import { allPrefixCls } from '../../const/index';

export interface INomarTextProps {
  positionType?: 'vertical' | 'horizontal';
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  extra?: string | React.ReactNode;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: string;
  labelNumber?: number;
  onClick?: (val: string) => void;
  disabled?: boolean;
  maxLine?: number;
  className?: string;
  defaultValue?: string;
  titleProps?: any;
  formFlag?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
}

const DformText: FC<INomarTextProps> = (props) => {
  const {
    positionType = 'horizontal',
    coverStyle,
    title = '',
    required = false,
    fieldProps,
    hasStar = true,
    rules = [],
    extra,
    placeholder = '',
    labelNumber = 5,
    disabled = false,
    maxLine,
    onClick,
    className = '',
    defaultValue,
    titleProps,
    formFlag = false,
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <Title independentProps={props} formFlag={formFlag} {...titleProps}>
      <Field
        name={fieldProps}
        rules={[{ required, message: `${title}无数据` }, ...(rules || [])]}
        initialValue={defaultValue}
        formFlag={formFlag}
      >
        <TextItem
          placeholder={placeholder}
          value="123"
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
      </Field>
    </Title>
  );
};

DformText.displayName = 'dformText';
export default DformText;
