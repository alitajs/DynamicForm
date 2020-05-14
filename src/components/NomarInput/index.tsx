import React, { FC } from 'react';
import { InputItem } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';

import '../../styles/index.less';

export interface INomarInputProps extends InputItemPropsType {
  inputType?: InputItemPropsType['type'];
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
}

const NomarInput: FC<INomarInputProps> = props => {
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
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  const inputOnBlur = (val: string | undefined) => {
    window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
  };

  return (
    <>
      {!hidden && (
        <React.Fragment>
          <div className="alitajs-dform-input-title">
            {isVertical && (
              <div className="alitajs-dform-vertical-title">
                {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
                <span id={fieldProps} className="alitajs-dform-title">
                  {title}
                </span>
                {subTitle}
              </div>
            )}
            {extra !== '' && isVertical && <div className="alitajs-dform-extra">{extra}</div>}
          </div>

          <div className={`alitajs-dform${isVertical ? '-vertical' : ''}-input`}>
            <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
              <InputItem
                {...otherProps}
                extra={isVertical ? '' : extra}
                type={inputType}
                style={{ textAlign: isVertical ? 'left' : 'right', ...coverStyle }}
                onBlur={val => {
                  inputOnBlur(val);
                }}
              >
                {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
                <span id={fieldProps} className="alitajs-dform-title">
                  {title}
                </span>
              </InputItem>
            </Field>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default NomarInput;
