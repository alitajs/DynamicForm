import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import Title from '../Title';
import CheckBoxGroup, { IDataItem } from './checkBoxgroup';
import { IAliasProps } from '../../PropsType';
import { allPrefixCls } from '../../const/index';
import './index.less';

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
  disableItem?: (items: IDataItem) => boolean;
  hidden?: boolean;
  chunk?: number;
  alias?: IAliasProps;
  defaultValue?: (string | number)[];
  titleProps?: any;
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
    chunk = 1,
    alias = {
      label: 'label',
      value: 'value',
    },
    defaultValue,
    titleProps,
  } = props;

  const { label = 'label', value = 'value' } = alias;

  useEffect(() => {
    const newData = data.map((item: any) => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

  const boxChange = (e: (string | number)[] | undefined) => {
    if (onChange) onChange(e || []);
  };

  return (
    <Title {...titleProps}>
      <div className={`${allPrefixCls}-check-box`}>
        <Field
          name={fieldProps}
          rules={[{ required, message: `请选择${title}` }, ...rules]}
          initialValue={defaultValue}
        >
          <CheckBoxGroup
            disableItem={props.disableItem}
            data={aliasData}
            onChange={boxChange}
            coverStyle={coverStyle}
            disabled={disabled}
            chunk={chunk}
            className={className}
          />
        </Field>
      </div>
    </Title>
  );
};

DformCheckBox.displayName = 'dformCheckBox';
export default DformCheckBox;
