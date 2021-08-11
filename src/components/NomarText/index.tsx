import React, { FC } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import { TextItem } from '../..';
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
}

const NomarText: FC<INomarTextProps> = (props) => {
  const {
    positionType = 'horizontal',
    coverStyle,
    title = '',
    required = false,
    fieldProps,
    hasStar = true,
    rules,
    extra,
    placeholder = '',
    labelNumber = 5,
    disabled = false,
    maxLine,
    onClick,
    className = '',
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <Field
      name={fieldProps}
      rules={rules || [{ required, message: `请输入${title}` }]}
    >
      <TextItem
        placeholder={placeholder}
        value="123"
        extra={extra}
        coverStyle={coverStyle}
        isVertical={isVertical}
        labelNumber={labelNumber}
        onClick={onClick}
        disabled={disabled}
        maxLine={maxLine}
        fieldProps={fieldProps}
        className={className}
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
  );
};

export default NomarText;
