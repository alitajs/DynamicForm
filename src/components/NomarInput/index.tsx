import React, { FC } from 'react';
import { InputItem } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import Field from '../Field';

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

  const inputPage = () => (
    <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
      <InputItem
        {...otherProps}
        type={inputType}
        onBlur={() => {
          onBlur();
        }}
        style={{ textAlign: positionType === 'horizontal' ? 'right' : 'left', ...coverStyle }}
      >
        {positionType === 'horizontal' && (
          <div className="alitajs-dform-title-content">
            {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
            <span id={fieldProps} className="alitajs-dform-title">
              {title}
            </span>
          </div>
        )}
      </InputItem>
    </Field>
  );

  if (positionType === 'vertical') {
    return (
      <div className="alitajs-dform-nomarInputVerticalStyle">
        <p className="alitajs-dform-title-content">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-title">
            {title}
          </span>
        </p>
        {inputPage()}
      </div>
    );
  }

  return <div className="alitajs-dform-fixNomarInputStyle">{inputPage()}</div>;
};

export default NomarInput;
