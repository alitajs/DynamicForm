import React, { FC, useState, useEffect } from 'react';
import { List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import CoverRadioGroup from './radioGroup';
import Field from '../Field';
import { IAliasProps } from '../../DynamicForm';
import './index.less';

interface IDataItem {
  [key: string]: string | number;
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
  className?: string;
  hidden?: boolean;
  alias?: IAliasProps;
  [key: string]: any;
}

const NomarTab: FC<ICoverRadioProps> = (props) => {
  const [initValue, setInitValue] = useState('');
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    coverStyle,
    className,
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
    alias = {
      label: 'label',
      value: 'value',
    },
  } = props;

  let isVertical = positionType === 'vertical';
  const { label = 'label', value = 'value' } = alias;

  useEffect(() => {
    const newData = (data || []).map((item) => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

  if (radioType === 'vertical') {
    isVertical = true;
  }

  const radioChange = (e: string | number | undefined, flag?: string) => {
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
        data={aliasData}
        positionType={positionType}
        radioType={radioType}
        initValue={initValue}
        onChange={radioChange}
        disabled={disabled}
        coverStyle={coverStyle}
        className={className}
      />
    </Field>
  );

  return (
    <>
      {!hidden && (
        <React.Fragment>
          {isVertical && (
            <div className="alitajs-dform-vertical-title">
              {required && hasStar && (
                <span className="alitajs-dform-redStar">*</span>
              )}
              <span className="alitajs-dform-title">{title}</span>
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
              {required && hasStar && (
                <span className="alitajs-dform-redStar">*</span>
              )}
              <span className="alitajs-dform-title">{title}</span>
            </List.Item>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default NomarTab;
