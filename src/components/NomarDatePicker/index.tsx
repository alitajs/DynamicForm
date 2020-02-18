import React, { FC } from 'react';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import { DatePicker, List } from 'antd-mobile';
import Field from '../Field';
import { changeDateFormat } from '../../utils';

import '../../styles/index.less';

export interface INomarDatePickerProps extends DatePickerPropsType {
  modeType?: DatePickerPropsType['mode'];
  fieldProps: string;
  required?: boolean;
  title: string;
  rules?: [];
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

  if (positionType === 'vertical') {
    return (
      <div className="alitajs-dform-nomarDatePickerVerticalStyle">
        <p className="alitajs-dform-titleFontSize">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-titleColor">
            {title}
          </span>
        </p>

        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          <DatePicker
            {...otherProps}
            mode={modeType}
            title={title}
            format={value => changeDateFormat(value, modeType)}
          >
            <List.Item arrow="horizontal" />
          </DatePicker>
        </Field>
      </div>
    );
  }

  return (
    <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
      <DatePicker
        {...otherProps}
        mode={modeType}
        title={title}
        format={value => changeDateFormat(value, modeType)}
      >
        <List.Item arrow="horizontal">
          <div className="alitajs-dform-titleFontSize">
            {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
            <span id={fieldProps} className="alitajs-dform-titleColor">
              {title}
            </span>
          </div>
        </List.Item>
      </DatePicker>
    </Field>
  );
};

export default NomarDatePicker;
