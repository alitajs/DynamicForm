import React, { FC, useState } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import MultiplePickerGroup from './multiplePickerGroup';
import Field from '../Field';
import '../../styles/index.less';

interface IDataItem {
  label: string;
  value: string;
  flag?: boolean;
}

interface IMultiplePickerProps {
  data: IDataItem[];
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: (string | number)[]) => void;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  hidden?: boolean;
  placeholder?: string;
  extra?: string | React.ReactNode;
  disabled?: boolean;
}

const MultiplePicker: FC<IMultiplePickerProps> = props => {
  const [initValue, setInitValue] = useState([]);
  const {
    fieldProps,
    rules,
    required = false,
    title,
    hasStar = true,
    positionType = 'horizontal',
    subTitle,
  } = props;
  const isVertical = positionType === 'vertical';
  return (
    <>
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
      </div>
      <Field
        name={fieldProps}
        rules={rules || [{ required, message: `请选择${title}` }]}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          setInitValue(nextValue && nextValue[fieldProps as any]);
          return prevValue !== nextValue;
        }}
      >
        <MultiplePickerGroup {...props} initValue={initValue}>
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-title">
            {title}
          </span>
        </MultiplePickerGroup>
      </Field>
    </>
  );
};

export default MultiplePicker;
