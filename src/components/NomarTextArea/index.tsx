import React, { FC } from 'react';
import { TextareaItem } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import { TextAreaItemPropsType } from 'antd-mobile/es/textarea-item/PropsType';
import classnames from 'classnames';
import Field from '../Field';
import '../../styles/index.less';

export interface INomarTextAreaProps extends TextAreaItemPropsType {
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: string;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  extra?: React.ReactNode | string;
  subTitle?: string | React.ReactNode;
}

const NomarTextArea: FC<INomarTextAreaProps> = props => {
  const {
    coverStyle,
    required = false,
    fieldProps,
    rules,
    rows = 3,
    title,
    positionType = 'vertical',
    hasStar = true,
    extra = '',
    subTitle,
    ...otherProps
  } = props;

  let isVertical = positionType === 'vertical';
  if (extra) isVertical = true;

  return (
    <>
      <div className="alitajs-dform-area-title">
        {isVertical && (
          <div className="alitajs-dform-vertical-title">
            {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
            <span id={fieldProps} className="alitajs-dform-title">
              {title}
            </span>
            {subTitle}
          </div>
        )}
        {extra !== '' && <div className="alitajs-dform-area-extra">{extra}</div>}
      </div>
      <div
        className={classnames({
          'alitajs-dform-vertical-area': isVertical,
          'alitajs-dform-area': true,
        })}
      >
        <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
          <TextareaItem {...otherProps} title={title} style={coverStyle} rows={rows}>
            {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
            <span id={fieldProps} className="alitajs-dform-title">
              {title}
            </span>
          </TextareaItem>
        </Field>
      </div>
    </>
  );
};

export default NomarTextArea;
