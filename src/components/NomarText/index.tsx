import React, { FC } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
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
    subTitle,
    hidden = false,
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
    <div className={`${allPrefixCls}${isVertical ? '-vertical' : ''}-item`}>
      {!hidden && (
        <React.Fragment>
          {isVertical && (
            <div
              className={classnames({
                [`${allPrefixCls}-title`]: true,
                [`${allPrefixCls}-vertical-title`]: true,
              })}
            >
              {required && hasStar && (
                <div className={`${allPrefixCls}-redStar`}>*</div>
              )}
              <div>{title}</div>
              {subTitle}
              {extra !== '' && isVertical && (
                <div className={`${allPrefixCls}-extra`}>{extra}</div>
              )}
            </div>
          )}
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
        </React.Fragment>
      )}
    </div>
  );
};

export default NomarText;
