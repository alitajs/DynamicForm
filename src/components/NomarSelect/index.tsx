import React, { FC } from 'react';
import { PickerData } from 'antd-mobile/lib/picker/PropsType';
import { allPrefixCls } from '../../const/index';
import Field from '../Field';
import Title from '../Title';
import './index.less';
import { INomarSelectProps } from './interface'
import SelectGroup from './NomarSelectGroup';


const NomarPicker: FC<INomarSelectProps> = (props) => {
  const {
    title,
    required = false,
    fieldProps,
    rules,
    data = [] as any,
    positionType = 'horizontal',
    hasStar = true,
    subTitle,
    hidden = false,
    onChange,
    extra,
    alias = {
      label: 'label',
      value: 'value',
    },
  } = props;

  const isVertical = positionType === 'vertical';
  const { label = 'label', value = 'value' } = alias;
  let [initValue, setInitValue] = React.useState<any>();
  const [aliasData, setAliasData] = React.useState<any[]>([]);

  React.useEffect(() => {
    // console.log(data)
    let newAllArray: PickerData[] = []
    for (let i = 0; i < data.length; i++) {
      const newData = data[i].map((item: any) => ({
        label: item[label],
        value: item[value],
      }));
      newAllArray.push(newData)
    }
    // console.log(newAllArray)
    setAliasData(newAllArray);
  }, [data]);


  const fieldChange = (values: any, flag: string) => {
    // console.log("onChange"+onChange+"数据是："+values);
    if (flag === 'init') return;
    if (onChange && values !== initValue) onChange(values);
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
    >
      <Field
        name={fieldProps}
        rules={rules || [{ required, message: `请选择${title}` }]}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          initValue = (nextValue && nextValue[fieldProps as any])
          setInitValue(initValue)
          // setInitValue(mystr.split(","));
          return prevValue !== nextValue;
        }}
      >
        <SelectGroup
          {...props}
          initValue={initValue}
          onChange={fieldChange}
          data={aliasData}
        >
          <div className={`${allPrefixCls}-title`}>
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
          </div>
        </SelectGroup>
      </Field>
    </Title>
  );
};

export default NomarPicker;