import React, { FC, useState, useEffect } from 'react';
import { Picker } from 'antd-mobile';
import { INomarSelectProps } from './interface'
import TextItem from '../TextItem';

interface INomarSelectGroupProps extends Omit<INomarSelectProps, 'onChange'> {
  onChange: (values: (number | string)[] | undefined, flag: string) => void;
  //返回的数据
  initValue?: string;
}
const NomarSelectGroup: FC<INomarSelectGroupProps> = (props) => {
  //是否显示
  const [visible, setvisible] = useState<boolean>(false);
  // 显示出来的选择数据
  const [pickerLabel, setPickerLabel] = useState<any>('');

  const {
    disabled = false,
    cols,
    data = [],
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    placeholder = '请选择',
    positionType = 'horizontal',
    initValue = "",
    hasStar = true,
    subTitle,
    hidden = false,
    onClick,
    className,
    labelNumber = 6,
    extra = '',
    children,
    onChange,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  // useEffect(() => {
  //   if (data.length === 0) {
  //     setPickerLabel('');
  //     return;
  //   } else {
  //     console.log(data);
  //     for (let myI = 0; myI < data.length; myI++) {
  //       const filterList = data.filter((item:any) => item?.value === initValue);

  //     }
  //     setPickerLabel(initValue)
  //   }

  // }, [initValue]);

  useEffect(() => {
    if (data.length === 0) {
      setPickerLabel('');
      return;
    } else {
      setPickerLabel(initValue)
    }
    let allDate: any = [];
    // let allDate: string = "";
    for (let myI = 0; myI < data.length; myI++) {
      let [mydata] = data[myI].filter((item: any) => item?.value === initValue[myI])
      allDate.push(mydata.label)
    }
    if (allDate && allDate.length) {
      setPickerLabel(allDate.join(","));
    } else {
      setPickerLabel("")
    }
  }, [initValue]);

  useEffect(() => {
    if (data.length == 0) {
      setPickerLabel('');
      return
    }
    if (data && data.length) {
      let allDate: any = [];
      for (let myI = 0; myI < data.length; myI++) {
        let [mydata] = data[myI].filter((item: any) => item?.value === initValue[myI])
        allDate.push(mydata?.label)
      }
      if (allDate && allDate.length) {
        setPickerLabel(allDate.join(""));
      } else {
        setPickerLabel("");
      }
    } else {
      setPickerLabel('');
    }
  }, [data]);
  //打开
  const fieldClick = () => {
    if (onClick) onClick(initValue);
    if (disabled) return;
    setvisible(true);
  };
  //确定
  const onOK = (val: (string | number)[]) => {
    onChange(val, 'change');
    setvisible(false);
  };

  return (
    <>
      <TextItem
        isVertical={isVertical}
        value={`${pickerLabel}`}
        placeholder={placeholder}
        labelNumber={labelNumber}
        coverStyle={coverStyle}
        onClick={fieldClick}
        disabled={disabled}
        extra={extra}
        className={className}
      >
        {children}
      </TextItem>
      <Picker
        title={title}
        visible={visible && data.length > 0}
        data={data}
        cascade={false}
        value={initValue ? `${initValue}`.split(",") : undefined}
        onOk={onOK}
        onDismiss={() => {
          setvisible(false);
        }}
        onVisibleChange={() => {
          setvisible(false);
        }}
      />
    </>
  )
}

export default NomarSelectGroup
