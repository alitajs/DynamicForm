import React, { FC, useState, useEffect } from 'react';
import { Picker } from 'antd-mobile';
import { INomarPickerProps } from './interface';
import { InputItem } from '..';
import '../../styles/index.less';

interface INomarPickerGroupProps extends Omit<INomarPickerProps, 'onChange'> {
  onChange: (values: number | string | undefined, flag: string) => void;
  initValue?: string | number;
}

const NomarPickerGroup: FC<INomarPickerGroupProps> = props => {
  const [visible, setvisible] = useState<boolean>(false);
  const [pickerLabel, setPickerLabel] = useState<string>('');
  // const [preValue, setPreValue] = useState<string | number | undefined>(undefined);
  const {
    data = [],
    title,
    placeholder = '请选择',
    onChange,
    disabled = false,
    positionType = 'horizontal',
    initValue,
    coverStyle,
    required = false,
    hasStar = true,
    fieldProps,
    labelNumber = 5,
    extra = '',
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
    const filterList = data.filter(item => item?.value === initValue);
    if (filterList && filterList.length) {
      setPickerLabel(filterList[0].label);
    } else {
      setPickerLabel('');
    }
  }, [initValue]);

  useEffect(() => {
    if (data && data.length) {
      let nowValue = initValue;
      // if (!initValue && preValue) {
      //   nowValue = preValue;
      //   setPreValue(undefined);
      // }
      const filterList = data.filter(item => item?.value === nowValue);
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
    <>
      <InputItem
        isVertical={isVertical}
        value={pickerLabel}
        placeholder={placeholder}
        labelNumber={labelNumber}
        coverStyle={coverStyle}
        readOnly
        onClick={fieldClick}
        disabled={disabled}
        extra={extra}
      >
        {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
        <span className="alitajs-dform-title">
          {title}
        </span>
      </InputItem>
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
    </>
  );
};

export default NomarPickerGroup;
