import React, { FC, useState, useEffect } from 'react';
import MultiplePickerGroup from './multiplePickerGroup';
import { IMultiplePickerProps } from './interface';
import Field from '../Field';
import '../../styles/index.less';

const MultiplePicker: FC<IMultiplePickerProps> = props => {
  const [initValue, setInitValue] = useState([]);
  const [aliasData, setAliasData] = useState<any[]>([]);

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
    data = [],
    alias = {
      label: 'label',
      value: 'value',
    },
  } = props;
  const isVertical = positionType === 'vertical';
  const { label = 'label', value = 'value' } = alias;

  useEffect(() => {
    const newData = data.map(item => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

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
            <MultiplePickerGroup
              {...props}
              data={aliasData}
              initValue={initValue}
              onChange={fieldChange}
            >
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
