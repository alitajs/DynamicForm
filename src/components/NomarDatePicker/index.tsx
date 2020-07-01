import React, { FC } from 'react';
import { PropsType } from 'antd-mobile/es/date-picker/index';
import { DatePicker, List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import { changeDateFormat } from '../../utils';

import '../../styles/index.less';

export interface INomarDatePickerProps extends PropsType {
  modeType?: PropsType['mode'];
  fieldProps: string;
  required?: boolean;
  title: string;
  rules?: Rule[];
  placeholder?: string;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
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
    subTitle,
    hidden = false,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <>
      {!hidden && (
        <React.Fragment>
          {isVertical && (
            <div className="alitajs-dform-vertical-title">
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
                {title}
              </span>
              {subTitle}
            </div>
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
                  <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
                    {title}
                  </span>
                </List.Item>
              </DatePicker>
            </Field>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default NomarDatePicker;
