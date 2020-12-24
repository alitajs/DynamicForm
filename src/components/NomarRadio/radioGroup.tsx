import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import '../../styles/index.less';

export interface IDataItem {
  label: string;
  value: string | number;
  flag?: boolean;
  moveFlag?: boolean;
}

export interface INomarRadioGroupProps {
  data: IDataItem[];
  positionType?: 'horizontal' | 'vertical';
  radioType?: 'horizontal' | 'vertical';
  initValue?: string | number;
  disabled?: boolean;
  onChange: (currentActiveLink: string | number | undefined, flag: string) => void;
  coverStyle?: React.CSSProperties;
}

const RadioGroup: FC<INomarRadioGroupProps> = props => {
  const {
    data = [],
    onChange,
    positionType = 'horizontal',
    radioType = 'horizontal',
    initValue,
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
      return;
    }
    const filter = data.filter(item => item.value === initValue);
    if (filter && filter.length) {
      setActiveValue(initValue);
      // onChange(initValue, 'init');
    }
    console.log(initValue);
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
        onChange(dataItem?.value, 'change');
        setActiveValue(dataItem?.value);
      }
    } else {
      onChange(undefined, 'change');
    }
  };

  return (
    <div
      className={classnames({
        'alitajs-dform-radio-group': true,
        'alitajs-dform-radio-position': !isVertical,
        'alitajs-dform-radio-item-vertical': radioType === 'vertical',
      })}
    >
      {data.map((item: IDataItem) => (
        <div
          key={item.value}
          className={classnames({
            'alitajs-dform-radio-wrapper': true,
            'alitajs-dform-radio-wrapper-item-vertical': radioType === 'vertical',
          })}
          onClick={e => {
            radioClick(e, item);
          }}
        >
          <div
            className={classnames({
              'alitajs-dform-radio-button': true,
              'alitajs-dform-radio-checked': item.value === activeValue,
            })}
          >
            {item.value === activeValue && <div className="alitajs-dform-radio-inner-button"></div>}
          </div>
          <div className="alitajs-dform-radio-label" style={coverStyle}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
