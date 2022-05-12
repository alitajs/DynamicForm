import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import Field from '../Field';
import Title from '../../baseComponents/Title';
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
    hidden,
    boxStyle,
    titleStyle,
    formFlag = true,
  } = props;

  const [mregedDisabled, setMregedDisabled] = useState<boolean>(disabled);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const { label = 'label', value = 'value' } = alias;

  useMemo(() => {
    if (changeForm[fieldProps]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldProps]?.disabled);
    }
  }, [changeForm[fieldProps]]);

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
      independentProps={props}
      type="checkbox"
      style={boxStyle}
      titleStyle={titleStyle}
    >
      <div className={`${allPrefixCls}-check-box`}>
        <Field
          title={title}
          required={required}
          rules={rules}
          name={fieldProps}
          initialValue={defaultValue}
          params={{
            hidden,
            formFlag,
          }}
          type="checkbox"
        >
          <CheckBoxGroup
            disableItem={props.disableItem}
            data={aliasData}
            onChange={boxChange}
            coverStyle={coverStyle}
            disabled={mregedDisabled}
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
