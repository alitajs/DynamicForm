import React, { FC } from 'react';
import { Picker, List } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';
import { Rule } from 'rc-field-form/es/interface';
// 所有需要从 rc-field-form 中导出的字段都可以在 dform 中导出
import Field from '../Field';
import '../../styles/index.less';

export interface INomarPickerProps extends Omit<PickerPropsType, 'data'> {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: PickerPropsType['extra'];
  data?: PickerPropsType['data'];
  value?: PickerPropsType['value'];
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
}

const NomarPicker: FC<INomarPickerProps> = props => {
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
    subTitle,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <>
      {isVertical && (
        <div className="alitajs-dform-vertical-title">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-title">
            {title}
          </span>
          {subTitle}
        </div>
      )}
      <div className={`alitajs-dform${isVertical ? '-vertical' : ''}-picker`}>
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
              {!isVertical && (
                <div className="alitajs-dform-title-content">
                  {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
                  <span id={fieldProps} className="alitajs-dform-title">
                    {title}
                  </span>
                </div>
              )}
            </List.Item>
          </Picker>
        </Field>
      </div>
    </>
  );
};

export default NomarPicker;
