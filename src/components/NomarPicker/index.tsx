import React, { FC } from 'react';
import { Picker, List } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';
import { Field } from 'rc-field-form';
import classNames from 'classnames';

import '../../styles/index.less';

export interface INomarPickerProps extends Omit<PickerPropsType, 'data'> {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: [];
  placeholder?: PickerPropsType['extra'];
  data?: PickerPropsType['data'];
  value?: PickerPropsType['value'];
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
}

const NomarPicker: FC<INomarPickerProps> = props => {
  const [valueFlag, setValueFlag] = React.useState(false);
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    placeholder,
    data = [] as any,
    positionType = 'horizontal',
    hasStar = true,
    ...otherProps
  } = props;

  if (positionType === 'vertical') {
    return (
      <div
        className={classNames({
          ['alitajs-dform-nomarPickerVerticalStyle']: true,
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
                <Picker
                  {...otherProps}
                  style={coverStyle}
                  cascade={false}
                  extra={placeholder}
                  data={data}
                  title={title}
                >
                  <List.Item arrow="horizontal"></List.Item>
                </Picker>
              </Field>
            );
          }}
        </Field>
      </div>
    );
  }

  return (
    <div className={valueFlag ? 'alitajs-dform-valueColor' : ''}>
      <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
        {form => {
          if (form.value) setValueFlag(true);
          return (
            <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
              <Picker
                {...otherProps}
                style={coverStyle}
                cascade={false}
                extra={placeholder}
                data={data}
                title={title}
              >
                <List.Item arrow="horizontal">
                  <div className="alitajs-dform-titleFontSize">
                    {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
                    <span id={fieldProps} className="alitajs-dform-titleColor">
                      {title}
                    </span>
                  </div>
                </List.Item>
              </Picker>
            </Field>
          );
        }}
      </Field>
    </div>
  );
};

export default NomarPicker;
