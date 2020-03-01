import React, { FC } from 'react';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import { DatePicker, List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import { changeDateFormat } from '../../utils';

import '../../styles/index.less';

export interface INomarDatePickerProps extends DatePickerPropsType {
  modeType?: DatePickerPropsType['mode'];
  fieldProps: string;
  required?: boolean;
  title: string;
  rules?: Rule[];
  placeholder?: string;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
}

const NomarDatePicker: FC<INomarDatePickerProps> = props => {
  const {
    fieldProps,
    required = false,
    title,
    rules,
    modeType = 'date',
    positionType = 'horizontal',
    hasStar = true,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <>
      {isVertical && (
        <p className="alitajs-dform-vertical-title">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-title">
            {title}
          </span>
        </p>
      )}
      <div className={`alitajs-dform${isVertical ? '-vertical' : ''}-date-picker`}>
        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          <DatePicker
            {...otherProps}
            mode={modeType}
            title={title}
            format={value => changeDateFormat(value, modeType)}
          >
            <List.Item arrow="horizontal">
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={fieldProps} className="alitajs-dform-title">
                {title}
              </span>
            </List.Item>
          </DatePicker>
        </Field>
      </div>
    </>
  );
};

export default NomarDatePicker;
