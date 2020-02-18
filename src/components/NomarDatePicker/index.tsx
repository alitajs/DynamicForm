import React, { FC } from 'react';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import { Field } from 'rc-field-form';
import { DatePicker, List } from 'antd-mobile';
import { changeDateFormat } from '../../utils';
import classNames from 'classnames';

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
  const [valueFlag, setValueFlag] = React.useState(false);
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
      <div
        className={classNames({
          ['alitajs-dform-nomarDatePickerVerticalStyle']: true,
          ['alitajs-dform-valueColor']: valueFlag,
        })}
      >
        <p className="alitajs-dform-titleFontSize">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-titleColor">
            {title}
          </span>
        </p>
        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          {form => {
            if (form.value) setValueFlag(true);
            return (
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
            );
          }}
        </Field>
      </div>
    );
  }

  return (
    <div className={valueFlag ? 'alitajs-dform-valueColor' : ''}>
      <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
        {form => {
          if (form.value) setValueFlag(true);
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
        }}
      </Field>
    </div>
  );
};

export default NomarDatePicker;
