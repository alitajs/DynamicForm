import React, { FC, useMemo } from 'react';
import { PickerData } from 'antd-mobile-v2/lib/picker/PropsType';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import Field from '../Field';
import Title from '../Title';
import './index.less';
import { INomarSelectProps } from './interface';
import SelectGroup from './NomarSelectGroup';
import { is2Dimensionals } from './utils';

const DformSelect: FC<INomarSelectProps> = (props) => {
  const {
    title,
    required = false,
    fieldProps,
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
    formFlag = true,
    hidden = false,
    labelNumber = 7,
  } = props;

  const isVertical = positionType === 'vertical';

  const { label = 'label', value = 'value' } = alias;
  const [initValue, setInitValue] = React.useState<any>();

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
    <Title independentProps={props} formFlag={formFlag} type="select">
      <Field
        title={title}
        required={required}
        rules={rules}
        name={fieldProps}
        initialValue={defaultValue}
        formFlag={formFlag}
        params={{
          hidden,
        }}
        type="select"
      >
        <SelectGroup
          {...props}
          value={initValue || defaultValue}
          onChange={fieldChange}
          data={aliasData}
          maxLine={maxLine}
        >
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
            isVertical={isVertical}
            fieldProps={fieldProps}
          />
        </SelectGroup>
      </Field>
    </Title>
  );
};

DformSelect.displayName = 'dformSelect';
export default DformSelect;
