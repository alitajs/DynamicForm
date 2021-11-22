import React, { FC, useState, useEffect, useMemo } from 'react';
import { Picker } from 'antd-mobile';
import { INomarSelectProps } from './interface';
import TextItem from '../TextItem';
import { is2Dimensionals } from './utils';

interface INomarSelectGroupProps extends Omit<INomarSelectProps, 'onChange'> {
  onChange: (values: (number | string)[] | undefined, flag: string) => void;
  //返回的数据
  value?: string | undefined;
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
    fieldProps,
    placeholder = '请选择',
    positionType = 'horizontal',
    value = '',
    onClick,
    className,
    labelNumber = 6,
    extra = '',
    children,
    onChange,
    ...restProps
  } = props;

  const isVertical = positionType === 'vertical';

  useEffect(() => {
    if (data.length === 0) {
      setPickerLabel('');
      return;
    } else {
      setPickerLabel(value);
    }
    let allDate: any = [];
    data.forEach((val: any, index: any) => {
      let [mydata] = val.filter((item: any) => item?.value === value[index]);
      if (mydata === undefined) {
      } else {
        allDate.push(mydata.label);
      }
    });
    if (allDate && allDate.length) {
      setPickerLabel(allDate.join(','));
    }
    // 多余代码被注销，allDate.length最小为0
    // else {
    //   setPickerLabel('');
    // }
  }, [value]);

  useEffect(() => {
    if (data.length == 0) {
      setPickerLabel('');
      return;
    }
    if (data && data.length) {
      let allDate: any = [];
      data.forEach((val: any, index: any) => {
        let [mydata] = val.filter((item: any) => item?.value === value[index]);
        if (mydata === undefined) {
        } else {
          allDate.push(mydata.label);
        }
      });

      if (allDate && allDate.length) {
        setPickerLabel(allDate.join(','));
      } else {
        setPickerLabel('');
      }
    } else {
      setPickerLabel('');
    }
  }, [data]);
  //打开
  const fieldClick = () => {
    if (onClick) onClick(value);
    if (disabled) return;
    setvisible(true);
  };
  //确定
  const onOK = (val: (string | number)[]) => {
    onChange(val, 'change');
    setvisible(false);
  };
  const cascade = useMemo(() => {
    const cas = !is2Dimensionals(data);
    return props.cascade ?? cas;
  }, [props.cascade, data]);


  return (
    <>
      <TextItem
        isVertical={isVertical}
        value={pickerLabel}
        placeholder={placeholder}
        labelNumber={labelNumber}
        coverStyle={coverStyle}
        onClick={fieldClick}
        disabled={disabled}
        extra={extra}
        className={className}
        fieldProps={fieldProps}
        arrow={!disabled}
      >
        {children}
      </TextItem>
      <Picker
        {...restProps}
        title={title}
        visible={visible && data.length > 0}
        data={data}
        cascade={cascade}
        value={value ? `${value}`.split(',') : undefined}
        onOk={onOK}
        cols={cols}
        onDismiss={() => {
          setvisible(false);
        }}
        onVisibleChange={() => {
          setvisible(false);
        }}
      />
    </>
  );
};

export default NomarSelectGroup;
