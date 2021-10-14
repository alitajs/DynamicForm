import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import CoverRadioGroup from './radioGroup';
import Field from '../Field';
import Title from '../Title';
import { IAliasProps } from '../../PropsType';
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
  defaultValue?: string;
  titleProps?: any;
}

const CoverRadio: FC<ICoverRadioProps> = (props) => {
  const [aliasData, setAliasData] = useState<any[]>([]);
  const {
    coverStyle,
    className,
    fieldProps,
    required = false,
    hasStar = true,
    disabled = false,
    rules = [],
    title,
    data,
    onChange,
    positionType = 'horizontal',
    radioType = 'horizontal',
    alias = {
      label: 'label',
      value: 'value',
    },
    labelNumber = 5,
    defaultValue,
    titleProps,
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

  const radioChange = (e: string | number | undefined) => {
    if (onChange) onChange(e);
  };

  return (
    <Title {...titleProps}>
      <div
        className={classnames({
          [prefixCls]: true,
          [`${allPrefixCls}-vertical-radio`]: isVertical,
        })}
      >
        <div className={`${prefixCls}-field`}>
          <Field
            name={fieldProps}
            rules={[{ required, message: `请选择${title}` }, ...rules]}
            initialValue={defaultValue}
          >
            <CoverRadioGroup
              data={aliasData}
              positionType={positionType}
              radioType={radioType}
              onChange={radioChange}
              disabled={disabled}
              coverStyle={coverStyle}
              className={className}
              labelNumber={labelNumber}
            >
              <div className={`${allPrefixCls}-title`}>
                {required && hasStar && (
                  <div className={`${allPrefixCls}-redStar`}>*</div>
                )}
                <div>{title}</div>
              </div>
            </CoverRadioGroup>
          </Field>
        </div>
      </div>
    </Title>
  );
};

CoverRadio.displayName = 'coverRadio';

export default CoverRadio;
