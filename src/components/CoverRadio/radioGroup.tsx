import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import '../../styles/index.less';

export interface IDataItem {
  label: string;
  value: string | number;
  flag?: boolean;
  moveFlag?: boolean;
}

interface IRadioGroup {
  data: IDataItem[];
  onChange: (currentActiveLink: string | number | undefined, flag: string) => void;
  positionType?: 'horizontal' | 'vertical';
  radioType?: 'horizontal' | 'vertical';
  initValue?: string | number;
  disabled?: boolean;
  coverStyle?: React.CSSProperties;
}

const RadioGroup: FC<IRadioGroup> = props => {
  const {
    data,
    onChange,
    positionType = 'horizontal',
    radioType = 'horizontal',
    initValue = '',
    disabled = false,
    coverStyle,
  } = props;
  const [preValue, setPreValue] = useState<string | number | undefined>(undefined);
  const [activeValue, setActiveValue] = useState<string | number | undefined>(undefined);
  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

  useEffect(() => {
    if (data.length === 0) {
      onChange(undefined, 'init');
      setActiveValue(undefined);
      return;
    }
    let newValue = initValue;
    // 判断是否使用初始值，满足延迟赋数据源的情况
    if (preValue && !initValue) {
      newValue = preValue;
      setPreValue(undefined);
    }
    const filter = data.filter(item => item.value === newValue);
    if (filter && filter.length) {
      setActiveValue(newValue);
      if (preValue) {
        // 如果存在原始值的话 需要修改下表单值
        onChange(newValue, 'init');
      }
    } else {
      setActiveValue(undefined);
      onChange(undefined, 'init');
    }
  }, [data]);

  useEffect(() => {
    // 存在延迟数据源的情况，将值保存
    if (data.length === 0 && initValue) setPreValue(initValue);
    if (data.length === 0) {
      onChange(undefined, 'init');
      setActiveValue(undefined);
      return;
    }
    const filter = data.filter(item => item.value === initValue);
    if (filter && filter.length) {
      setActiveValue(initValue);
    } else {
      setActiveValue(undefined);
    }
  }, [initValue]);

  const radioClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, dataItem: IDataItem) => {
    e.stopPropagation();
    if (disabled) return;
    const filter = data.filter(item => item.value === dataItem?.value);
    if (filter && filter.length) {
      if (dataItem?.value === initValue) {
        onChange(undefined, 'change');
        setActiveValue(undefined);
      } else {
        console.log(data, initValue);
        onChange(dataItem?.value, 'change');
        setActiveValue(dataItem?.value);
      }
    } else {
      console.log(data, initValue);
      onChange(undefined, 'change');
    }
  };

  return (
    <div
      className={classnames({
        'alitajs-dform-cover-radio-group': true,
        'alitajs-dform-cover-radio-position': !isVertical,
        'alitajs-dform-cover-radio-item-vertical': radioType === 'vertical',
      })}
    >
      {data.map((item: IDataItem) => (
        <div
          key={item.value}
          className={classnames({
            'alitajs-dform-cover-radio-wrapper': true,
            'alitajs-dform-cover-radio-wrapper-checked': item.value && item.value === activeValue,
            'alitajs-dform-cover-radio-wrapper-margin': isVertical,
            'alitajs-dform-cover-radio-wrapper-cover': item.moveFlag && item.value !== activeValue,
          })}
          style={coverStyle}
          // onMouseDown={() => {
          //   radioMove(true, item);
          // }}
          // onMouseUp={() => {
          //   radioMove(false, item);
          // }}
          onClick={e => {
            radioClick(e, item);
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
