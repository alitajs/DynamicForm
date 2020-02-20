import React, { FC } from 'react';
import { List } from 'antd-mobile';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio/interface';
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
  rules?: [];
  required?: boolean;
  placeholder?: string;
  data?: radioItem[] | [];
  positionType?: 'horizontal' | 'vertical';
  coverStyle?: React.CSSProperties;
  hasStar?: boolean;
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
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  const RadioGroup = () => (
    <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
      <Radio.Group className="alitajs-dform-fixRadioStyle" style={coverStyle} {...otherProps}>
        {data.map((item: radioItem) => (
          <Radio key={item.label} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </Field>
  );

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
      <div className={`alitajs-dform${isVertical ? '-vertical' : ''}-radio`}>
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
