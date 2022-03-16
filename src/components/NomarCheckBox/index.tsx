import React, { FC, useState, useEffect } from 'react';
import Field from '../Field';
import Title from '../Title';
import CheckBoxGroup from './checkBoxgroup';
import { allPrefixCls } from '../../const/index';
import { INomarCheckBoxProps } from './interface';
import './index.less';

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
    hidden,
    hasStar,
    subTitle,
    formFlag = false,
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
    <Title
      positionType="vertical"
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      {...titleProps}
    >
      <div className={`${allPrefixCls}-check-box`}>
        <Field
          name={fieldProps}
          rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
          initialValue={defaultValue}
          formFlag={formFlag}
          params={{
            hidden,
          }}
        >
          <CheckBoxGroup
            disableItem={props.disableItem}
            data={aliasData}
            onChange={boxChange}
            coverStyle={coverStyle}
            disabled={disabled}
            chunk={chunk}
            className={className}
            value={defaultValue}
          />
        </Field>
      </div>
    </Title>
  );
};

DformCheckBox.displayName = 'dformCheckBox';
export default DformCheckBox;
