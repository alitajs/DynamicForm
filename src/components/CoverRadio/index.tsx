import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import CoverRadioGroup from './radioGroup';
import Field from '../Field';
import Title from '../Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { IAliasProps } from '../../PropsType';
import { allPrefixCls } from '../../const';
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
  extra?: string | React.ReactNode;
  boxStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
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
    labelNumber = 7,
    defaultValue,
    boxStyle,
    titleStyle,
    hidden = false,
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

  const showFiled = () => {
    return (
      <CoverRadioGroup
        value={defaultValue}
        data={aliasData}
        positionType={positionType}
        radioType={radioType}
        onChange={radioChange}
        disabled={disabled}
        coverStyle={coverStyle}
        className={className}
        labelNumber={labelNumber}
      >
        <HorizontalTitle
          required={required}
          hasStar={hasStar}
          title={title}
          labelNumber={labelNumber}
          isVertical={isVertical}
          fieldProps={fieldProps}
          titleStyle={titleStyle}
        />
      </CoverRadioGroup>
    );
  };

  return (
    <Title
      independentProps={props}
      type="coverRadio"
      style={boxStyle}
      titleStyle={titleStyle}
    >
      <div
        className={classnames({
          [prefixCls]: true,
          [`${allPrefixCls}-vertical-radio`]: isVertical,
        })}
      >
        <div className={`${prefixCls}-field`}>
          <Field
            title={title}
            required={required}
            name={fieldProps}
            rules={rules}
            initialValue={defaultValue}
            params={{
              hidden,
            }}
            type="coverRadio"
          >
            {showFiled()}
          </Field>
        </div>
      </div>
    </Title>
  );
};

CoverRadio.displayName = 'coverRadio';

export default CoverRadio;
