import React, { FC, useState } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import CheckBoxGroup from './checkBoxgroup';
import '../../styles/index.less';

interface INomarCheckBoxProps {
  title: string;
  rules?: Rule[];
  required?: boolean;
  data?: any;
  fieldProps: string;
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  onChange?: (currentActiveLink: (string | number)[]) => void;
  disabled?: boolean;
}

const NomarCheckBox: FC<INomarCheckBoxProps> = props => {
  const [initValue, setInitValue] = useState([]);
  const {
    coverStyle,
    fieldProps,
    title,
    rules,
    required = false,
    data = [],
    hasStar = true,
    subTitle,
    onChange,
    disabled = false,
  } = props;

  return (
    <div className="alitajs-dform-check-box">
      <div className="alitajs-dform-vertical-title">
        {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
        <span id={fieldProps} className="alitajs-dform-title">
          {title}
        </span>
        {subTitle}
      </div>
      <Field
        name={fieldProps}
        rules={rules || [{ required, message: `请选择${title}` }]}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          setInitValue(nextValue && nextValue[fieldProps as any]);
          return prevValue !== nextValue;
        }}
      >
        <CheckBoxGroup
          data={data}
          onChange={onChange}
          coverStyle={coverStyle}
          initValue={initValue}
          disabled={disabled}
        />
      </Field>
    </div>
  );
};

export default NomarCheckBox;
