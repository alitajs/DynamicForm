import React, { FC, useState, useEffect } from 'react';
import { Picker } from 'antd-mobile';
import { INomarPickerProps } from './interface';
import TextItem from '../TextItem';
interface INomarPickerGroupProps extends Omit<INomarPickerProps, 'onChange'> {
  onChange: (values: number | string | undefined, flag: string) => void;
  initValue?: string | number;
}

const NomarPickerGroup: FC<INomarPickerGroupProps> = (props) => {
  const [visible, setvisible] = useState<boolean>(false);
  const [pickerLabel, setPickerLabel] = useState<any>('');
  const {
    children,
    data = [],
    title,
    placeholder = '请选择',
    onChange,
    disabled = false,
    positionType = 'horizontal',
    initValue,
    coverStyle,
    labelNumber = 5,
    extra = '',
    className,
    onClick,
  } = props;
  const isVertical = positionType === 'vertical';

  useEffect(() => {
    // console.log(fieldProps, initValue, preValue);
    // if (data.length === 0 && initValue) setPreValue(initValue);
    if (data.length === 0) {
      // onChange(undefined, 'init');
      setPickerLabel('');
      return;
    }
    const filterList = data.filter((item) => item?.value === initValue);
    if (filterList && filterList.length) {
      setPickerLabel(filterList[0].label);
    } else {
      setPickerLabel('');
    }
  }, [initValue]);

  useEffect(() => {
    if (data && data.length) {
      const nowValue = initValue;
      // if (!initValue && preValue) {
      //   nowValue = preValue;
      //   setPreValue(undefined);
      // }
      const filterList = data.filter((item) => item?.value === nowValue);
      if (filterList && filterList.length) {
        setPickerLabel(filterList[0].label);
        // if (preValue) onChange(nowValue, 'init');
      } else {
        // onChange(undefined, 'init');
        setPickerLabel('');
      }
    } else {
      // onChange(undefined, 'init');
      setPickerLabel('');
    }
  }, [data]);

  const fieldClick = () => {
    if (onClick) onClick(initValue);
    if (disabled) return;
    setvisible(true);
  };

  const onOK = (val: (string | number)[]) => {
    setvisible(false);
    onChange(val[0], 'change');
  };

  return (
    <React.Fragment>
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
        cols={1}
        value={initValue ? [initValue] : undefined}
        onOk={onOK}
        onDismiss={() => {
          setvisible(false);
        }}
        onVisibleChange={() => {
          setvisible(false);
        }}
      />
    </React.Fragment>
  );
};

export default NomarPickerGroup;
