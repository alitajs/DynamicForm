import React, { FC } from 'react';
import { TextareaItem, List } from 'antd-mobile';
import { TextAreaItemPropsType } from 'antd-mobile/es/textarea-item/PropsType';
import { Field } from 'rc-field-form';

import '../../styles/index.less';

export interface INomarTextAreaProps extends TextAreaItemPropsType {
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  placeholder?: string;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  extra?: React.ReactNode | string;
}

const NomarTextArea: FC<INomarTextAreaProps> = props => {
  const {
    coverStyle,
    required = false,
    fieldProps,
    rules,
    rows = 3,
    title,
    positionType = 'horizontal',
    hasStar = true,
    extra = '',
    ...otherProps
  } = props;

  if (positionType === 'vertical' || extra !== '') {
    return (
      <div className="alitajs-dform-textAreaVerticalStyle">
        <div className="alitajs-dform-textAreaVerticalTitleStyle">
          <p className="alitajs-dform-titleFontSize">
            {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
            <span id={fieldProps} className="alitajs-dform-titleColor">
              {title}
            </span>
          </p>
          {extra !== '' && <div className="alitajs-dform-extraStyle">{extra}</div>}
        </div>

        <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
          <TextareaItem {...otherProps} style={coverStyle} rows={rows} />
        </Field>
      </div>
    );
  }

  return (
    <List.Item
      style={{
        position: 'relative',
      }}
      className="alitajs-dform-textAreaStyle"
    >
      {required && (
        <span
          className="alitajs-dform-redStar"
          style={{
            position: 'absolute',
            top: '14px',
            zIndex: 2,
          }}
        >
          *
        </span>
      )}
      <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
        <TextareaItem {...otherProps} title={title} style={coverStyle} rows={rows} />
      </Field>
    </List.Item>
  );
};

export default NomarTextArea;
