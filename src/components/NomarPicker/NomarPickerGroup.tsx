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
    const filterList = filterObjList('value', data, initValue);
    if (filterList && filterList.length) {
      setPickerLabel(filterList[0].label);
    }
  }, [initValue]);

  useEffect(() => {
    if (data && data.length) {
      const filterList = filterObjList('value', data, initValue);
      if (filterList && filterList.length) {
        setPickerLabel(filterList[0].label);
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
      >
        {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
        <span id={fieldProps} className="alitajs-dform-title">
          {title}
        </span>
      </InputItem>
      <Picker
        visible={visible}
        data={data}
        cols={1}
        value={[initValue]}
        onOk={onOK}
        onDismiss={() => {
          setvisible(false);
        }}
      />
    </>
  );
};

export default NomarPickerGroup;
