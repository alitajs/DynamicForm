import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import Title from '../Title';
import NomarRadioGroup from './radioGroup';
import { allPrefixCls } from '../../const/index';
import { IAliasProps } from '../../PropsType';
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
  extra?: string | React.ReactNode;
  defaultValue?: string;
  titleProps?: any;
  formFlag?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
}

const DformRadio: FC<INomarRadioProps> = (props) => {
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    coverStyle,
    fieldProps,
    required = false,
    allowUnChecked = true,
    rules = [],
    title,
    data = [],
    positionType = 'horizontal',
    hasStar = true,
    radioType = 'horizontal',
    onChange,
    disabled = false,
    alias = {
      label: 'label',
      value: 'value',
    },
    hidden = false,
    className = '',
    labelNumber = 5,
    defaultValue,
    titleProps,
    subTitle = '',
    extra,
    formFlag = false,
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
      <NomarRadioGroup
        value={defaultValue}
        allowUnChecked={allowUnChecked}
        data={aliasData}
        positionType={positionType}
        radioType={radioType}
        onChange={radioChange}
        coverStyle={coverStyle}
        disabled={disabled}
        className={className}
        labelNumber={labelNumber}
        formFlag={formFlag}
      >
        <div className={`${allPrefixCls}-title`}>
          {required && hasStar && (
            <div className={`${allPrefixCls}-redStar`}>*</div>
          )}
          <div>{title}</div>
        </div>
      </NomarRadioGroup>
    );
  };

  return (
    <Title
      positionType={positionType}
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      extra={extra}
      {...titleProps}
    >
      <div className={`${prefixCls}-field`}>
        <Field
          name={fieldProps}
          rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
          initialValue={defaultValue}
          formFlag={formFlag}
          params={{
            hidden,
          }}
        >
          {showFiled()}
        </Field>
      </div>
    </Title>
  );
};

DformRadio.displayName = 'dformRadio';
export default DformRadio;
