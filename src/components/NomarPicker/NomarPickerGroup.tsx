import React, { FC, useState, useEffect } from 'react';
import { Picker } from 'antd-mobile';
import { filterObjList } from '../../utils';
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
  const [preValue, setPreValue] = useState<string | number | undefined>(undefined);
  const {
    data = [],
    title,
    placeholder = '请选择',
    onChange,
    disabled = false,
    positionType = 'horizontal',
    initValue = '',
    coverStyle,
    required = false,
    hasStar = true,
    fieldProps,
    labelNumber = 5,
    onClick,
  } = props;
  const isVertical = positionType === 'vertical';

  useEffect(() => {
    if (initValue) setPreValue(initValue);
    let nowValue = initValue;
    // if (!initValue && preValue) nowValue = preValue;
    const filterList = filterObjList('value', data, nowValue);
    if (filterList && filterList.length) {
      setPickerLabel(filterList[0].label);
      onChange(nowValue, 'init');
    } else {
      setPickerLabel('');
      onChange(undefined, 'init');
    }
  }, [initValue]);

  useEffect(() => {
    if (data && data.length) {
      let nowValue = initValue;
      if (!initValue && preValue) nowValue = preValue;
      const filterList = filterObjList('value', data, nowValue);
      if (filterList && filterList.length) {
        setPickerLabel(filterList[0].label);
        setPreValue(initValue);
        onChange(nowValue, 'init');
      } else {
        onChange(undefined, 'init');
        setPickerLabel('');
      }
    } else {
      onChange(undefined, 'init');
      setPickerLabel('');
    }
  }, [data]);

  const fieldClick = () => {
    if (disabled) return;
    setvisible(true);
    if (onClick) onClick(initValue);
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
      >
        {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
        <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
          {title}
        </span>
      </InputItem>
      <Picker
        title={title}
        visible={visible && data.length > 0}
        data={data}
        cols={1}
        value={[initValue]}
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
