import React, { FC } from 'react';
import { InputItem } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { Field } from 'rc-field-form';

import '../../styles/index.less';

export interface INomarInputProps extends InputItemPropsType {
  inputType?: InputItemPropsType['type'];
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
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
    ...otherProps
  } = props;

  const onBlur = () => {
    window.scrollTo(0, 0);
  };

  if (positionType === 'vertical') {
    return (
      <div className="alitajs-dform-nomarInputVerticalStyle">
        <p className="alitajs-dform-titleFontSize">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-titleColor">
            {title}
          </span>
        </p>
        <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
          <InputItem
            onBlur={() => {
              onBlur();
            }}
            {...otherProps}
            type={inputType}
            style={{ ...coverStyle }}
          />
        </Field>
      </div>
    );
  }

  return (
    <div className="alitajs-dform-fixNomarInputStyle">
      <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
        <InputItem {...otherProps} type={inputType} style={{ textAlign: 'right', ...coverStyle }}>
          <div className="alitajs-dform-titleFontSize">
            {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
            <span id={fieldProps} className="alitajs-dform-titleColor">
              {title}
            </span>
          </div>
        </InputItem>
      </Field>
    </div>
  );
};

export default NomarInput;
