import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import CheckBoxGroup, { IDataItem } from './checkBoxgroup';
import { IAliasProps } from '../../PropsType';
import { allPrefixCls } from '../../const/index';
import './index.less';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';

interface INomarCheckBoxProps {
  title: string;
  rules?: Rule[];
  required?: boolean;
  data?: any;
  fieldProps: string;
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  className?: string;
  onChange?: (currentActiveLink: (string | number)[]) => void;
  disabled?: boolean;
  hidden?: boolean;
  chunk?: number;
  alias?: IAliasProps;
  defaultValue?: (string | number)[];
  titleProps?: any;
  formFlag?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  isPc?: boolean;
  labelNumber?: number;
  positionType?: 'horizontal' | 'vertical';
}

const DformCheckBox: FC<INomarCheckBoxProps> = (props) => {
  const [aliasData, setAliasData] = useState<any[]>([]);
  const {
    coverStyle,
    fieldProps,
    className = '',
    title,
    rules = [],
    required = false,
    data = [],
    onChange,
    disabled = false,
    chunk = 0,
    alias = {
      label: 'label',
      value: 'value',
    },
    defaultValue,
    titleProps,
    hidden,
    hasStar = true,
    subTitle,
    formFlag = false,
    labelNumber = 5,
    positionType = 'vertical',
    isPc = false,
  } = props;

  const { label = 'label', value = 'value' } = alias;

  useEffect(() => {
    const newData = data.map((item: any) => ({
      ...item,
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

  const boxChange = (e: (string | number)[] | undefined) => {
    if (onChange) onChange(e || []);
  };

  return (
    <Title
      positionType={isPc ? positionType : 'vertical'}
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      isPc={props.isPc}
      {...titleProps}
    >
      <div className={`${allPrefixCls}-check-box`}>
        <Field
          name={fieldProps}
          rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
          initialValue={defaultValue}
          formFlag={formFlag}
        >
          <CheckBoxGroup
            data={aliasData}
            onChange={boxChange}
            coverStyle={coverStyle}
            disabled={disabled}
            chunk={chunk}
            className={className}
            value={defaultValue}
            positionType={positionType}
          >
            <HorizontalTitle
              required={required}
              hasStar={hasStar}
              title={title}
              labelNumber={labelNumber}
              isVertical={positionType === 'vertical'}
            />
          </CheckBoxGroup>
        </Field>
      </div>
    </Title>
  );
};

DformCheckBox.displayName = 'dformCheckBox';
export default DformCheckBox;
