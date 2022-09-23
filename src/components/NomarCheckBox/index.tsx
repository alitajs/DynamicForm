import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import {
  CardContext,
  CardContextProps,
  DformContext,
  DformContextProps,
} from '../../baseComponents/Context';
import Field from '../Field';
import Title from '../../baseComponents/Title';
import CheckBoxGroup from './checkBoxgroup';
import { allPrefixCls } from '../../const';
import { INomarCheckBoxProps } from './interface';
import './index.less';

const DformCheckBox: FC<INomarCheckBoxProps> = (props) => {
  const [aliasData, setAliasData] = useState<any[]>([]);
  const {
    coverStyle,
    fieldProps,
    fieldName,
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

  const { cDisabled } = useContext<CardContextProps>(CardContext);
  const [mregedDisabled, setMregedDisabled] = useState<boolean>(
    disabled || cDisabled,
  );
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const { label = 'label', value = 'value', desc = 'desc' } = alias;
  const fieldKey = fieldName || fieldProps;

  useMemo(() => {
    if (cDisabled) return;
    if (changeForm[fieldKey]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldKey]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldKey], disabled, cDisabled]);

  useEffect(() => {
    const newData = data.map((item: any) => ({
      label: item[label],
      value: item[value],
      desc: item?.[desc],
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
          name={fieldKey}
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
