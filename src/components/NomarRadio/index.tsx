import React, { FC, useState } from 'react';
import { List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import Field from '../Field';
import NomarRadioGroup from './radioGroup';
import '../../styles/index.less';

interface radioItem {
  label: string;
  value: string;
}

export interface INomarRadioProps {
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
  onChange?: (currentActiveLink: string) => void;
}

const NomarRadio: FC<INomarRadioProps> = props => {
  const [initValue, setInitValue] = useState('');
  const {
    coverStyle,
    fieldProps,
    required = false,
    rules,
    title,
    data = [],
    positionType = 'horizontal',
    hasStar = true,
    radioType = 'horizontal',
    subTitle,
    onChange,
  } = props;

  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

  const RadioGroup = () => (
    <Field
      name={fieldProps}
      rules={rules || [{ required, message: `请选择${title}` }]}
      shouldUpdate={(prevValue: any, nextValue: any) => {
        setInitValue(nextValue && nextValue[fieldProps as any]);
        return prevValue !== nextValue;
      }}
    >
      <NomarRadioGroup
        data={data}
        positionType={positionType}
        radioType={radioType}
        initValue={initValue}
        onChange={onChange}
      />
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
