import React, { FC, useState } from 'react';
import MultiplePickerGroup from './multiplePickerGroup';
import { IMultiplePickerProps } from './interface';
import Field from '../Field';
import '../../styles/index.less';

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
    hidden = false,
    onChange,
  } = props;
  const isVertical = positionType === 'vertical';

  const fieldChange = (values: any, flag: string) => {
    if (flag === 'init') return;
    if (onChange) onChange(values);
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
          </div>
          <Field
            name={fieldProps}
            rules={rules || [{ required, message: `请选择${title}` }]}
            shouldUpdate={(prevValue: any, nextValue: any) => {
              setInitValue(nextValue && nextValue[fieldProps as any]);
              return prevValue !== nextValue;
            }}
          >
            <MultiplePickerGroup {...props} initValue={initValue} onChange={fieldChange}>
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={fieldProps} className="alitajs-dform-title">
                {title}
              </span>
            </MultiplePickerGroup>
          </Field>
        </React.Fragment>
      )}
    </>
  );
};

export default MultiplePicker;
