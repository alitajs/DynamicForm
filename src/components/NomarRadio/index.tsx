import React, { FC } from 'react';
import { List } from 'antd-mobile';
import { Radio } from 'antd';
import { Rule } from 'rc-field-form/es/interface';
import { RadioGroupProps } from 'antd/lib/radio/interface';
import classnames from 'classnames';
import Field from '../Field';
import 'antd/lib/radio/style/index.less';
import '../../styles/index.less';

interface radioItem {
  label: string;
  value: string;
}

export interface INomarRadioProps extends RadioGroupProps {
  fieldProps: string;
  title: string;
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
  data?: radioItem[] | [];
  positionType?: 'horizontal' | 'vertical';
  coverStyle?: React.CSSProperties;
  hasStar?: boolean;
  radioType?: 'horizontal' | 'vertical';
  subTitle?: string | React.ReactNode;
}

const radioList = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

const NomarRadio: FC<INomarRadioProps> = props => {
  const {
    coverStyle,
    fieldProps,
    required = false,
    rules,
    title,
    placeholder,
    data = radioList as any,
    positionType = 'horizontal',
    hasStar = true,
    radioType = 'horizontal',
    subTitle,
    ...otherProps
  } = props;

  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

  const RadioGroup = () => (
    <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
      <Radio.Group
        className={classnames({
          'alitajs-dform-vertical-radio-type': radioType === 'vertical',
        })}
        style={coverStyle}
        {...otherProps}
      >
        {data.map((item: radioItem) => (
          <Radio key={item.label} value={item.value} className="alitajs-dform-item">
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </Field>
  );

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
      <div
        className={classnames({
          'alitajs-dform-vertical-radio': isVertical,
          'alitajs-dform-radio': true,
        })}
      >
        <List.Item key={fieldProps} style={coverStyle} extra={RadioGroup()}>
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-title">
            {title}
          </span>
        </List.Item>
      </div>
    </>
  );
};

export default NomarRadio;
