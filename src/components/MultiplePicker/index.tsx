import React, { FC, useState, useEffect } from 'react';
import MultiplePickerGroup from './multiplePickerGroup';
import { IMultiplePickerProps } from './interface';
import Field from '../Field';
import Hidden from '../Hidden';
import '../../styles/index.less';

const MultiplePicker: FC<IMultiplePickerProps> = props => {
  const [initValue, setInitValue] = useState<string | undefined>();
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

  const fieldChange = (values: (string | number)[] | undefined, flag: string) => {
    if (flag === 'init') return;
    if (onChange) onChange(values || []);
  };

  return (
    <Hidden hidden={hidden}>
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
        </div>
        <Field
          name={fieldProps}
          rules={rules || [{ required, message: `请选择${title}` }]}
          shouldUpdate={(prevValue: any, nextValue: any) => {
            if (nextValue && nextValue[fieldProps]) {
              setInitValue(JSON.stringify(nextValue[fieldProps]));
            } else {
              setInitValue(undefined);
            }
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
            <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
              {title}
            </span>
          </MultiplePickerGroup>
        </Field>
      </React.Fragment>
    </Hidden>
  );
};

export default MultiplePicker;
