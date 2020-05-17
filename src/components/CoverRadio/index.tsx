import React, { FC, useState } from 'react';
import { List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import CoverRadioGroup from './radioGroup';
import Field from '../Field';
import '../../styles/index.less';

interface IDataItem {
  label: string;
  value: string;
}

interface ICoverRadioProps {
  fieldProps: string;
  title: string;
  data: IDataItem[];
  positionType?: 'horizontal' | 'vertical';
  radioType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  disabled?: boolean;
  onChange?: (currentActiveLink: string | number | undefined) => void;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  hidden?: boolean;
}

const NomarTab: FC<ICoverRadioProps> = props => {
  const [initValue, setInitValue] = useState('');
  const {
    coverStyle,
    fieldProps,
    required = false,
    hasStar = true,
    disabled = false,
    rules,
    title,
    data,
    onChange,
    positionType = 'horizontal',
    radioType = 'horizontal',
    hidden = false,
    subTitle,
  } = props;

  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

  const radioChange = (e: string | number | undefined, flag?: string) => {
    console.log(flag);
    if (onChange && e !== initValue && flag === 'change') onChange(e);
  };

  const RadioGroup = () => (
    <Field
      name={fieldProps}
      rules={rules || [{ required, message: `请选择${title}` }]}
      shouldUpdate={(prevValue: any, nextValue: any) => {
        setInitValue(nextValue && nextValue[fieldProps as any]);
        return prevValue !== nextValue;
      }}
    >
      <CoverRadioGroup
        data={data}
        positionType={positionType}
        radioType={radioType}
        initValue={initValue}
        onChange={radioChange}
        disabled={disabled}
        coverStyle={coverStyle}
      />
    </Field>
  );

  return (
    <>
      {!hidden && (
        <React.Fragment>
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
              'alitajs-dform-cover-radio': true,
              'alitajs-dform-vertical-cover-radio': isVertical,
            })}
          >
            <List.Item key={fieldProps} extra={RadioGroup()}>
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={fieldProps} className="alitajs-dform-title">
                {title}
              </span>
            </List.Item>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default NomarTab;
