import React, { FC, useMemo, useState, useContext } from 'react';
import {
  CardContext,
  CardContextProps,
  DformContext,
  DformContextProps,
} from '../../baseComponents/Context';
import { PickerData } from 'antd-mobile-v2/lib/picker/PropsType';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import Field from '../Field';
import Title from '../../baseComponents/Title';
import './index.less';
import { INomarSelectProps } from './interface';
import SelectGroup from './NomarSelectGroup';
import { is2Dimensionals } from './utils';

const DformSelect: FC<INomarSelectProps> = (props) => {
  const {
    title,
    required = false,
    fieldProps,
    fieldName,
    rules = [],
    data = [] as any,
    hasStar = true,
    onChange,
    alias = {
      label: 'label',
      value: 'value',
    },
    positionType = 'horizontal',
    defaultValue,
    maxLine,
    hidden = false,
    labelNumber = 7,
    boxStyle,
    titleStyle,
    formFlag = true,
    disabled = false,
  } = props;

  const isVertical = positionType === 'vertical';

  const { label = 'label', value = 'value' } = alias;
  const [initValue, setInitValue] = React.useState<any>();
  const { cDisabled } = useContext<CardContextProps>(CardContext);
  const [mregedDisabled, setMregedDisabled] = useState<boolean>(
    disabled || cDisabled,
  );
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const fieldKey: any = fieldName || fieldProps;

  useMemo(() => {
    if (cDisabled) return;
    if (changeForm[fieldKey]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldKey]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldKey], disabled, cDisabled]);

  const twoDimensionalTransform = () => {
    const newAllArray: PickerData[] = [];
    for (let i = 0; i < data.length; i++) {
      const newData = data[i].map((item: any) => ({
        label: item[label],
        value: item[value],
      }));
      newAllArray.push(newData);
    }
    return newAllArray;
  };

  const cascadeTransform = () => {
    const cascadeTransformItem: any = (originData: any[]) => {
      return (originData || []).map((origin) => {
        const { children } = origin || {};
        return {
          label: origin[label],
          value: origin[value],
          children: cascadeTransformItem(children),
        };
      });
    };
    return cascadeTransformItem(data);
  };

  const aliasData = useMemo(() => {
    if (is2Dimensionals(data)) {
      return twoDimensionalTransform();
    }
    return cascadeTransform();
  }, [data, label, value]);

  const fieldChange = (values: any, flag: string) => {
    if (flag === 'init') return;
    if (onChange && values !== initValue) onChange(values);
  };

  return (
    <Title
      independentProps={props}
      type="select"
      style={boxStyle}
      titleStyle={titleStyle}
    >
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
        type="select"
      >
        <SelectGroup
          {...props}
          disabled={mregedDisabled}
          value={initValue || defaultValue}
          onChange={fieldChange}
          data={aliasData}
          maxLine={maxLine}
          fieldProps={fieldKey}
        >
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
            isVertical={isVertical}
            fieldProps={fieldKey}
            titleStyle={titleStyle}
          />
        </SelectGroup>
      </Field>
    </Title>
  );
};

DformSelect.displayName = 'dformSelect';
export default DformSelect;
