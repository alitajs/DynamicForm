import React, { FC } from 'react';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import { StringAndUdfEvent, ClickEvent } from '@/PropsType';
import { InputItem } from '..';
import Field from '../Field';
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
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  const inputOnBlur = (val: string | undefined) => {
    // window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
  };

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
            <InputItem
              {...otherProps}
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
        </React.Fragment>
      )}
    </div>
  );
};

export default NomarInput;
