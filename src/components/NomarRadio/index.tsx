import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import Field from '../Field';
import NomarRadioGroup from './radioGroup';
import { allPrefixCls } from '../../const/index';
import { IAliasProps } from '../../DynamicForm';
import './index.less';

const prefixCls = 'alitajs-dform-radio';

interface radioItem {
  [key: string]: string | number;
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
  onChange?: (currentActiveLink: string | number | undefined) => void;
  hidden?: boolean;
  disabled?: boolean;
  alias?: IAliasProps;
  className?: string;
  allowUnChecked?: boolean;
  labelNumber?: number;
}

const NomarRadio: FC<INomarRadioProps> = (props) => {
  const [initValue, setInitValue] = useState('');
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    coverStyle,
    fieldProps,
    required = false,
    allowUnChecked = true,
    rules,
    title,
    data = [],
    positionType = 'horizontal',
    hasStar = true,
    radioType = 'horizontal',
    subTitle,
    onChange,
    hidden = false,
    disabled = false,
    alias = {
      label: 'label',
      value: 'value',
    },
    className = '',
    labelNumber = 5,
  } = props;

  let isVertical = positionType === 'vertical';
  const { label = 'label', value = 'value' } = alias;

  const labelCls = classnames({
    [`${allPrefixCls}-input-label-0`]: labelNumber === 0,
    [`${allPrefixCls}-input-label-2`]: labelNumber === 2,
    [`${allPrefixCls}-input-label-3`]: labelNumber === 3,
    [`${allPrefixCls}-input-label-4`]: labelNumber === 4,
    [`${allPrefixCls}-input-label-5`]: labelNumber === 5,
    [`${allPrefixCls}-input-label-6`]: labelNumber === 6,
    [`${allPrefixCls}-input-label-7`]: labelNumber === 7,
  });

  useEffect(() => {
    if (data.length === 0) return;
    const newData = data.map((item) => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

  if (radioType === 'vertical') {
    isVertical = true;
  }

  const radioChange = (e: string | number | undefined, flag: string) => {
    if (onChange && e !== initValue && flag === 'change') onChange(e);
  };

  return (
    <div className={`${allPrefixCls}${isVertical ? '-vertical' : ''}-item`}>
      {!hidden && (
        <div
          className={classnames({
            [prefixCls]: true,
            [`${allPrefixCls}-vertical-radio`]: isVertical,
          })}
        >
          <div
            className={classnames(labelCls, {
              [`${allPrefixCls}-title`]: true,
              [`${allPrefixCls}-vertical-title`]: isVertical,
            })}
          >
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
            {subTitle}
          </div>
          <div className={`${prefixCls}-field`}>
            <Field
              name={fieldProps}
              rules={rules || [{ required, message: `请选择${title}` }]}
              shouldUpdate={(prevValue: any, nextValue: any) => {
                setInitValue(nextValue && nextValue[fieldProps as any]);
                return prevValue !== nextValue;
              }}
            >
              <NomarRadioGroup
                allowUnChecked={allowUnChecked}
                data={aliasData}
                positionType={positionType}
                radioType={radioType}
                initValue={initValue}
                onChange={radioChange}
                coverStyle={coverStyle}
                disabled={disabled}
                className={className}
              />
            </Field>
          </div>
        </div>
      )}
    </div>
  );
};

export default NomarRadio;
