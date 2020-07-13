import React, { FC } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import { TextItem } from '../..';

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
}

const NomarText: FC<INomarTextProps> = props => {
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
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <>
      {!hidden && (
        <React.Fragment>
          <div className="alitajs-dform-input-title">
            {isVertical && (
              <div className="alitajs-dform-vertical-title">
                {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
                <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
                  {title}
                </span>
                {subTitle}
              </div>
            )}
            {extra !== '' && isVertical && <div className="alitajs-dform-extra">{extra}</div>}
          </div>
          <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
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
            >
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
                {title}
              </span>
            </TextItem>
          </Field>
        </React.Fragment>
      )}
    </>
  );
};

export default NomarText;
