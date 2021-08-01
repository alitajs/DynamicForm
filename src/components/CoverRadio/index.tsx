import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import CoverRadioGroup from './radioGroup';
import Field from '../Field';
import { IAliasProps } from '../../DynamicForm';
import { allPrefixCls } from '../../const/index';
import './index.less';

const prefixCls = 'alitajs-dform-cover-radio';

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
  labelNumber?: number;
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
          </div>
        </div>
      )}
    </div>
  );
};

export default NomarTab;
